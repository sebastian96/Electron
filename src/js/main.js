const {ipcRenderer} = require('electron');

const products = document.querySelector('#products');

ipcRenderer.on('product:new', (e, newProduct) => {
    console.log(newProduct);
    const newTemplate = `
        <div class="col-md-6 col-lg-4 p-2 p-2">
            <div class="card text-center">
                <div class="card-header">
                    <h2 class="title text-info">${newProduct.name}</h2>
                </div>
                <div class="card-body">
                    <h4 class="price text-warning">$ ${newProduct.price}</h4>
                    <hr>
                    <h3 class="description">${newProduct.description}</h3>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger btn-sm">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    `;

    products.innerHTML += newTemplate;

    const btns = document.querySelectorAll('.btn-danger');

    btns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.target.parentElement.parentElement.parentElement.remove();
        })
    })
});

ipcRenderer.on('products:removeAll', (e) => {
    products.innerHTML = "";
})