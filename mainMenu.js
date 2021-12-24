const isMac = process.platform === 'darwin'

module.exports = [
    ...(isMac ? [{
        label: 'Electron app',
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Menu Item 1',
                submenu: [
                    {
                        label: 'Menu Item 1.1',
                        click: () => {
                            console.log('Menu Item 1.1 clicked')
                        },
                        accelerator: 'CmdOrCtrl+1',
                        enabled: false
                    },
                    {
                        role: 'toggleDevTools'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Menu Item 1.3',
                    }
                ]
            }
        ]
    }
]