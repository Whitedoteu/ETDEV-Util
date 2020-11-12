const {ipcRenderer} = require('electron');


document.getElementById('idBTNgetStarted').addEventListener('click', event => {
    ipcRenderer.send('openAppWindow', event)
})