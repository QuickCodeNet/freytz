using Microsoft.Extensions.DependencyInjection;

namespace QuickCode.Freytz.Portal;

/// <summary>
/// User-owned DI registrations for the portal. QuickCode never overwrites this file on regen.
/// </summary>
public static class SiteServiceRegistration
{
    public static IServiceCollection AddSiteCustomizations(this IServiceCollection services)
    {
        // Example: services.AddScoped<IMyPortalService, MyPortalService>();
        return services;
    }
}
