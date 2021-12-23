const { app, BrowserWindow, dialog } = require('electron')

let window = null

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    })
    
    window.loadFile('index.html')
    
    window.on('closed', () => {
        window = null
    })

    window.webContents.on('did-finish-load', () => {
        window.show()

        // dialog.showOpenDialog({
        //     buttonLabel: 'Select a photo',
        //     defaultPath: app.getPath('desktop'),
        //     properties: ['openFile', 'multiSelections', 'showHiddenFiles', 'createDirectory'],
        //     filters: [
        //         { name: 'Images', extensions: ['jpg', 'png'] }
        //     ]
        // }).then(res => {
        //     console.log(res);
        // })

        // dialog.showSaveDialog({}).then(res => console.log(res))

        // dialog.showMessageBox({
        //     message: 'Message box',
        //     detail: 'Detail',
        //     buttons: ['Yes', 'No', 'Maybe']
        // }).then(res => {
        //     console.log(res);
        // })

        // dialog.showErrorBox('Title', 'Content')
    })

    // window.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})