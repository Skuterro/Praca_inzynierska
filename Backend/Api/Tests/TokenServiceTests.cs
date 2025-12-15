using System.IdentityModel.Tokens.Jwt;
using Api.Models.Entities;
using Api.Services.Impl;
using Api.Services.Interfaces;
using NSubstitute;

namespace Api.Tests
{
    [TestClass]
    public class TokenServiceTests
    {
        private ITokenService _tokenService;
        private IConfiguration _configMock;

        private const string TestKey = "SuperSecretKeyThatIsLongEnoughForHmacSha256!";
        private const string TestIssuer = "TestIssuer";
        private const string TestAudience = "TestAudience";

        [TestInitialize]
        public void Setup()
        {
            _configMock = Substitute.For<IConfiguration>();

            _configMock["Jwt:Key"].Returns(TestKey);
            _configMock["Jwt:Issuer"].Returns(TestIssuer);
            _configMock["Jwt:Audience"].Returns(TestAudience);

            _tokenService = new TokenService(_configMock);
        }

        [TestMethod]
        public void GenerateJwtToken_ShouldReturnValidTokenString_WhenUserIsProvided()
        {
            var user = new User
            {
                Id = "1",
                UserName = "Jan_testowy",
                Email = "jan@test.pl"
            };

            var token = _tokenService.GenerateJwtToken(user);

            Assert.IsFalse(string.IsNullOrWhiteSpace(token), "Token should not be empty");

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var subClaim = jwtToken.Claims.First(c => c.Type == JwtRegisteredClaimNames.Sub).Value;

            Assert.AreEqual(TestIssuer, jwtToken.Issuer);
            Assert.AreEqual(TestAudience, jwtToken.Audiences.First());
            Assert.AreEqual(user.Id, subClaim);
        }

        [TestMethod]
        public void GenerateRefreshToken_ShouldReturnTokenWithFutureExpiryDate()
        {
            var refreshToken = _tokenService.GenerateRefreshToken();

            Assert.IsNotNull(refreshToken);
            Assert.IsNotNull(refreshToken.Token);
        }
    }
}
