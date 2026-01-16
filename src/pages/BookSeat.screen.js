class BookSeats {
    constructor(driver) {
        this.driver = driver;
    }
    async tapBookSeatsButton() {
        await this.driver.tap({ text: 'Book Seats' });
    }
    async selectSeats() {
        await this.driver.tap({ x: 72.0, y: 612.3333333333334 });
        await this.driver.tap({ x: 112.0, y: 612.3333333333334 });
        await this.driver.tap({ x: 152.0, y: 612.3333333333334 });
    }
    async confirmBooking() {
        await this.driver.tap({ text: 'Confirm Booking' });
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

    async confirmBooking() {
        await this.driver.tap({ text: 'Confirm Booking' });
    }
    async tapOnConfirmButton() {
        await this.driver.tap({ text: 'Confirm' });
    }

    async tapOkButton() {
        await this.driver.tap({ text: 'OK' });
    }

    async tapBackButton() {
        await this.driver.tap({
            x: 16.0,
            y: 66.33
        });
    }
}
module.exports = BookSeats;