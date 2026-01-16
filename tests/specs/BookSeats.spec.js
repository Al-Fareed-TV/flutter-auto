const { expect } = require('chai');
const DriverContext = require('../../lib/actions');
const BookSeats = require('../../src/pages/BookSeat.screen');
const RegistrationFlow = require('../../src/flows/Registeration.flow');

describe('Login', function () {
  this.timeout(30000);

  let driver;
  let bookSeats;

  before(async () => {
    driver = new DriverContext();
    bookSeats = new BookSeats(driver);
  });

  it('user should be able to select seats', async () => {
    await bookSeats.tapBookSeatsButton();
    await bookSeats.selectSeats();
    await bookSeats.confirmBooking();
    await bookSeats.enterName('John Doe');
    await bookSeats.tapOnConfirmButton();
    await bookSeats.tapOkButton();
    await bookSeats.tapBackButton();
  });

});
