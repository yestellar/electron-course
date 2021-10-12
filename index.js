const { app, BrowserWindow } = require('electron')

let mainWindow = null 

console.log('hello')

function createMainWindow() {
    mainWindow = new BrowserWindow({
       width: 800,
       height: 600 
    })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', () => {
        mainWindow = null
        debugger
    })
    mainWindow.webContents.openDevTools()
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit() 
    }
})