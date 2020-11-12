// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain
} = require('electron');
const path = require('path');
const windowOptions = {
    width: 1080,
    minWidth: 680,
    height: 840,
    title: app.getName(),
    webPreferences: {
        nodeIntegration: true
    }
}
const initWindowOptions = {
    width: 1080,
    minWidth: 680,
    height: 840,
    title: app.getName(),
    webPreferences: {
        nodeIntegration: true
    },
    frame: 'false'
}

let MainStorage = {};

if (process.mas) app.setName('Electron APIs');

function createWindow() {

    MainStorage.initWindow = new BrowserWindow(initWindowOptions)
    //  initWindow.loadFile('web/init/init.html')
    MainStorage.initWindow.loadURL(path.join('file://', __dirname, '/app/init/init.html'))
    // Open the DevTools.
    // MainStorage.initWindow.webContents.openDevTools()
}

ipcMain.on('openAppWindow', (event, arg) => {
    openAppWindow();
    console.log(event);
    console.log(arg)
})

function openAppWindow() {
    MainStorage.mainWindow = new BrowserWindow(windowOptions);
    // mainWindow.loadFile('web/app/app.html');
    MainStorage.mainWindow.loadURL(path.join('file://', __dirname, '/app/main/app.html'));
    MainStorage.initWindow.close();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.