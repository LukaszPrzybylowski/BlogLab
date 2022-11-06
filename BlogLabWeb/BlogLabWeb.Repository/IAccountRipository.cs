using BlogLab.Models.Account;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BlogLabWeb.Repository
{
    public interface IAccountRipository
    {
        public Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken);
         
        public Task<ApplicationUserIdentity> GetByUsernameAsync(string norlmalizedUsername,
            CancellationToken cancellation);
    }
}
