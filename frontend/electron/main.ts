import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let win: BrowserWindow | null;

function createWindow() {
	// Icon will not work on macOS
	win = new BrowserWindow({
		fullscreen: true,
		icon: `file://${__dirname}/dist/assets/logo.png`
	});

	win.loadURL('file://' + path.join(__dirname, `/../../dist/frontend/index.html`));

	// Comment this on prod
	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	// macOS specific close process
	if (process.platform !== 'darwin') app.quit();
});

// macOS specific close process
app.on('activate', () => {
	if (win === null) createWindow();
});
