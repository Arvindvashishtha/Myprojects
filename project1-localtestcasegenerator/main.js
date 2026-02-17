const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#0f172a',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // For simple local dev; ideally use preload scripts for security
            webSecurity: false // Allow loading local resources if needed, though usually file:// handles it
        },
        autoHideMenuBar: true
    });

    win.loadFile('index.html');

    // Optional: Open DevTools for debugging
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    // Set CSP to allow connecting to localhost:11434
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': ["default-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:11434 https://cdn.jsdelivr.net https://fonts.googleapis.com https://fonts.gstatic.com data:"]
            }
        })
    });

    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
