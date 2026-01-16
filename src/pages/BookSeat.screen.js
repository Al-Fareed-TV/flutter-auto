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
}
module.exports = BookSeats;