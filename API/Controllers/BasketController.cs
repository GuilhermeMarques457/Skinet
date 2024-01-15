using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BasketController : BaseAPIController
    {
        private readonly IBasketRepository _basketRepository;

        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }

        [HttpGet]
        public async Task<ActionResult<CostumerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);

            return Ok(basket ?? new CostumerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CostumerBasket>> UpsertBasket(CostumerBasket basket)
        {
            var upsertedBasked = await _basketRepository.UpsertBasketAsync(basket);

            return Ok(upsertedBasked);
        }


        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}
