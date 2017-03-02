using Repozytorium.IServices;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;


namespace WebApi2.Repozytorium
{
    public class ShopDbContext : DbContext, IShopDbContext
    {
        public ShopDbContext() : base("ShopDataBase")
        {

        }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public override int SaveChanges()
        {
            base.SaveChanges();
            return 1;
        }
    }
}