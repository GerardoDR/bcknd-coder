document.addEventListener("DOMContentLoaded", () => {
    let title = document.querySelector('[name="newTitle"]')
    let price = document.querySelector('[name="newPrice"]')
    let prodSubmit = document.querySelector('#newProd')
    let productList = document.querySelector('.productList')
    prodSubmit.addEventListener('click', postProduct)

    getProducts();

    function getProducts() {
        fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            renderProducts(data.products)
        });
    }

    function postProduct(e) {
        e.preventDefault();

        let data = {
            title: title.value,
            price: price.value
        }

        fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log("Error: ", error))
        .then(data => {
            console.log(data);
            renderProduct(data.product)
        })

    }

    function renderProduct(product) {
        let prodContainer = document.createElement('div')
        prodContainer.className='product'
        let title = document.createElement('span');
        title.className='prodTitle'
        let price = document.createElement('span');
        price.className='prodPrice'
        console.log(product);
        title.innerHTML = product.title;
        price.innerHTML = product.price;

        prodContainer.appendChild(title)
        prodContainer.appendChild(price)

        productList.appendChild(prodContainer)        
    }

    function renderProducts(products) {
        products.forEach(product => {
            renderProduct(product);
        });
    }
})