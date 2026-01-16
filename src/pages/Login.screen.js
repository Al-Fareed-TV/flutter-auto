class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }

  async openRegistration() {
    await this.driver.tap({ text: 'Register' });
  }

  async enterName(name) {
    const fields = await this.driver.editables();
    if (!fields || fields.length === 0) throw new Error('No editable fields found');
    await this.driver.tap({
      x: fields[0].position.left + 10,
      y: fields[0].position.top + 10
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.driver.type(name);
    await this.driver.hideKeyboard();
  }

  async enterEmail(email) {
    const fields = await this.driver.editables();
    if (!fields || fields.length < 2) throw new Error('Not enough editable fields found for email');
    await this.driver.tap({
      x: fields[1].position.left + 10,
      y: fields[1].position.top + 10
    });
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.driver.type(email);
    await this.driver.hideKeyboard();
  }

  async enterPhone(phone) {
    const fields = await this.driver.editables();
    if (!fields || fields.length < 3) throw new Error('Not enough editable fields found for phone');
    await this.driver.tap({
      x: fields[2].position.left + 10,
      y: fields[2].position.top + 10
    });
    await new Promise(resolve => setTimeout(resolve, 500));
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

  async logout() {
    const buttons = await this.driver.texts({ text: 'Logout' });
    if (!buttons || buttons.length === 0) throw new Error('Logout button not found');
    const btn = buttons[buttons.length - 1];
    await this.driver.tap({
      x: btn.position.left + 10,
      y: btn.position.top + 10
    });
  }
}

module.exports = LoginPage;
