const {app, BrowserWindow, Menu} = require('electron');

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        icon: `${__dirname}/icon.png`,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '..', 'build', 'index.html')}`).then();
    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
    Menu.setApplicationMenu(null)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
