const axios = require('axios')

async function fetchCoins(ids) {
    return await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`)
}

module.exports = { fetchCoins }