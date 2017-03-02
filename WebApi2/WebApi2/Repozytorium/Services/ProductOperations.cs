using Repozytorium.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApi2.Repozytorium;

namespace Repozytorium.Services
{
    public class ProductOperations : IProductOperations
    {
        public IShopDbContext DatabaseContext { get; set; }
        public ProductOperations(ShopDbContext shopContext)
        {
            DatabaseContext = shopContext;
        }
        public IEnumerable<Product> FindAll()
        {
            return DatabaseContext.Products;
        }
        public Product FindById(int id)
        {
            var result = DatabaseContext.Products
                .FirstOrDefault(x => x.Id == id);
            return result;
        }
        public void AddProduct(Product product)
        {
            if (product != null)
            {
                DatabaseContext.Products.Add(product);
                DatabaseContext.SaveChanges();
            }
        }
        public void Delete(Product product)
        {
            if (product != null)
            {
                DatabaseContext.Products.Remove(product);
                DatabaseContext.SaveChanges();
            }
        }
        public Product Edit(Product product)
        {
            DatabaseContext.Entry(product).State = System.Data.Entity.EntityState.Modified;
            DatabaseContext.SaveChanges();
            return product;
        }
    }
}