using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi2.Repozytorium;

namespace Repozytorium.IServices
{
   public interface IProductOperations
    {
        IShopDbContext DatabaseContext { get; set; }
        IEnumerable<Product> FindAll();
        Product FindById(int id);
        void AddProduct(Product product);
        void Delete(Product product);
        Product Edit(Product product);
    }
}
