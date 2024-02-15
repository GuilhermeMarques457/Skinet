using API.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class PaymentsController : BaseAPIController
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CostumerBasket>> UpsertPaymentIntent(string basketId)
        {
            return await _paymentService.UpsertPaymentIntent(basketId);
        } 
    }
}
