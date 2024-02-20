using API.Dtos;
using API.Errors;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class PaymentsController : BaseAPIController
    {
        private readonly IPaymentService _paymentService;
        private readonly ILogger<PaymentsController> _logger;
        private const string WebhookSecret = "whsec_763f311e5c4db409e4d5e52a45e9556ba7a9e0be18202e504b0c6c7ea5cb8804";

        public PaymentsController(IPaymentService paymentService, ILogger<PaymentsController> logger)
        {
            _paymentService = paymentService;
            _logger = logger;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CostumerBasket>> UpsertPaymentIntent(string basketId)
        {
            var basket = await _paymentService.UpsertPaymentIntent(basketId);

            if (basket == null) return BadRequest(new ApiResponse(400, "Problem with your basket"));
     
            return Ok(basket);
        }

        /// <summary>
        /// EndPoint that will be called by stripe
        /// </summary>
        /// <returns>An Empty Result To Stripe</returns>
        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(Request.Body).ReadToEndAsync();

            // Stripe will pass the secret in the header, so in this line we verify if it's valid
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], WebhookSecret);

            PaymentIntent intent = new PaymentIntent();
            Order order = new Order();

            switch(stripeEvent.Type) 
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation($"Payment succedeed: {intent.Id}");

                    order = await _paymentService.UpdateOrderPaymentSucceeded(intent.Id);
                    _logger.LogInformation($"Order status was updated successfully to SUCCEEDED: {order.Id}");
                    break;
                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    _logger.LogInformation($"Payment failed: {intent.Id}");

                    order = await _paymentService.UpdateOrderPaymentFailed(intent.Id);
                    _logger.LogInformation($"Order status was updated successfully to FAILED: {order.Id}");
                    break;
            }

            return new EmptyResult();
        }
    }
}
