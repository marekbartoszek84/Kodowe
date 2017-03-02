using Repozytorium.DataTransferObjects;
using Repozytorium.IServices;
using Repozytorium.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi2.Repozytorium;

namespace WebApi2.Controller
{
    [EnableCors(origins: "*", headers: " * ", methods: "*")]
    public class ProductsController : ApiController
    {
        IProductOperations service;
        public ProductsController(ProductOperations productService)
        {
           this.service = productService;
        }
        public IHttpActionResult GetProduct(int id)
        {
            var result =service.FindById(id);
            return Ok(result);
           
        }
        public IEnumerable<Product> GetAllProducts()
        {
            return service.FindAll();
        }

        [HttpPost]
        public IHttpActionResult PostProducts(ProductData product)
        {
            if(ModelState.IsValid)
            {
            Product pr = new Product();
            pr.Name = product.Name;
            pr.Price = product.Price;
            pr.Description = product.Description;
            service.AddProduct(pr);
            }
            return Ok();
        }
        [HttpDelete]
       public IHttpActionResult DeleteProducts(int id)
        {
            if(ModelState.IsValid)
            {
                var product = service.FindById(id);
                if (product != null)
                {
                    service.Delete(product);
                }
                else
                {
                    return Ok(false);
                }

            }
            return Ok(true);
        }
        [Route("edytuj")]
        [HttpPost]
        public IHttpActionResult PutProducts(ProductData product)
        {
            if(ModelState.IsValid)
            {
                Product pro = service.FindById(4);
                pro.Name = product.Name;
                service.Edit(pro);
            }
            return Ok(false);
        }
    }
}
