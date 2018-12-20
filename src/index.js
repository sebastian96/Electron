const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url  = require('url');
const path = require('path');


// ACTUALIZACION AUTOMATICA DE VENTANAS Y CODIGO ↓↓↓
if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname,{
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

let mainWindow;
let newProductWindow;

// PANTALLA INICIAL ↓↓↓
app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    })) 

    const mainMenu = Menu.buildFromTemplate(templeteMenu)
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        app.quit();
    });
});

// CREACION DE NUEVA PANTALLA ↓↓↓
function createProduct(){
    newProductWindow =  new BrowserWindow({
        width: 400,
        height: 330,
        title: 'Add a new product'
    });
    newProductWindow.setMenu(null);
    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new_product.html'),
        protocol: 'file',
        slashes: true
    })) 
    newProductWindow.on('closed', () => {
        newProductWindow = null;
    });
}

ipcMain.on('product:new', (e, newProduct) => {
    mainWindow.webContents.send('product:new', newProduct);
    newProductWindow.close();
})
// CREACION PERZONALIZADA DEL MENU ↓↓↓
const templeteMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Product',
                accelerator : 'Ctrl+N',
                click(){
                    createProduct();
                }
            },
            {
                label: 'Remove all products',
                click(){
                    mainWindow.webContents.send('products:removeAll');
                }
            },
            {
                label: 'Exit',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    },
]

// MOSTRAR NOMBRE DE LA APLICACION SI LA PLATAFORMA ES macOS ↓↓↓
if(process.platform === 'darwin'){
    templeteMenu.unshift({
        label: app.getName()
    })
}

// HABILITAR MODO DESARROLLADOR ↓↓↓
if(process.env.NODE_ENV == 'produccion') {
    templeteMenu.push({
        label: 'Devtools',
        submenu: [
            {
                label: 'Show/Hide dev tools',
                accelerator: 'f12',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload',
                accelerator: 'F5'
            }
        ]
    })
}