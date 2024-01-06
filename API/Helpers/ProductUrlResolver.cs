using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductResponseDto, string>
    {

        public IConfiguration _configuration { get; }
        public ProductUrlResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        public string Resolve(Product source, ProductResponseDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.PictureUrl)) 
            {
                return _configuration["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }
    }
}
