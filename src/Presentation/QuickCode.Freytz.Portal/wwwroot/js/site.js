$(function () {
    // Send antiforgery token on all jQuery AJAX mutating requests (forms + JSON-style payloads).
    var antiforgeryToken = $('meta[name="request-verification-token"]').attr('content')
        || $('input[name="__RequestVerificationToken"]').first().val();
    if (antiforgeryToken) {
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {
                var method = (settings.type || settings.method || 'GET').toUpperCase();
                if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'TRACE') {
                    return;
                }
                xhr.setRequestHeader('RequestVerificationToken', antiforgeryToken);
            }
        });
    }

    init();

    $('.opButtonDetail').click(function (e) {
        let selectedKey = this.id.replace('DetailItem_', '');
        $('#SelectedKey').val(selectedKey);
        $("#formList").data('SelectedKey',selectedKey);
        let moduleName = $(this).data('module-name');
        let actionName = "DetailItem";
        openModalPopup(moduleName, actionName);
    });

    $('.opButtonInsert').click(function (e) {
        let actionName = "InsertItem";
        let moduleName = $(this).data('module-name');
        openModalPopup(moduleName, actionName);
    });

    $('.opButtonDelete').click(function (e) {
        let selectedKey = this.id.replace('DeleteItem_', '');
        $('#SelectedKey').val(selectedKey);
        $("#formList").data('SelectedKey',selectedKey);
        let moduleName = $(this).data('module-name');
        let actionName = "DeleteItem";
        openModalPopup(moduleName, actionName);
    });

    $('.opButtonUpdate').click(function (e) {
        let selectedKey = this.id.replace('UpdateItem_', '');
        $('#SelectedKey').val(selectedKey);
        $("#formList").data('SelectedKey',selectedKey);
        let moduleName = $(this).data('module-name');
        let actionName = "UpdateItem";
        openModalPopup(moduleName, actionName);
    });

    function openModalPopup(moduleName, actionName) {
        let popupUrl = `/${moduleName}/${actionName}`;

        $.ajax({
            type: "POST",
            url: popupUrl,
            processData: false,
            data: $("#formList").serialize(),
            success: function (data) {
                $('#itemDetailsContainer').html(data);
                $('#itemDetailsContainer .modal-content').addClass('portal-entity-modal');
                enhancePortalEntityForm(document.getElementById('itemDetailsContainer'));
                // Bootstrap 5 compatible modal show
                var modalElement = document.getElementById('itemDetailsModal');
                var detailsRoot = document.getElementById('itemDetailsContainer');

                function initModalEditors() {
                    loadJsonAllEditors();
                    loadYamlAllEditors(detailsRoot);
                    loadUmlAllEditors();
                    initDatePickers(detailsRoot);
                    initSearchableSelects(detailsRoot);
                }

                function resizeYamlEditors() {
                    if (!detailsRoot)
                        return;
                    $(detailsRoot).find('.yamleditor-class').each(function () {
                        if (this.env && this.env.editor)
                            this.env.editor.resize(true);
                    });
                }

                // Mount Ace immediately (container has fixed height) so the plain-text
                // flash never appears; resize once the modal animation finishes.
                initModalEditors();

                if (modalElement && typeof bootstrap !== 'undefined') {
                    var modal = bootstrap.Modal.getOrCreateInstance(modalElement);
                    $(modalElement).one('shown.bs.modal', resizeYamlEditors);
                    modal.show();
                } else {
                    // Fallback to jQuery if Bootstrap 5 not available
                    $('#itemDetailsModal').one('shown.bs.modal', resizeYamlEditors).modal('show');
                }
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
            },
        });
    }
});

function enhancePortalEntityForm(root) {
    if (!root)
        return;

    const form = root.querySelector('form.needs-validation, form.portal-entity-form');
    if (form && !form.querySelector('.portal-entity-actions') && !form.querySelector('.portal-entity-footer')) {
        // Collect trailing buttons after fields (Close / Update / Delete / Insert / Clear)
        const trailing = [];
        for (let i = form.children.length - 1; i >= 0; i--) {
            const el = form.children[i];
            if (el.id === 'actionResultDiv')
                continue;
            if (el.matches && el.matches('hr')) {
                el.remove();
                continue;
            }
            const isAction = el.matches && (
                el.matches('button, .btn, a.btn') ||
                (el.classList && (el.classList.contains('float-left') || el.classList.contains('float-right')))
            );
            if (isAction) {
                trailing.unshift(el);
                continue;
            }
            break;
        }

        if (trailing.length) {
            const wrap = document.createElement('div');
            wrap.className = 'portal-entity-footer';
            const actions = document.createElement('div');
            actions.className = 'portal-entity-actions';
            trailing.forEach(function (el) {
                el.classList.remove('float-left', 'float-right');
                actions.appendChild(el);
            });
            wrap.appendChild(actions);
            form.appendChild(wrap);
        }
    }

    pinPortalEntityFooter(root);

    const title = root.querySelector('.modal-title');
    const modalContent = root.querySelector('.modal-content') || root.closest('.modal-content');
    if (title && modalContent) {
        const t = (title.textContent || '').toLowerCase();
        if (t.includes('delete'))
            modalContent.setAttribute('data-operation', 'Delete');
        else if (t.includes('update') || t.includes('edit'))
            modalContent.setAttribute('data-operation', 'Update');
        else if (t.includes('insert') || t.includes('create'))
            modalContent.setAttribute('data-operation', 'Insert');
        else
            modalContent.setAttribute('data-operation', 'Detail');
    }
}

/**
 * Move the action footer out of the scrolling .modal-body so content cannot
 * scroll underneath it. Buttons keep working via the HTML form= attribute.
 */
function pinPortalEntityFooter(root) {
    if (!root)
        return;

    const modalContent = root.querySelector('.modal-content') || root.closest('.modal-content');
    if (!modalContent)
        return;

    const form = root.querySelector('form.needs-validation, form.portal-entity-form')
        || modalContent.querySelector('form.needs-validation, form.portal-entity-form');
    let footer = root.querySelector('.portal-entity-footer')
        || modalContent.querySelector('.portal-entity-footer');

    // Upgrade bare .portal-entity-actions into a footer wrapper
    if (!footer) {
        const actions = (form && form.querySelector(':scope > .portal-entity-actions'))
            || modalContent.querySelector('.modal-body .portal-entity-actions');
        if (!actions)
            return;
        footer = document.createElement('div');
        footer.className = 'portal-entity-footer';
        actions.parentNode.insertBefore(footer, actions);
        footer.appendChild(actions);
    }

    // Already pinned as a direct child of modal-content (sibling of modal-body)
    if (footer.parentElement === modalContent)
        return;

    if (form && form.id) {
        footer.querySelectorAll('button, input[type="submit"], input[type="reset"]').forEach(function (btn) {
            if (!btn.getAttribute('form'))
                btn.setAttribute('form', form.id);
            btn.classList.remove('float-left', 'float-right');
        });
    }

    modalContent.appendChild(footer);
}

var PORTAL_TOAST_STORAGE_KEY = 'portalToastMessage';

function showPortalToast(message, type) {
    if (!message) {
        return;
    }

    var toastEl = document.getElementById('portalToast');
    var toastBody = document.getElementById('portalToastBody');
    var toastIcon = document.getElementById('portalToastIcon');
    if (!toastEl || !toastBody) {
        return;
    }

    var toastType = (type || 'success').toLowerCase();
    toastEl.classList.remove('text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info');

    var iconClass = 'fas fa-check-circle';
    if (toastType === 'error' || toastType === 'danger') {
        toastEl.classList.add('text-bg-danger');
        iconClass = 'fas fa-exclamation-circle';
    } else if (toastType === 'warning') {
        toastEl.classList.add('text-bg-warning');
        iconClass = 'fas fa-exclamation-triangle';
    } else if (toastType === 'info') {
        toastEl.classList.add('text-bg-info');
        iconClass = 'fas fa-info-circle';
    } else {
        toastEl.classList.add('text-bg-success');
        iconClass = 'fas fa-check-circle';
    }

    if (toastIcon) {
        toastIcon.className = iconClass;
    }

    toastBody.textContent = message;

    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        var toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500, autohide: true });
        toast.show();
    } else if (typeof $.fn.toast !== 'undefined') {
        $(toastEl).toast({ delay: 3500, autohide: true }).toast('show');
    }
}

function queuePortalToast(message, type) {
    if (!message || typeof sessionStorage === 'undefined') {
        return;
    }

    try {
        sessionStorage.setItem(PORTAL_TOAST_STORAGE_KEY, JSON.stringify({
            message: message,
            type: type || 'success'
        }));
    } catch (e) {
        // Ignore storage failures (private mode / quota).
    }
}

function consumeQueuedPortalToast() {
    if (typeof sessionStorage === 'undefined') {
        return;
    }

    try {
        var raw = sessionStorage.getItem(PORTAL_TOAST_STORAGE_KEY);
        if (!raw) {
            return;
        }
        sessionStorage.removeItem(PORTAL_TOAST_STORAGE_KEY);
        var payload = JSON.parse(raw);
        if (payload && payload.message) {
            showPortalToast(payload.message, payload.type || 'success');
        }
    } catch (e) {
        sessionStorage.removeItem(PORTAL_TOAST_STORAGE_KEY);
    }
}

function getPortalCrudSuccessMessage(operation) {
    switch ((operation || '').toLowerCase()) {
        case 'update':
            return 'Record updated successfully.';
        case 'delete':
            return 'Record deleted successfully.';
        case 'insert':
            return 'Record created successfully.';
        default:
            return 'Operation completed successfully.';
    }
}

function init() {
    // Bootstrap 5 popover initialization
    if (typeof bootstrap !== 'undefined') {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
        // Also support legacy data-toggle for backward compatibility
        const legacyPopoverList = document.querySelectorAll('[data-toggle="popover"]');
        [...legacyPopoverList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
    } else if (typeof $.fn.popover !== 'undefined') {
        // Fallback for Bootstrap 4 or jQuery popover
        $('[data-toggle="popover"]').popover();
        $('[data-bs-toggle="popover"]').popover();
    }
    consumeQueuedPortalToast();
    const placeholderElement = $('#itemDetailsContainer');
    initFlatpickrModalFix();
    initDatePickers(document);
    initSearchableSelects(document);

    $('button[data-toggle="ajax-modal"]').click(function (event) {
        let url = $(this).data('url');
        $.get(url).done(function (data) {
            placeholderElement.html(data);
            // Bootstrap 5 compatible modal show
            var modalElement = placeholderElement.find('.modal')[0];
            if (modalElement && typeof bootstrap !== 'undefined') {
                var modal = new bootstrap.Modal(modalElement);
                modal.show();
            } else {
                placeholderElement.find('.modal').modal('show');
            }
            initDatePickers(placeholderElement[0]);
        });
    });

    placeholderElement.on('click', '[data-save="modal"]', function (event) {
        event.preventDefault();

        let form = $(this).parents('.modal').find('form');
        let actionUrl = form.attr('action');
        let dataToSend = form.serialize();

        $.post(actionUrl, dataToSend).done(function (data) {
            let isValid = placeholderElement.find('[name="IsValid"]').val() === 'True';
            if (isValid) {
                // Bootstrap 5 compatible modal hide
                var modalElement = placeholderElement.find('.modal')[0];
                if (modalElement && typeof bootstrap !== 'undefined') {
                    var modal = bootstrap.Modal.getInstance(modalElement);
                    if (modal) {
                        modal.hide();
                    }
                } else {
                    placeholderElement.find('.modal').modal('hide');
                }
            }
        });
    });

    // Immersive image lightbox (BS5-safe; replaces ekko-lightbox).
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        var href = $(this).attr('href');
        if (!href) {
            return;
        }
        openPortalImageLightbox(href);
    });

    bindPortalModalStack();
}

// Nested modals (e.g. Kafka workflow list → detail): BS keeps every backdrop at 1040,
// so only the first blur shows. Raise each modal/backdrop pair so the top veil covers the one below.
var portalModalStackBound = false;

function syncPortalModalStack(openingModal) {
    var openModals = Array.prototype.slice.call(document.querySelectorAll('.modal.show'));
    if (openingModal && openModals.indexOf(openingModal) === -1) {
        openModals.push(openingModal);
    }

    var backdrops = Array.prototype.slice.call(document.querySelectorAll('body > .modal-backdrop'));

    openModals.forEach(function (modal, index) {
        modal.style.zIndex = String(1055 + (index * 20));
        modal.classList.toggle('portal-modal-behind', index < openModals.length - 1);
    });

    backdrops.forEach(function (backdrop, index) {
        backdrop.style.zIndex = String(1050 + (index * 20));
        backdrop.classList.toggle('portal-backdrop-nested', index > 0);
    });
}

function schedulePortalModalStackSync(openingModal) {
    syncPortalModalStack(openingModal);
    // Backdrop is inserted just after show starts — catch it before fade finishes.
    window.requestAnimationFrame(function () {
        syncPortalModalStack(openingModal);
        window.requestAnimationFrame(function () {
            syncPortalModalStack(openingModal);
        });
    });
}

function bindPortalModalStack() {
    if (portalModalStackBound) {
        return;
    }
    portalModalStackBound = true;

    $(document).on('show.bs.modal.portalStack', '.modal', function () {
        var openCount = document.querySelectorAll('.modal.show').length;
        this.style.zIndex = String(1055 + (openCount * 20));
        // Dim parents immediately — waiting for shown.bs.modal felt like a late blur.
        document.querySelectorAll('.modal.show').forEach(function (modal) {
            modal.classList.add('portal-modal-behind');
        });
        schedulePortalModalStackSync(this);
    });

    $(document).on('shown.bs.modal.portalStack', '.modal', function () {
        syncPortalModalStack();
    });

    $(document).on('hidden.bs.modal.portalStack', '.modal', function () {
        this.style.zIndex = '';
        this.classList.remove('portal-modal-behind');
        window.setTimeout(syncPortalModalStack, 10);
    });
}

var portalLightboxState = {
    scale: 1,
    x: 0,
    y: 0,
    min: 1,
    max: 6,
    dragging: false,
    moved: false,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    pointers: new Map(),
    pinchStartDist: 0,
    pinchStartScale: 1
};

function ensurePortalImageLightbox() {
    var root = document.getElementById('portalImageLightbox');
    if (root) {
        return root;
    }

    document.body.insertAdjacentHTML('beforeend',
        '<div id="portalImageLightbox" class="portal-lightbox" hidden aria-hidden="true" role="dialog" aria-modal="true" aria-label="Image preview">' +
        '  <div class="portal-lightbox__veil" data-portal-lightbox-close="1"></div>' +
        '  <button type="button" class="portal-lightbox__close" data-portal-lightbox-close="1" aria-label="Close preview">' +
        '    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6.4 6.4l11.2 11.2M17.6 6.4L6.4 17.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
        '  </button>' +
        '  <div class="portal-lightbox__toolbar" role="toolbar" aria-label="Zoom controls">' +
        '    <button type="button" class="portal-lightbox__tool" data-portal-lightbox-zoom="-1" aria-label="Zoom out">' +
        '      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
        '    </button>' +
        '    <span class="portal-lightbox__zoom-label" id="portalImageLightboxZoom">100%</span>' +
        '    <button type="button" class="portal-lightbox__tool" data-portal-lightbox-zoom="1" aria-label="Zoom in">' +
        '      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
        '    </button>' +
        '    <button type="button" class="portal-lightbox__tool" data-portal-lightbox-zoom="reset" aria-label="Reset zoom">' +
        '      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4h4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '    </button>' +
        '  </div>' +
        '  <figure class="portal-lightbox__stage">' +
        '    <div class="portal-lightbox__frame">' +
        '      <div class="portal-lightbox__viewport">' +
        '        <img id="portalImageLightboxImg" class="portal-lightbox__img" alt="" draggable="false" />' +
        '      </div>' +
        '      <div class="portal-lightbox__shine" aria-hidden="true"></div>' +
        '    </div>' +
        '  </figure>' +
        '</div>');

    root = document.getElementById('portalImageLightbox');
    bindPortalLightboxInteractions(root);
    return root;
}

function bindPortalLightboxInteractions(root) {
    var viewport = root.querySelector('.portal-lightbox__viewport');
    var img = document.getElementById('portalImageLightboxImg');

    root.addEventListener('click', function (e) {
        var zoomEl = e.target && e.target.closest
            ? e.target.closest('[data-portal-lightbox-zoom]')
            : null;
        var zoomAction = zoomEl && zoomEl.getAttribute('data-portal-lightbox-zoom');
        if (zoomAction === '1' || zoomAction === '-1') {
            nudgePortalLightboxZoom(Number(zoomAction) > 0 ? 0.25 : -0.25);
            return;
        }
        if (zoomAction === 'reset') {
            resetPortalLightboxZoom();
            return;
        }
        // Click may land on the SVG/path inside the close button — use closest.
        if (e.target && e.target.closest && e.target.closest('[data-portal-lightbox-close="1"]')) {
            closePortalImageLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (!root || root.hasAttribute('hidden')) {
            return;
        }
        if (e.key === 'Escape') {
            closePortalImageLightbox();
        } else if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            nudgePortalLightboxZoom(0.25);
        } else if (e.key === '-' || e.key === '_') {
            e.preventDefault();
            nudgePortalLightboxZoom(-0.25);
        } else if (e.key === '0') {
            e.preventDefault();
            resetPortalLightboxZoom();
        }
    });

    if (!viewport || !img) {
        return;
    }

    viewport.addEventListener('wheel', function (e) {
        e.preventDefault();
        var delta = e.deltaY > 0 ? -0.12 : 0.12;
        setPortalLightboxZoom(portalLightboxState.scale + delta, e.clientX, e.clientY);
    }, { passive: false });

    viewport.addEventListener('dblclick', function (e) {
        e.preventDefault();
        if (portalLightboxState.scale > 1.05) {
            resetPortalLightboxZoom();
        } else {
            setPortalLightboxZoom(2.2, e.clientX, e.clientY);
        }
    });

    viewport.addEventListener('pointerdown', function (e) {
        if (e.button !== undefined && e.button !== 0) {
            return;
        }
        viewport.setPointerCapture(e.pointerId);
        portalLightboxState.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        portalLightboxState.moved = false;

        if (portalLightboxState.pointers.size === 1) {
            // Pan only when zoomed content overflows the viewport.
            portalLightboxState.dragging = portalLightboxCanPan();
            portalLightboxState.startX = e.clientX;
            portalLightboxState.startY = e.clientY;
            portalLightboxState.originX = portalLightboxState.x;
            portalLightboxState.originY = portalLightboxState.y;
            viewport.classList.toggle('is-dragging', portalLightboxState.dragging);
        } else if (portalLightboxState.pointers.size === 2) {
            portalLightboxState.dragging = false;
            var pts = Array.from(portalLightboxState.pointers.values());
            portalLightboxState.pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
            portalLightboxState.pinchStartScale = portalLightboxState.scale;
        }
    });

    viewport.addEventListener('pointermove', function (e) {
        if (!portalLightboxState.pointers.has(e.pointerId)) {
            return;
        }
        portalLightboxState.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (portalLightboxState.pointers.size === 2) {
            var pts = Array.from(portalLightboxState.pointers.values());
            var dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
            if (portalLightboxState.pinchStartDist > 0) {
                var next = portalLightboxState.pinchStartScale * (dist / portalLightboxState.pinchStartDist);
                var midX = (pts[0].x + pts[1].x) / 2;
                var midY = (pts[0].y + pts[1].y) / 2;
                setPortalLightboxZoom(next, midX, midY);
            }
            return;
        }

        if (!portalLightboxState.dragging) {
            return;
        }
        var dx = e.clientX - portalLightboxState.startX;
        var dy = e.clientY - portalLightboxState.startY;
        if (Math.abs(dx) + Math.abs(dy) > 3) {
            portalLightboxState.moved = true;
        }
        portalLightboxState.x = portalLightboxState.originX + dx;
        portalLightboxState.y = portalLightboxState.originY + dy;
        applyPortalLightboxTransform();
    });

    function endPointer(e) {
        if (portalLightboxState.pointers.has(e.pointerId)) {
            portalLightboxState.pointers.delete(e.pointerId);
        }
        if (portalLightboxState.pointers.size < 2) {
            portalLightboxState.pinchStartDist = 0;
        }
        if (portalLightboxState.pointers.size === 0) {
            portalLightboxState.dragging = false;
            viewport.classList.remove('is-dragging');
        }
    }

    viewport.addEventListener('pointerup', endPointer);
    viewport.addEventListener('pointercancel', endPointer);
    viewport.addEventListener('lostpointercapture', endPointer);
}

function getPortalLightboxPanLimits() {
    var img = document.getElementById('portalImageLightboxImg');
    var viewport = document.querySelector('#portalImageLightbox .portal-lightbox__viewport');
    if (!img || !viewport) {
        return { maxX: 0, maxY: 0 };
    }

    var scaledW = img.offsetWidth * portalLightboxState.scale;
    var scaledH = img.offsetHeight * portalLightboxState.scale;
    return {
        maxX: Math.max(0, (scaledW - viewport.clientWidth) / 2),
        maxY: Math.max(0, (scaledH - viewport.clientHeight) / 2)
    };
}

function clampPortalLightboxPan() {
    var limits = getPortalLightboxPanLimits();
    portalLightboxState.x = Math.min(limits.maxX, Math.max(-limits.maxX, portalLightboxState.x));
    portalLightboxState.y = Math.min(limits.maxY, Math.max(-limits.maxY, portalLightboxState.y));
    return limits;
}

function portalLightboxCanPan() {
    var limits = getPortalLightboxPanLimits();
    return limits.maxX > 0.5 || limits.maxY > 0.5;
}

function applyPortalLightboxTransform() {
    var img = document.getElementById('portalImageLightboxImg');
    var root = document.getElementById('portalImageLightbox');
    var label = document.getElementById('portalImageLightboxZoom');
    if (!img) {
        return;
    }

    clampPortalLightboxPan();
    img.style.transform = 'translate(' + portalLightboxState.x + 'px, ' + portalLightboxState.y + 'px) scale(' + portalLightboxState.scale + ')';
    if (label) {
        label.textContent = Math.round(portalLightboxState.scale * 100) + '%';
    }
    if (root) {
        // Grab cursor only when there is overflow to pan inside the viewport.
        root.classList.toggle('is-zoomed', portalLightboxCanPan());
    }
}

function setPortalLightboxZoom(nextScale, clientX, clientY) {
    var img = document.getElementById('portalImageLightboxImg');
    var viewport = document.querySelector('#portalImageLightbox .portal-lightbox__viewport');
    if (!img || !viewport) {
        return;
    }

    var prev = portalLightboxState.scale;
    var next = Math.min(portalLightboxState.max, Math.max(portalLightboxState.min, nextScale));
    if (Math.abs(next - prev) < 0.001) {
        applyPortalLightboxTransform();
        return;
    }

    if (typeof clientX === 'number' && typeof clientY === 'number') {
        var rect = viewport.getBoundingClientRect();
        var cx = clientX - rect.left - rect.width / 2;
        var cy = clientY - rect.top - rect.height / 2;
        var ratio = next / prev;
        portalLightboxState.x = cx - (cx - portalLightboxState.x) * ratio;
        portalLightboxState.y = cy - (cy - portalLightboxState.y) * ratio;
    }

    portalLightboxState.scale = next;
    if (next <= 1.001) {
        portalLightboxState.x = 0;
        portalLightboxState.y = 0;
        portalLightboxState.scale = 1;
    }
    applyPortalLightboxTransform();
}

function nudgePortalLightboxZoom(delta) {
    setPortalLightboxZoom(portalLightboxState.scale + delta);
}

function resetPortalLightboxZoom() {
    portalLightboxState.scale = 1;
    portalLightboxState.x = 0;
    portalLightboxState.y = 0;
    applyPortalLightboxTransform();
}

function openPortalImageLightbox(href) {
    var root = ensurePortalImageLightbox();
    var img = document.getElementById('portalImageLightboxImg');
    var frame = root.querySelector('.portal-lightbox__frame');

    resetPortalLightboxZoom();
    root.removeAttribute('hidden');
    root.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('portal-lightbox-open');
    document.body.classList.add('portal-lightbox-open');

    if (frame) {
        frame.classList.remove('is-ready');
        frame.classList.add('is-loading');
    }

    img.onload = function () {
        if (frame) {
            frame.classList.remove('is-loading');
            frame.classList.add('is-ready');
        }
        resetPortalLightboxZoom();
    };
    img.onerror = function () {
        if (frame) {
            frame.classList.remove('is-loading');
            frame.classList.add('is-ready');
        }
    };

    void root.offsetWidth;
    root.classList.add('is-open');
    img.alt = 'Preview';
    img.src = href;

    var closeBtn = root.querySelector('.portal-lightbox__close');
    if (closeBtn) {
        closeBtn.focus({ preventScroll: true });
    }
}

function closePortalImageLightbox() {
    var root = document.getElementById('portalImageLightbox');
    if (!root || root.hasAttribute('hidden')) {
        return;
    }

    root.classList.remove('is-open');
    root.setAttribute('aria-hidden', 'true');

    window.setTimeout(function () {
        var img = document.getElementById('portalImageLightboxImg');
        if (img) {
            img.removeAttribute('src');
            img.alt = '';
            img.style.transform = '';
        }
        resetPortalLightboxZoom();
        root.setAttribute('hidden', '');
        document.documentElement.classList.remove('portal-lightbox-open');
        document.body.classList.remove('portal-lightbox-open');
        if ($('#itemDetailsModal').hasClass('show')) {
            $('body').addClass('modal-open');
        }
    }, 220);
}

function initFlatpickrModalFix() {
    if (window._flatpickrModalFixInitialized) {
        return;
    }
    window._flatpickrModalFixInitialized = true;
    document.addEventListener('focusin', function (e) {
        if (e.target.closest && e.target.closest('.flatpickr-calendar')) {
            e.stopImmediatePropagation();
        }
    });
}

function isSentinelDateValue(value) {
    if (!value || !String(value).trim()) {
        return true;
    }

    var text = String(value).trim();
    if (/0001/.test(text)) {
        return true;
    }

    var parsed = Date.parse(text);
    if (!isNaN(parsed)) {
        return new Date(parsed).getFullYear() <= 1;
    }

    return false;
}

function formatPortalDateTime(date) {
    var d = date instanceof Date ? date : new Date();
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear()
        + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function formatPortalDateTimeIso(date) {
    var d = date instanceof Date ? date : new Date();
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
        + 'T' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':00';
}

function isPortalInsertContext(el) {
    return !!(el && el.closest && el.closest('.portal-entity-modal[data-operation="Insert"]'));
}

function normalizePortalDateTimeFormData(formData) {
    if (!formData || typeof formData.keys !== 'function') {
        return;
    }

    var keys = Array.from(formData.keys());
    keys.forEach(function (key) {
        var value = formData.get(key);
        if (typeof value !== 'string') {
            return;
        }

        var escaped = (typeof CSS !== 'undefined' && CSS.escape)
            ? CSS.escape(key)
            : key.replace(/"/g, '\\"');
        var input = document.querySelector(
            'input.portal-datetime-input[name="' + escaped + '"], .flatpickr-datetime input[name="' + escaped + '"]'
        );
        if (!input) {
            return;
        }

        if (isSentinelDateValue(value)) {
            var now = new Date();
            var displayValue = formatPortalDateTime(now);
            formData.set(key, formatPortalDateTimeIso(now));
            input.value = displayValue;
            var wrap = input.closest('.flatpickr-datetime');
            if (wrap && wrap._flatpickr) {
                wrap._flatpickr.setDate(displayValue, false);
            }
            return;
        }

        // Convert flatpickr display values (d.m.Y H:i) to ISO for reliable server binding.
        var parts = String(value).trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})\s+(\d{1,2}):(\d{2})$/);
        if (parts) {
            var day = parts[1].padStart(2, '0');
            var month = parts[2].padStart(2, '0');
            var year = parts[3];
            var hour = parts[4].padStart(2, '0');
            var minute = parts[5];
            formData.set(key, year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00');
        }
    });
}

function initSearchableSelects(root) {
    if (typeof $.fn.select2 === 'undefined') {
        return;
    }

    var container = root || document;
    $(container).find('.searchable-select').each(function () {
        var $select = $(this);
        if ($select.hasClass('select2-hidden-accessible')) {
            return;
        }

        var $modal = $select.closest('#itemDetailsModal');
        var options = {
            placeholder: function () {
                return $select.data('placeholder') || '';
            },
            allowClear: true,
            width: '100%'
        };

        if ($modal.length) {
            options.dropdownParent = $modal;
        }

        $select.select2(options);
    });
}

function initDatePickers(root) {
    if (typeof flatpickr === 'undefined') {
        return;
    }

    var container = root || document;
    var pickers = container.querySelectorAll('.flatpickr-datetime');
    pickers.forEach(function (el) {
        if (el._flatpickr) {
            return;
        }

        var input = el.querySelector('[data-input]');
        var useNowForInsert = isPortalInsertContext(el);
        if (input && isSentinelDateValue(input.value)) {
            input.value = useNowForInsert ? formatPortalDateTime(new Date()) : '';
        }

        var options = {
            enableTime: true,
            enableSeconds: false,
            dateFormat: 'd.m.Y H:i',
            allowInput: true,
            time_24hr: true,
            wrap: true,
            disableMobile: true,
            onReady: function (_selectedDates, _dateStr, instance) {
                if (instance.input && isSentinelDateValue(instance.input.value)) {
                    if (useNowForInsert) {
                        instance.setDate(formatPortalDateTime(new Date()), false);
                    } else {
                        instance.clear();
                    }
                }

                // enableTime disables flatpickr's closeOnSelect — close when a calendar day is clicked.
                if (instance.daysContainer && !instance.daysContainer._portalDayCloseBound) {
                    instance.daysContainer._portalDayCloseBound = true;
                    instance.daysContainer.addEventListener('click', function (e) {
                        var day = e.target && e.target.closest
                            ? e.target.closest('.flatpickr-day')
                            : null;
                        if (!day || day.classList.contains('flatpickr-disabled')) {
                            return;
                        }
                        window.setTimeout(function () {
                            if (instance.isOpen) {
                                instance.close();
                            }
                        }, 0);
                    });
                }
            }
        };

        var htmlLang = (document.documentElement.lang || '').toLowerCase();
        if (htmlLang.startsWith('tr') && flatpickr.l10ns && flatpickr.l10ns.tr) {
            options.locale = flatpickr.l10ns.tr;
        }

        flatpickr(el, options);
    });
}

function loadJsonAllEditors() {
    let jsonEditors = $('.jsoneditor-class');
    jsonEditors.each(function (index) {
        const itemName = jsonEditors[index].id;
        const jsonReadonlyPrefix = "jsonEditorRO_";
        const isReadonly = itemName.startsWith(jsonReadonlyPrefix);
        const jsonPrefix = isReadonly ? jsonReadonlyPrefix : jsonReadonlyPrefix.replace('RO_', '_');
        loadJsonEditor(itemName, itemName.replace(jsonPrefix, ''), isReadonly);
    });
}

function loadYamlAllEditors(root) {
    const scope = root ? $(root) : $(document);
    scope.find('.yamleditor-class').each(function () {
        const el = this;
        const itemName = el.id;
        if (!itemName || typeof ace === 'undefined')
            return;

        // Already mounted (e.g. list modal behind a detail popup) — don't wipe content.
        if (el.env && el.env.editor) {
            el.env.editor.resize(true);
            return;
        }

        // Capture newlines via textContent BEFORE Ace mounts.
        // Ace's own DOM extraction uses innerText and collapses line breaks.
        const initialValue = (el.textContent || '').replace(/\r\n/g, '\n');
        el.textContent = '';

        el.style.width = el.style.width || '100%';
        el.style.height = el.style.height || '300px';
        el.style.maxWidth = '100%';
        el.style.whiteSpace = 'pre-wrap';
        el.style.overflow = 'hidden';
        el.style.position = 'relative';
        el.style.display = 'block';

        try {
            const jsonReadonlyPrefix = "yamlEditorRO_";
            const isReadonly = itemName.startsWith(jsonReadonlyPrefix);
            let editor = ace.edit(el);
            editor.session.setMode("ace/mode/yaml");
            editor.setTheme("ace/theme/github");
            editor.setReadOnly(isReadonly);
            editor.setOptions({
                wrap: true,
                autoScrollEditorIntoView: true
            });
            editor.setValue(initialValue, -1);
            editor.resize(true);
        } catch (err) {
            // Fallback: keep readable YAML if Ace fails to mount.
            el.textContent = initialValue;
            el.style.overflow = 'auto';
            el.style.visibility = 'visible';
            console.error('YAML editor failed to initialize', err);
        }
    });
}

function loadUmlAllEditors() {
    let jsonEditors = $('.umleditor-class');
    jsonEditors.each(function (index) {
        const itemName = jsonEditors[index].id;
        const jsonReadonlyPrefix = "umlEditorRO_";
        const isReadonly = itemName.startsWith(jsonReadonlyPrefix);
        let editor = ace.edit(itemName);
        editor.session.setMode("ace/mode/markdown");
        editor.setTheme("ace/theme/github");
        editor.setReadOnly(isReadonly);
    });
}

function addYamlEditorsToFormData(formData) {
    const yamlEditorPrefix = 'yamlEditor_';
    const yamlEditors = document.querySelectorAll(`[id^='${yamlEditorPrefix}']`);

    yamlEditors.forEach(editor => {
        const editorId = editor.id.replace(yamlEditorPrefix, '').replace('_','.');
        const aceEditor = ace.edit(editor.id);
        const editorContent = aceEditor.getValue().trim();
        formData.append(editorId, editorContent);
    });

    prepareFormData(formData);
}

function setPage(pageId) {
    $('#CurrentPage').val(pageId);
    $('#formList').submit();
}

function needsBase64Encoding(value) {
    if (typeof value !== "string") return false;
    if (/^\s*[\{\[]/.test(value)) return true;
    if (/[\u0000-\u001F\u007F-\u009F<>"{}\[\]]/.test(value)) return true;
    if( /<[a-zA-Z][\s\S]*?>/.test(value)) return  true;
    return (value.length > 10000);
}

function base64Encode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode("0x" + p1)
    ));
}

function base64Decode(str) {
    return decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')
    );
}

function prepareFormData(formData) {
    normalizePortalDateTimeFormData(formData);
    for (const key of formData.keys()) {
        let value = formData.get(key);
        if (needsBase64Encoding(value)) {
            formData.set(key, base64Encode(value) + "_IsBase64");
        }
    }
}

function loadJsonEditor(jsonEditorName, jsonDataItem, isReadonly) {
    const container = document.getElementById(jsonEditorName);
    let modes = ['code', 'text', 'tree'];
    const options = {
        mainMenuBar: true,
        navigationBar: true,
        statusBar: true,
        mode: 'code',
        modes: modes,
        onEditable: function (path, field, value) {
            return !isReadonly;
        },
        onChangeText: function (jsonString) {
            $('#' + jsonDataItem).val(jsonString);
        }
    }

    setJsonDataToEditor(container, options, jsonDataItem);
}

function setJsonDataToEditor(container, options, jsonDataItem) {
    const editor = new JSONEditor(container, options);
    let jsonValue = $('#' + jsonDataItem).val();
    let emptyJson = "{}";

    if (jsonValue.length === 0) {
        jsonValue = emptyJson;
    }
    try {
        const initialJson = JSON.parse(jsonValue);
        editor.set(initialJson);
    } catch {
        const initialJson = JSON.parse(emptyJson);
        editor.set(initialJson);
    }
}



$.validator.methods.range = function (value, element, param) {
    let globalizedValue = value.replace(",", ".");
    return this.optional(element) || (globalizedValue >= param[0] && globalizedValue <= param[1]);
}

$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
}

