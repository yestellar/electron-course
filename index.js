const { app, BrowserWindow, shell, ipcMain } = require('electron')
const coingecko = require('./coingecko')

const coinNames = ['bitcoin', 'ethereum', 'litecoin']

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

// IPC events
ipcMain.on('get-coins--request', async (e) => {
    const response = await coingecko.fetchCoins(coinNames)
    e.reply('get-coins--response', response.data)
})

ipcMain.on('show-window', (e) => {
    widgetWindow.show()
})

// App lifecycle events
app.on('ready', createWidgetWindow)

app.on('window-all-closed', () => {
    app.quit()
})