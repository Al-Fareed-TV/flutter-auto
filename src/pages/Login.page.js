class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async openRegistration() {
    await this.driver.tap({ text: 'Register' });
  }

  async enterName(name) {
    const fields = await this.driver.editables();
    await this.driver.tap({
      x: fields[0].position.left + 10,
      y: fields[0].position.top + 10
    });
    await this.driver.type(name);
    await this.driver.hideKeyboard();
  }

  async enterEmail(email) {
    const fields = await this.driver.editables();
    await this.driver.tap({
      x: fields[1].position.left + 10,
      y: fields[1].position.top + 10
    });
    await this.driver.type(email);
    await this.driver.hideKeyboard();
  }

  async enterPhone(phone) {
    const fields = await this.driver.editables();
    await this.driver.tap({
      x: fields[2].position.left + 10,
      y: fields[2].position.top + 10
    });
    await this.driver.type(phone);
    await this.driver.hideKeyboard();
  }

  async submit() {
    const buttons = await this.driver.texts({ text: 'Register' });
    const btn = buttons[buttons.length - 1];
    await this.driver.tap({
      x: btn.position.left + 10,
      y: btn.position.top + 10
    });
  }
}

module.exports = LoginPage;
