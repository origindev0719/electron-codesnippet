import { app, BrowserWindow, ipcMain } from "electron"

let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    minWidth: 800,
    backgroundColor: "#191622",
    webPreferences: {
      nodeIntegration: false,
      devTools: true,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.webContents.openDevTools()

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.on("closed", () => {
    mainWindow = null
  })

  mainWindow.setMenu(null)
}

async function registerListeners() {
  ipcMain.on("message", (_, message) => {
    console.log(message)
  })
}

app
  .on("ready", createWindow)
  .whenReady()
  .then(registerListeners)
  .catch((e) => console.error(e))

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
