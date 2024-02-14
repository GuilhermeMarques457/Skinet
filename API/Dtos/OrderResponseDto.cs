using Core.Entities.OrderAggregate;
using System.Collections.Generic;
using System;

namespace API.Dtos
{
    public class OrderResponseDto
    {
        public int Id { get; set; }
        public string BuyerEmail { get; set; }
        public Address ShipToAddress { get; set; }
        public string DeliveryMethod { get; set; }
        public decimal ShippingPrice { get; set; }
        public IReadOnlyList<OrderItemDto> OrderItems { get; set; }
        public decimal Subtotal { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
        public DateTime OrderDate { get; set; }
        
    }
}
