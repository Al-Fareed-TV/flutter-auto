const { expect } = require('chai');
const createDriver = require('../lib/actions');
const LoginPage = require('../src/pages/Login.page');

describe('Login', function () {
    this.timeout(30000);

    let driver;
    let login;

    before(async () => {
        driver = new createDriver();
        login = new LoginPage(driver);

        const widgets = await driver.widgets();
        console.log(widgets);

    });

    it('user should be able to register', async () => {
        await login.openRegistration();
        await login.enterName('Test User');
        await login.enterEmail('test@example.com');
        await login.enterPhone('1234567890');
        await login.submit();

        // const welcome = await driver.waitForText('Welcome');
        // expect(welcome.length).to.be.greaterThan(0);
    });
});
