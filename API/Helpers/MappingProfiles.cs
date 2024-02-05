using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

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

            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CostumerBasketDto, CostumerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<OrderDto, Order>();
  
        }
    }
}
