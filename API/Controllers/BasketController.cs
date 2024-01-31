using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BasketController : BaseAPIController
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IMapper _mapper;

        public BasketController(IBasketRepository basketRepository, IMapper mapper)
        {
            _basketRepository = basketRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CostumerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);

            return Ok(basket ?? new CostumerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CostumerBasket>> UpsertBasket(CostumerBasketDto basketDto)
        {
            // Auto mapper will also take care of the basketItem Mapping xD
            var basket = _mapper.Map<CostumerBasketDto, CostumerBasket>(basketDto);

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
