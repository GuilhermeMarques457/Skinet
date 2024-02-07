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

            CreateMap<Order, OrderResponseDto>()
                .ForMember(destination => destination.DeliveryMethod, _ => _.MapFrom(source => source.DeliveryMethod.ShortName))
                .ForMember(destination => destination.ShippingPrice, _ => _.MapFrom(source => source.DeliveryMethod.Price));

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(destination => destination.ProducName, _ => _.MapFrom(source => source.ItemOrdered.ProductName))
                .ForMember(destination => destination.ProductId, _ => _.MapFrom(source => source.ItemOrdered.ProductItemId))
                .ForMember(destination => destination.PictureUrl, _ => _.MapFrom(source => source.ItemOrdered.PictureUrl))
                .ForMember(destination => destination.PictureUrl, _ => _.MapFrom<OrderItemUrlResolver>());

        }
    }
}
