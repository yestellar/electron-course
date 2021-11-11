const axios = require('axios')

async function fetchCoins(ids) {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + ids)
    return response.data
}

module.exports = { fetchCoins }

