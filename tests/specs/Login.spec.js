const { expect } = require('chai');
const DriverContext = require('../../lib/actions');

const { faker } = require('@faker-js/faker');
const LoginPage = require('../../src/pages/Login.screen');

describe('Login', function () {
  this.timeout(30000);

  let driver;
  let login;

  before(async () => {
    driver = new DriverContext();
    login = new LoginPage(driver);
  });

  it('user should be able to register', async () => {
    await login.openRegistration();
    await login.enterName(faker.person.fullName());
    await login.enterEmail(faker.internet.email());
    await login.enterPhone(faker.phone.number());
    await login.submit();

    const welcome = await driver.waitForText('Welcome to Theatre Booking');
    expect(welcome.length).to.be.greaterThan(0);
  });


  it('user should be able to logout', async () => {
    await login.logout();
  });
});
