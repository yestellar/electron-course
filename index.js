const { app, BrowserWindow } = require('electron')

// console.log('userDataPath: ', app.getPath('userData'))

let mainWindow = null 

function createMainWindow() {
    mainWindow = new BrowserWindow({
       width: 800,
       height: 600,
       show: false
    })
    mainWindow.loadURL('https://google.com')
    mainWindow.on('closed', () => {
        mainWindow = null
        debugger
    })
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    // mainWindow.webContents.openDevTools()
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {  
    app.quit()
})

app.on('before-quit', (event) => {
    console.log('before-quit');
})