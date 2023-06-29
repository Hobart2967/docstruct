import { app, BrowserWindow, shell } from 'electron';
import { join } from 'path';

require('@electron/remote/main').initialize()

if (process.platform === 'win32') {
  app.setAppUserModelId(app.getName())
}

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null

async function createWindow(): Promise<void> {

  win = new BrowserWindow({
    title: 'DocStruct',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
  })

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    const url = `http://localhost:5173`

    require('@electron/remote/main').enable(win.webContents);
    win.loadURL(url);
    win.webContents.openDevTools();
  }
  win.setMenu(null);
  // Test active push message to Renderer-process
  win.webContents.on('did-finish-load', () =>
    win?.webContents.send('main-process-message', (new Date).toLocaleString()))

  // Make all links open with the browser, not with the application
  /*win.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith('https:')) {
      return { action: 'deny' };
    }

    shell.openExternal(url);
    return { action: 'allow' };
  })*/
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null;

  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})
