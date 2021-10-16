const { app, BrowserWindow } = require('electron')

// console.log(app.getPath('userData'))

let mainWindow = null 

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
    app.quit()
})

// app.on('before-quit', (event) => {
//     console.log('before-quit');
// })