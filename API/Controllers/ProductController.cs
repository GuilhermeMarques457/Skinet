using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericRepository<Product> _repository;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet()]
        public async Task<IReadOnlyList<ProductResponseDto>> GetProducts()
        {
            var spec = new ProductWithTypesAndBrandsSpecification();
            var products = await _repository.GetAllWithSpecificationAsync(spec);

            return _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductResponseDto>>(products);
        }


        [HttpGet("{id}")]
        public async Task<ProductResponseDto> GetProductById(int id)
        {
            // My solution (it's not so generic if I do this xD)
            //var spec = new ProductWithTypesAndBrandsSpecification();
            //return await _repository.GetByIdWithSpecificationAsync(spec, id);

            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var product = await _repository.GetByIdWithSpecificationAsync(spec);

            return _mapper.Map<Product, ProductResponseDto>(product);
    
         }
    }
}
