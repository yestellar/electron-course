const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const coingecko = require('./coingecko')

let mainWindow = null

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 250,
        x: 1000,
        y: 200,
        // height: 88,
        resizable: false,
        titleBarStyle: 'hidden',
        // titleBarOverlay: true,
        show: true,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        },
        thickFrame: true,
    })
    
    mainWindow.loadFile('index.html')

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    mainWindow.webContents.on('did-finish-load', () => {
        coingecko.getData('bitcoin,ethereum,cardano,dogecoin').then(data => {
            console.log(data);
            mainWindow.webContents.send('request:load-data', data)
        })
    })
    // mainWindow.webContents.openDevTools()
}
// App lifecycle events
app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
    app.quit()
})
// IPC events
ipcMain.on('response:load-data', () => {
    mainWindow.show()
})

ipcMain.on('request:open-settings', () => {
    console.log('open settings');
})