const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // Whitelist channels
            // From renderer to main
            let validChannels = [
                "response:load-data",
                "request:open-settings",
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            // Whitelist channels
            // From main to renderer
            let validChannels = [
                "request:load-data"
            ];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        data: {
            someData: 'some data'
        }
    }
);