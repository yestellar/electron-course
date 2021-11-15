const { app, BrowserWindow } = require('electron')

let mainWindow = null

// Window's functions
function createWindows() {
    mainWindow = new BrowserWindow({ width: 600, height: 600 })
    mainWindow.loadURL('https://github.com')

    mainWindow.webContents.on('did-finish-load', async () => {
        // Set cookie
        const cookie = { url: 'https://myappdomain.com', name: 'cookieName', value: 'cookieValue' }
        await mainWindow.webContents.session.cookies.set(cookie)
        // Remove cookie 
        await mainWindow.webContents.session.cookies.remove('https://myappdomain.com', 'cookieName')
        // Get cookies 
        const cookies = await mainWindow.webContents.session.cookies.get({})
        console.log(cookies)
    })

    mainWindow.on('closed', () => { mainWindow = null })
}

// App lifecycle events
app.on('ready', createWindows)

app.on('window-all-closed', () => {
    app.quit()
})