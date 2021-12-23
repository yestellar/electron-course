const { app, BrowserWindow, globalShortcut } = require('electron')

let window = null

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    
    window.loadFile('index.html')
    
    window.on('closed', () => {
        window = null
    })

    window.webContents.openDevTools()
}

app.on('ready', () => {
    createWindow()
    globalShortcut.register('CommandOrControl+Shift+I', () => {
        console.log('CommandOrControl+Shift+I is pressed')
        globalShortcut.unregister('CommandOrControl+Shift+I')
    })
})

app.on('window-all-closed', () => {
    app.quit()
})