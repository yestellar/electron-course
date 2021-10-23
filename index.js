const { app, BrowserWindow, session } = require('electron')

let win, win2

function createWindow() {
    // Первое окно
    win = new BrowserWindow({
        width: 800, height: 600,
        frame: false, titleBarOverlay: true, titleBarStyle: 'hidden',
    })
    win.loadFile('index.html')
    win.on('closed', () => { win = null })
    win.webContents.openDevTools()
    // Второе окно
    win2 = new BrowserWindow({
        width: 800, height: 600,
        frame: false, titleBarOverlay: true, titleBarStyle: 'hidden',
    })
    win2.loadFile('index2.html')
    win2.on('closed', () => { win2 = null })
    win2.webContents.openDevTools()
    //  Session
    let session = win.webContents.session
    let session2 = win2.webContents.session 
    let defaultSession = session.defaultSession

    console.log( Object.is(session, session2) )
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    app.quit()
})