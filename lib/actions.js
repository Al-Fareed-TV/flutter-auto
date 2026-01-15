const axios = require('axios');

class DriverContext {
  constructor(baseUrl = 'http://localhost:8080') {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
    });
  }

  /* ---------------- Core APIs ---------------- */

  async getWidgets(parent) {
    const res = await this.client.get('/widgets', { params: { parent } });
    return res.data;
  }

  async getKeys(parent) {
    const res = await this.client.get('/keys', { params: { parent } });
    return res.data;
  }

  async getTexts(text, key, parent) {
    const res = await this.client.get('/texts', {
      params: { text, key, parent }
    });
    return res.data;
  }

  async getEditables(parent) {
    const res = await this.client.get('/editables', { params: { parent } });
    return res.data;
  }

  async typeText(text) {
    const res = await this.client.get('/type', { params: { text } });
    return res.data;
  }

  async tap({ x, y, key, text, center, parent } = {}) {
    const res = await this.client.get('/tap', {
      params: { x, y, key, text, center, parent }
    });
    await this._wait(500);
    return res.data;
  }

  async hold(x, y) {
    const res = await this.client.get('/hold', { params: { x, y } });
    return res.data;
  }

  async drag(x, y, dx, dy) {
    const res = await this.client.get('/drag', {
      params: { x, y, dx, dy }
    });
    return res.data;
  }

  async scroll(key, dx, dy, parent) {
    const res = await this.client.get('/scroll', {
      params: { key, dx, dy, parent }
    });
    return res.data;
  }

  async scrollInto(scrollableKey, key, dx, dy, delay, timeout, parent) {
    const res = await this.client.get('/scroll-into', {
      params: {
        'scrollable-key': scrollableKey,
        key,
        dx,
        dy,
        delay,
        timeout,
        parent
      }
    });
    return res.data;
  }

  async getScreenshot() {
    const res = await this.client.get('/screenshot', {
      responseType: 'arraybuffer'
    });
    return res.data;
  }

  async showKeyboard() {
    const res = await this.client.get('/keyboard');
    return res.data;
  }

  async hideKeyboard() {
    const res = await this.client.delete('/keyboard');
    return res.data;
  }

  async submitKeyboardAction(type) {
    const res = await this.client.post('/keyboard', null, {
      params: { type }
    });
    return res.data;
  }

  /* ---------------- Aliases (DX helpers) ---------------- */

  async widgets(parent) {
    return this.getWidgets(parent);
  }

  async texts(options = {}) {
    if (typeof options === 'string') return this.getTexts(options);
    return this.getTexts(options.text, options.key, options.parent);
  }

  async editables(parent) {
    return this.getEditables(parent);
  }

  async type(text) {
    return this.typeText(text);
  }

  /* ---------------- Wait Helpers ---------------- */

  async waitForText(text, { timeout = 10000, interval = 500 } = {}) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const res = await this.texts({ text });
      if (res && res.length > 0) return res;
      await this._wait(interval);
    }
    throw new Error(`Timeout waiting for text: "${text}"`);
  }

  async _wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = DriverContext;
