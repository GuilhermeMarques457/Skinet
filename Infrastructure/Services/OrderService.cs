using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepository;
        private readonly IGenericRepository<Product> _productRepository;
        private readonly IBasketRepository _basketRepository;
        private readonly IGenericRepository<DeliveryMethod> _deliveryMethodRepository;

        public OrderService(IGenericRepository<Order> orderRepo, IGenericRepository<DeliveryMethod> deliveryMethodRepo, IGenericRepository<Product> productRepo, IBasketRepository basketRepository)
        {
            _orderRepository = orderRepo;
            _deliveryMethodRepository = deliveryMethodRepo;
            _productRepository = productRepo;
            _basketRepository = basketRepository;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            var basket = await _basketRepository.GetBasketAsync(basketId);
            var items = new List<OrderItem>();

            basket.Items.ForEach(async x =>
            {
                var productItem = await _productRepository.GetByIdAsync(x.Id);
                var itemOrdered = new ProductItemOrdered(
                    productItemId: productItem.Id,
                    productName: productItem.Name,
                    pictureUrl: productItem.PictureUrl);

                var orderItem = new OrderItem(itemOrdered, productItem.Price, x.Quantity);
                items.Add(orderItem);
            });
            var deliveryMethod = await _deliveryMethodRepository.GetByIdAsync(deliveryMethodId);

            var subtotal = items.Sum(item => item.Quantity * item.Price);

            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);

            return order;
        }

        public Task<DeliveryMethod> GetDeliveryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            throw new NotImplementedException();
        }
    }
}
