const { app, BrowserWindow } = require('electron')

// console.log('userDataPath: ', app.getPath('userData'))

let mainWindow = null 
let modalWindow = null

function createMainWindow() {
    mainWindow = new BrowserWindow({
       width: 800,
       height: 600,
       show: false
    })
    mainWindow.loadFile('index.html')
    mainWindow.on('closed', () => {
        mainWindow = null
        debugger
    })
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    // mainWindow.webContents.openDevTools()
}

function createModalWindow() {
    modalWindow = new BrowserWindow({
        width: 400,
        height: 300,
        show: false,
        parent: mainWindow,
        modal: true
    })
    modalWindow.loadFile('modal.html')
    modalWindow.on('closed', () => {
        modalWindow = null
        debugger
    })
    modalWindow.once('ready-to-show', () => {
        modalWindow.show()
    })
    // mainWindow.webContents.openDevTools()
}

app.on('ready', () => {
    createMainWindow()
    createModalWindow()
})

app.on('window-all-closed', () => {  
    app.quit()
})

app.on('before-quit', (event) => {
    console.log('before-quit');
})