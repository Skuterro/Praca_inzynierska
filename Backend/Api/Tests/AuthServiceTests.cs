using Api.Database;
using Api.Exceptions;
using Api.Models.Entities;
using Api.Models.Requests.AuthRequests;
using Api.Services.Impl;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NSubstitute;

namespace Api.Tests
{
    [TestClass]
    public class AuthServiceTests
    {
        private IAuthService _authService;
        private UserManager<User> _userManagerMock;
        private ITokenService _tokenServiceMock;
        private AppDbContext _context;

        [TestInitialize]
        public void Setup()
        {
            _tokenServiceMock = Substitute.For<ITokenService>();

            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new AppDbContext(options);

            var userStoreMock = Substitute.For<IUserStore<User>>();
            _userManagerMock = Substitute.For<UserManager<User>>(
                userStoreMock, null, null, null, null, null, null, null, null
            );

            _authService = new AuthService(_userManagerMock, _tokenServiceMock, _context);
        }

        [TestCleanup]
        public void Cleanup()
        {
            _context.Dispose();
        }

        [TestMethod]
        public async Task RegisterAsync_ShouldCreateUserAndReturnTokens_WhenUserMmDoesNotExits()
        {
            var request = new RegisterRequestDto { Email = "nowy@test.pl", Password = "password", UserName = "Jan_testowy" };

            _userManagerMock.FindByEmailAsync(request.Email).Returns((User)null);

            _userManagerMock.CreateAsync(Arg.Any<User>(), request.Password)
                .Returns(IdentityResult.Success);

            _tokenServiceMock.GenerateJwtToken(Arg.Any<User>()).Returns("jwt_token");
            _tokenServiceMock.GenerateRefreshToken().Returns(new RefreshToken { Token = "refresh_token", UserId = "uid" });

            var result = await _authService.RegisterAsync(request);

            Assert.IsNotNull(result);
            Assert.AreEqual("jwt_token", result.Token);
            Assert.AreEqual("refresh_token", result.RefreshToken);

            Assert.AreEqual(1, await _context.RefreshTokens.CountAsync());
        }

        [TestMethod]
        public async Task RegisterAsync_ShouldThrowBadRequest_WhenUserAlreadyExists()
        {
            var request = new RegisterRequestDto { Email = "istniejacy@test.pl" };
            var existingUser = new User { Email = request.Email };

            _userManagerMock.FindByEmailAsync(request.Email).Returns(existingUser);

            await Assert.ThrowsAsync<BadRequestException>(async () =>  await _authService.RegisterAsync(request));
        }

        [TestMethod]
        public async Task LoginAsync_ShouldReturnTokens_WhenCredentialsAreValid()
        {
            var request = new LoginRequestDto { Email = "jan@test.pl", Password = "Password" };
            var user = new User { Id = "1", Email = request.Email };

            _userManagerMock.FindByEmailAsync(request.Email).Returns(user);
            _userManagerMock.CheckPasswordAsync(user, request.Password).Returns(true);

            _tokenServiceMock.GenerateJwtToken(user).Returns("jwt");
            _tokenServiceMock.GenerateRefreshToken().Returns(new RefreshToken { Token = "refresh" });

            var result = await _authService.LoginAsync(request);

            Assert.AreEqual("jwt", result.Token);
        }

        [TestMethod]
        public async Task LoginAsync_ShouldThrowUnauthorized_WhenPasswordIsInvalid()
        {
            var request = new LoginRequestDto { Email = "jan@test.pl", Password = "Wrong" };
            var user = new User { Email = request.Email };

            _userManagerMock.FindByEmailAsync(request.Email).Returns(user);
            _userManagerMock.CheckPasswordAsync(user, request.Password).Returns(false);

            await Assert.ThrowsAsync<UnauthorizedException>(async () =>
                await _authService.LoginAsync(request));
        }

        [TestMethod]
        public async Task RefreshAsync_ShouldReturnNewTokens_WhenTokenIsValid()
        {
            var userId = "user-1";
            var user = new User { Id = userId, Email = "test@test.pl" };
            var existingToken = "old-refresh-token";

            var refreshTokenEntity = new RefreshToken
            {
                Token = existingToken,
                UserId = userId,
                User = user,
                ExpiresAt = DateTime.UtcNow.AddDays(1),
                IsRevoked = false
            };

            _context.Users.Add(user);
            _context.RefreshTokens.Add(refreshTokenEntity);
            await _context.SaveChangesAsync();

            _tokenServiceMock.GenerateJwtToken(Arg.Any<User>()).Returns("new_jwt");
            _tokenServiceMock.GenerateRefreshToken().Returns(new RefreshToken { Token = "new_refresh" });

            var result = await _authService.RefreshAsync(existingToken);

            Assert.AreEqual("new_jwt", result.Token);
            Assert.AreEqual("new_refresh", result.RefreshToken);
        }

        [TestMethod]
        public async Task RefreshAsync_ShouldThrowUnauthorized_WhenTokenIsExpired()
        {
            var expiredToken = "expired-token";
            var tokenEntity = new RefreshToken
            {
                Token = expiredToken,
                ExpiresAt = DateTime.UtcNow.AddDays(-1),
                IsRevoked = false,
                User = new User { Id = "u1" }
            };

            _context.RefreshTokens.Add(tokenEntity);
            await _context.SaveChangesAsync();

            await Assert.ThrowsAsync<UnauthorizedException>(async () =>
                await _authService.RefreshAsync(expiredToken));
        }
    }
}
