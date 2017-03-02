using Microsoft.Practices.Unity;
using Repozytorium.IServices;
using Repozytorium.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApi2.Repozytorium;
using WebApi2.Resolver;

namespace WebApi2
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = new UnityContainer();
            container.RegisterType<IProductOperations, ProductOperations>(new HierarchicalLifetimeManager());
            container.RegisterType<IShopDbContext, ShopDbContext>(new HierarchicalLifetimeManager());

            config.DependencyResolver = new UnityResolver(container);
            config.MapHttpAttributeRoutes();
            config.EnableCors();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
