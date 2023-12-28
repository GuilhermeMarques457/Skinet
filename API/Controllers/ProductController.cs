using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;

        public ProductsController(IProductRepository repository)
        {
            _repository = repository;
        }

        [HttpGet()]
        public async Task<IReadOnlyList<Product>> GetProducts()
        {
            return await _repository.GetProductsAsync();
        }

        [HttpGet("brands")]
        public async Task<IReadOnlyList<ProductBrand>> GetProductBrands()
        {
            return await _repository.GetProductBrandsAsync();
        }

        [HttpGet("types")]
        public async Task<IReadOnlyList<ProductType>> GetProductTypes()
        {
            return await _repository.GetProductTypesAsync();
        }

        [HttpGet("{id}")]
        public async Task<Product> GetProduct(int id)
        {
            return await _repository.GetProductByIdAsync(id);
        }
    }
}
