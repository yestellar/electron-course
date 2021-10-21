const { app, BrowserWindow } = require('electron')

let mainWindow = null

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 250,
        height: 88,
        resizable: false,
        titleBarStyle: 'hidden',
        // titleBarOverlay: true,
        show: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        thickFrame: true,
    })
    mainWindow.loadFile('index.html')
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    // mainWindow.webContents.openDevTools()
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
    app.quit()
})
