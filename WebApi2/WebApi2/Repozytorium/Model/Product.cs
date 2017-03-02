using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi2.Repozytorium
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set;}
        public IEnumerable<Category> Categories { get; set; }
        public float Price { get; set; }

    }
}