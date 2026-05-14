using System;
using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(SignInManager<User> signInManager) : BaseApiController
{
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult> RegisterUser(RegisterDTo registerDTo)
    {
        var user = new User
        {
            UserName = registerDTo.Email,
            Email = registerDTo.Email,
            DisplayName = registerDTo.DisplayName
        };
        var result = await signInManager.UserManager.CreateAsync(user, registerDTo.Password!);
        if (result.Succeeded) return Ok();
        foreach (var item in result.Errors)
        {
            ModelState.AddModelError(item.Code, item.Description);
        }

        return ValidationProblem();
    }
    [AllowAnonymous]
    [HttpGet("user-info")]
    public async Task<ActionResult> GetUserInfo()
    {
        if(User.Identity?.IsAuthenticated == false) return NoContent();
        var user  = await signInManager.UserManager.GetUserAsync(User);
        if(user == null) return Unauthorized();
        return Ok(new
        {
            user.DisplayName,
            user.Email,
            user.Id,
            user.ImageUrl
        });

    }
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }

}
