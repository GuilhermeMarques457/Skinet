using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseAPIController
    {
        private readonly ApplicationDbContext _context;

        public BuggyController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("not-found")] 
        public ActionResult GetNotFound() 
        {
            var thing = _context.Products.Find(42);

            return thing == null ? NotFound(new ApiResponse(404)) : Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            var thing = _context.Products.Find(42);
            var thingToReturn = thing.ToString();

            return thing == null ? NotFound(new ApiResponse(500)) : Ok(thing);
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("bad-request/{id}")]
        public ActionResult GetBadRequest(int id)
        {
            return Ok();
        }

        [HttpGet("test-auth")]
        [Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret kakakaka, vou jogar bola hj xD";
        }
    }
}
