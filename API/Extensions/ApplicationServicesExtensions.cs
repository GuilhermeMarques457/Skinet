using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System;
using System.Linq;
using System.Text.Json.Serialization;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

            services.AddSwaggerDocumentation();
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            // Adding our connection to Redis (it must be Singleton because it will share shared by all users)
            services.AddSingleton<IConnectionMultiplexer>(opt =>
            {
                string redisConnectionString = config.GetConnectionString("Redis");
                var options = ConfigurationOptions.Parse(redisConnectionString);

                return ConnectionMultiplexer.Connect(options);
            });

            services.AddSingleton<IResponseCacheService, ResponseCacheService>();

            // Injecting our single dbcontext (unit of work make it single)
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IBasketRepository, BasketRepository>();
            services.AddScoped<IOrderService, OrderService>();

            services.AddScoped<IPaymentService, PaymentService>();
  

            // Registering our generic repository as a service
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            // Adding auto mapper
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            // Configuring Invalid parameter resonse
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count() > 0)
                        .SelectMany(e => e.Value.Errors)
                        .Select(e => e.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

            // Adding CORS policy to our client
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
                });
            });


            return services;
        }
    }
}
