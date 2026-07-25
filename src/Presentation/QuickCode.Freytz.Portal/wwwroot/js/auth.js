(function () {
  "use strict";

  function initPasswordToggles(root) {
    root.querySelectorAll("[data-auth-password-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var targetId = button.getAttribute("aria-controls");
        var input = targetId ? document.getElementById(targetId) : null;
        if (!input) {
          var wrap = button.closest(".auth-password");
          input = wrap ? wrap.querySelector("input") : null;
        }
        if (!input) return;

        var show = input.type === "password";
        input.type = show ? "text" : "password";
        button.setAttribute("aria-pressed", show ? "true" : "false");
        button.setAttribute("aria-label", show ? "Hide password" : "Show password");

        var icon = button.querySelector("i");
        if (icon) {
          icon.classList.toggle("fa-eye", !show);
          icon.classList.toggle("fa-eye-slash", show);
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initPasswordToggles(document);
  });
})();
