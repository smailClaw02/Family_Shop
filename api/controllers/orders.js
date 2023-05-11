const fetch = require('node-fetch');
const config = require('../config')

const shipORder = async (req, res) => {
    console.log('Shipping order')
    const resp = await fetch(config.local_api_url + '/orders');
    const orders = await resp.json()
    return res.json(orders)
}

module.exports = function (server) {
    server.post("/orders/:id/ship", shipORder);
}