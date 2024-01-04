using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductResponseDto>()
                .ForMember(destination => destination.ProductBrand, _ => _.MapFrom(source => source.ProductBrand.Name))
                .ForMember(destination => destination.ProductType, _ => _.MapFrom(source => source.ProductType.Name))
                .ForMember(destination => destination.PictureUrl, _ => _.MapFrom<ProductUrlResolver>());
        }
    }
}
