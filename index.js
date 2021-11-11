const { app, BrowserWindow, session } = require('electron')

let firstWindow = null
let secondWindow = null

// Window's functions
function createWindows() {
    // Create custom session 
    const customSession = session.fromPartition('persist:custom-session')
    // Create the first window
    firstWindow = new BrowserWindow({ width: 600, height: 600, x: 100, y: 200 })
    firstWindow.loadFile('first.html')
    firstWindow.on('closed', () => { firstWindow = null })
    firstWindow.webContents.openDevTools()
    // Create the second window
    secondWindow = new BrowserWindow({ 
        width: 600, 
        height: 600,
        webPreferences: {
            // session: customSession
            partition: 'persist:custom-session'
        }
    })
    secondWindow.loadFile('second.html')
    secondWindow.on('closed', () => { secondWindow = null })
    secondWindow.webContents.openDevTools()
    // Session
    const ses = firstWindow.webContents.session
    const ses2 = secondWindow.webContents.session
    const defaultSession = session.defaultSession

    ses.clearStorageData()


    // console.log(Object.is(defaultSession, cryptoSession))
}

// App lifecycle events
app.on('ready', createWindows)

app.on('window-all-closed', () => {
    app.quit()
})