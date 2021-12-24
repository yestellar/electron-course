const { app, BrowserWindow, Menu } = require('electron')

let window = null

let mainMenu = Menu.buildFromTemplate(require('./mainMenu'))

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
    Menu.setApplicationMenu(mainMenu)
})

app.on('window-all-closed', () => {
    app.quit()
})