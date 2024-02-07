using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
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
        // Replacing it because we're using Unit Of Work
        //private readonly IGenericRepository<Order> _orderRepository;
        //private readonly IGenericRepository<Product> _productRepository;
   
        //private readonly IGenericRepository<DeliveryMethod> _deliveryMethodRepository;

        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;

        public OrderService(IBasketRepository basketRepository, IUnitOfWork unitOfWork)
        {
            _basketRepository = basketRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<Order?> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            var basket = await _basketRepository.GetBasketAsync(basketId);
            var items = new List<OrderItem>();

            basket.Items.ForEach(async x =>
            {
                // WOW this is beautifull <3
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(x.Id);
                var itemOrdered = new ProductItemOrdered(
                    productItemId: productItem.Id,
                    productName: productItem.Name,
                    pictureUrl: productItem.PictureUrl);

                var orderItem = new OrderItem(itemOrdered, productItem.Price, x.Quantity);
                items.Add(orderItem);
            });
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            var subtotal = items.Sum(item => item.Quantity * item.Price);

            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal);

            // Tracking out entity saved
            _unitOfWork.Repository<Order>().Add(order);

            // Actually saving it
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            await _basketRepository.DeleteBasketAsync(basketId);

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().GetAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrderWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetByIdWithSpecificationAsync(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrderWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().GetAllWithSpecificationAsync(spec);
        }
    }
}
