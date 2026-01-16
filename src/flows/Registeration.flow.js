const LoginPage = require('../pages/Login.screen');
const { faker } = require('@faker-js/faker');

class RegistrationFlow {
    constructor(driver) {
        this.driver = driver;
    }
    async register() {
        const login = new LoginPage(this.driver);
        await login.openRegistration();
        await login.enterName(faker.person.fullName());
        await login.enterEmail(faker.internet.email());
        await login.enterPhone(faker.phone.number());
        await login.submit();
    }
}

module.exports = RegistrationFlow;
