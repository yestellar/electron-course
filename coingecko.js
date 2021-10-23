const axios = require('axios')

async function getData(ids) {
    // axios.get('https://api.coingecko.com/api/v3/coins/list')
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + ids)
    return response.data
}

module.exports = { getData }



