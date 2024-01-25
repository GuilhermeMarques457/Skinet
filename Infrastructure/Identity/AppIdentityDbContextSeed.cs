using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<AppUser> userManager) 
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser()
                {
                    DisplayName = "Guilherme",
                    Email = "guimarkes457@gmail.com",
                    UserName = "guimarkes457@gmail.com",
                    Address = new Address
                    {
                        FirstName = "Guilherme",
                        LastName = "Marques",
                        Street = "Antonio Buzzeto",
                        City = "Adamantina",
                        State = "SP",
                        ZipCode = "17800-000"
                    },
                };

                await userManager.CreateAsync(user, "#Gui19982014");
            }
        } 
    }
}
