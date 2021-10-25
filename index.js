const { app, BrowserWindow, shell, webContents } = require('electron')

let widgetWindow = null

function createWidgetWindow() {
    widgetWindow = new BrowserWindow({
        width: 250,
        height: 88,
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

    console.log( webContents.getAllWebContents() )
}

app.on('ready', createWidgetWindow)

app.on('window-all-closed', () => {
    app.quit()
})