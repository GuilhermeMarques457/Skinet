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
        private readonly IGenericRepository<Product> _repository;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet()]
        public async Task<Pagination<ProductResponseDto>> GetProducts([FromQuery] ProductSpecificationParameters productParams)
        {
            // productParams.Sort = productParams.Sort ?? "nameAsc";

            var spec = new ProductWithTypesAndBrandsSpecification(productParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productParams);
            var totalItems = await _repository.CountAsync(countSpec);

            var products = await _repository.GetAllWithSpecificationAsync(spec);
            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductResponseDto>>(products);

            return new Pagination<ProductResponseDto>(productParams.PageIndex, productParams.PageSize, totalItems, data);
        }


        [HttpGet("{id}")]
        // Saying to swagger which type of result we will be sending back
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductResponseDto>> GetProductById(int id)
        {
            // My solution (it's not so generic if I do this xD)
            //var spec = new ProductWithTypesAndBrandsSpecification();
            //return await _repository.GetByIdWithSpecificationAsync(spec, id);

            var spec = new ProductWithTypesAndBrandsSpecification(id);
            var product = await _repository.GetByIdWithSpecificationAsync(spec);

            if (product == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Product, ProductResponseDto>(product);
    
         }
    }
}
