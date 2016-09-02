const {app, BrowserWindow} = require('electron')
let win

function createWindow () {
  win = new BrowserWindow({width: 600, height: 600, titleBarStyle: 'hidden', backgroundColor: '#369', resizable: false})

  win.loadURL(`file://${__dirname}/app/index.html`)

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})