const { app, BrowserWindow } = require('electron')

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
        // titleBarStyle: 'hidden',
        // titleBarOverlay: true,
        // backgroundColor: '#444',
        alwaysOnTop: true,
        resizable: false,
        hasShadow: false,
        // thickFrame: false,
        transparent: true
    })
    
    widgetWindow.loadFile('index.html')
    
    widgetWindow.on('closed', () => {
        widgetWindow = null
    })
}

app.on('ready', createWidgetWindow)

app.on('window-all-closed', () => {
    app.quit()
})