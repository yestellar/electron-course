const { app, BrowserWindow, shell, ipcMain } = require('electron')
const coingecko = require('./coingecko')

let widgetWindow = null

function createWidgetWindow() {
    widgetWindow = new BrowserWindow({
        width: 250,
        // height: 88,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        frame: false,
        alwaysOnTop: true,
        resizable: false,
        hasShadow: false,
        transparent: true,
        show: false
    })
    
    widgetWindow.loadFile('index.html')
    
    widgetWindow.on('closed', () => {
        widgetWindow = null
    })

    widgetWindow.webContents.on('did-finish-load', () => {
        widgetWindow.show()
    })

    widgetWindow.webContents.setWindowOpenHandler((e) => {
        shell.openExternal(e.url)
        return { action: 'deny' }
    })

    // widgetWindow.webContents.openDevTools()
}

ipcMain.on('data-request', async (e, ...args) => {
    const coins = await coingecko.fetchCoins('bitcoin,ethereum,litecoin,uniswap,dogecoin')

    e.reply('data-response', coins)
    // widgetWindow.webContents.send('data-response', coinNames)
})

app.on('ready', createWidgetWindow)

app.on('window-all-closed', () => {
    app.quit()
})