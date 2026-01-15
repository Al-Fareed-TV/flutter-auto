const axios = require('axios');

class DriverContext {
    constructor(baseUrl = 'http://localhost:8080') {
        this.client = axios.create({
            baseURL: baseUrl,
            timeout: 10000,
        });
    }

    /**
     * Returns entire widget tree.
     * @param {string} parent - if provided, returns widget tree starting from the first widget of the specified type
     */
    async getWidgets(parent) {
        const response = await this.client.get('/widgets', { params: { parent } });
        return response.data;
    }

    /**
     * Returns list of all the keyed widgets.
     * @param {string} parent - if provided, returns only keyed widgets within the specified parent widget type
     */
    async getKeys(parent) {
        const response = await this.client.get('/keys', { params: { parent } });
        return response.data;
    }

    /**
     * Returns list of text widgets.
     * @param {string} text - filters widgets with matching text
     * @param {string} key - returns widget that matches key
     * @param {string} parent - if provided, searches only within the specified parent widget type
     */
    async getTexts(text, key, parent) {
        const response = await this.client.get('/texts', { params: { text, key, parent } });
        return response.data;
    }

    /**
     * Returns list of all text fields.
     * @param {string} parent - if provided, returns only text fields within the specified parent widget type
     */
    async getEditables(parent) {
        const response = await this.client.get('/editables', { params: { parent } });
        return response.data;
    }

    /**
     * Types given text to the focused text field
     * @param {string} text 
     */
    async typeText(text) {
        const response = await this.client.get('/type', { params: { text } });
        return response.data;
    }

    /**
     * Taps on screen at an offset, a key or a text.
     * @param {Object} options
     * @param {number} options.x - x offset
     * @param {number} options.y - y offset
     * @param {string} options.key - taps on widget with given key
     * @param {string} options.text - taps on text widget with given text
     * @param {boolean} options.center - set to true to tap at center of the widget
     * @param {string} options.parent - if provided, searches only within the specified parent widget type
     */
    async tap({ x, y, key, text, center, parent } = {}) {
        const response = await this.client.get('/tap', { params: { x, y, key, text, center, parent } });
        return response.data;
    }

    /**
     * Tap and hold on given offset
     * @param {number} x 
     * @param {number} y 
     */
    async hold(x, y) {
        const response = await this.client.get('/hold', { params: { x, y } });
        return response.data;
    }

    /**
     * Taps at (x,y) and drags (dx, dy) offset
     * @param {number} x 
     * @param {number} y 
     * @param {number} dx 
     * @param {number} dy 
     */
    async drag(x, y, dx, dy) {
        const response = await this.client.get('/drag', { params: { x, y, dx, dy } });
        return response.data;
    }

    /**
     * Taps inside scrollable and drags.
     * @param {string} key - key of scrollable widget
     * @param {number} dx 
     * @param {number} dy 
     * @param {string} parent - if provided, searches only within the specified parent widget type
     */
    async scroll(key, dx, dy, parent) {
        const response = await this.client.get('/scroll', { params: { key, dx, dy, parent } });
        return response.data;
    }

    /**
     * Scrolls until target widget becomes visible.
     * @param {string} scrollableKey - key of scrollable widget
     * @param {string} key - key of widget to scroll into view
     * @param {number} dx 
     * @param {number} dy 
     * @param {number} delay - milliseconds between drags (default: 500)
     * @param {number} timeout - timeout in milliseconds (default: 5000)
     * @param {string} parent - if provided, searches only within the specified parent widget type
     */
    async scrollInto(scrollableKey, key, dx, dy, delay, timeout, parent) {
        const response = await this.client.get('/scroll-into', {
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
        return response.data;
    }

    /**
     * Returns screenshot of app in PNG
     */
    async getScreenshot() {
        const response = await this.client.get('/screenshot', { responseType: 'arraybuffer' });
        return response.data;
    }

    /**
     * Shows keyboard
     */
    async showKeyboard() {
        const response = await this.client.get('/keyboard');
        return response.data;
    }

    /**
     * Hides keyboard
     */
    async hideKeyboard() {
        const response = await this.client.delete('/keyboard');
        return response.data;
    }

    /**
     * Submits a keyboard action.
     * @param {string} type 
     */
    async submitKeyboardAction(type) {
        const response = await this.client.post('/keyboard', null, { params: { type } });
        return response.data;
    }

    // --- Aliases and Helpers for Test Suite Compatibility ---

    /** Aliases for getWidgets */
    async widgets(parent) { return this.getWidgets(parent); }

    /** Aliases for getTexts with object parameter support */
    async texts(options = {}) {
        if (typeof options === 'string') return this.getTexts(options);
        return this.getTexts(options.text, options.key, options.parent);
    }

    /** Aliases for getEditables */
    async editables(parent) { return this.getEditables(parent); }

    /** Aliases for typeText */
    async type(text) { return this.typeText(text); }

    /**
     * Polling helper to wait for text to appear
     */
    async waitForText(text, { timeout = 10000, interval = 500 } = {}) {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            const results = await this.texts({ text });
            if (results && results.length > 0) {
                return results;
            }
            await new Promise(resolve => setTimeout(resolve, interval));
        }
        throw new Error(`Timeout waiting for text: "${text}"`);
    }
}

module.exports = DriverContext;
