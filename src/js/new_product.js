const electron = require('electron');
const {ipcRenderer} = require('electron');
const form = document.querySelector('form');


form.addEventListener('submit', function(e) {
    const nameProduct = document.querySelector('#producto').value;
    const priceProduct = document.querySelector('#precio').value;
    const descProduct = document.querySelector('#descripcion').value;

    const newProduct = {
        name: nameProduct,
        price: priceProduct,
        description: descProduct
    }

    ipcRenderer.send('product:new', newProduct);

    e.preventDefault();
})