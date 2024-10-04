const paypal = require('paypal-rest-sdk')

paypal.configure({
    mode: 'sandbox',
    client_id: 'ASHLGbbGidd-cWIIxvSurJACpUjmdGkCPy5WEYu3zL6aqxZWipy1BtWh2-V0ec4fMi1x4O-pm4zaxxEd',
    client_secret: 'EO8kbzbDaINAb18Dk655tGntxNyRw6gA1rcqcn0REHUv8pK4aGv8xk8mJtx3GEQlIYvzBk6BGjzpgJri'
})

module.exports = paypal;