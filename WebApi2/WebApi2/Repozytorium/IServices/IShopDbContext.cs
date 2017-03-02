using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi2.Repozytorium;

namespace Repozytorium.IServices
{
    public interface IShopDbContext
    {
        DbSet<Category> Categories { get; set; }
        DbSet<Product> Products { get; set; }
        int SaveChanges();
        DbEntityEntry Entry(object entyty);
    }
}
