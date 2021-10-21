let bitcoinImage;

function fetchBitcoinPrice() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin')
        .then(response => response.json())
        .then(data => {
            const bitcoin = data[0]
            const bitcoinPrice = bitcoin.current_price
            if (!bitcoinImage) {
                document.querySelector('#btc-image').src = bitcoin.image
                bitcoinImage = true
            }
            
            document.querySelector('#btc-price').innerHTML = bitcoinPrice
            document.querySelector('#date').innerHTML = new Date().toLocaleTimeString()
        })
}

fetchBitcoinPrice()
setInterval(fetchBitcoinPrice, 20000)



