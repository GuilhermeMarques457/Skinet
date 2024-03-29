using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProductsController : BaseAPIController
    {
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IGenericRepository<ProductType> _typeRepository;
        private readonly IGenericRepository<ProductBrand> _brandRepository;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> repository, IMapper mapper, IGenericRepository<ProductType> typeRepository, IGenericRepository<ProductBrand> brandRepository)
        {
            _productRepository = repository;
            _mapper = mapper;
            _typeRepository = typeRepository;
            _brandRepository = brandRepository;
        }

        [Cached(600)]
        [HttpGet()]
        public async Task<ActionResult<Pagination<ProductResponseDto>>> GetProducts([FromQuery] ProductSpecificationParameters productParams)
        {
            // productParams.Sort = productParams.Sort ?? "nameAsc";

            var spec = new ProductWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _productRepository.CountAsync(countSpec);

            var products = await _productRepository.GetAllWithSpecificationAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductResponseDto>>(products);

            return Ok(new Pagination<ProductResponseDto>(productParams.PageIndex, productParams.PageSize, totalItems, data));
        }


        [Cached(600)]
        [HttpGet("{id}")]
        // Saying to swagger which type of result we will be sending back
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductResponseDto>> GetProductById(int id)
        {
            // My solution (it's not so generic if I do this xD)
            //var spec = new ProductWithTypesAndBrandsSpecification();
            //return await _productRepository.GetByIdWithSpecificationAsync(spec, id);

            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var product = await _productRepository.GetByIdWithSpecificationAsync(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductResponseDto>(product);
    
        }

        [HttpGet("types")]

        [Cached(600)]
        public async Task<ActionResult<IReadOnlyList<ProductType>>> GetTypes()
        {
            var types = await _typeRepository.GetAllAsync();

            return Ok(types);
        }

        [HttpGet("brands")]

        [Cached(600)]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>> GetBrands()
        {
            var brands = await _brandRepository.GetAllAsync();

            return Ok(brands);
        }
    }
}
