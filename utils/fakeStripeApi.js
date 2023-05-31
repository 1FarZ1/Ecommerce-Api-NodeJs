// just a fake stripe api to get the client secret and amount to pay
const fakeStripeAPI = async ({ amount, currency }) => {
    const client_secret = 'someRandomValue';
    return { client_secret, amount };
  };


module.exports = fakeStripeAPI;