const generate = async () => {
    try{
      let products = [];
      for (let i = 0; i < 5; i++) {
        let product = {
          name: await faker.commerce.productName(),
          price: await faker.commerce.price(),
          photo: await faker.image.food(),
        };
        products.push(product);
      }
      console.log(products)
      return products;
    } catch {
      console.log(error);
    }
  };
  
  const templateProds = Handlebars.compile(`
  {{#if stockProductos}}
    <ul>
      {{#each stockProductos}}
        <li class="row">
        <h3>{{name}}</h3>
        <p>{{price}}</p>
        <img src="{{photo}}" alt="{{name}}">
        </li>
      {{/each}}
    </ul>
  {{else}}
    <h2>NO HAY PRODUCTOS PARA MOSTRAR</h2>
  {{/if}}
  
  <h2><a href="/">Volver a Home...</a></h2>
  `);
  
  generate()
  .then((products) => {
    let productos = document.querySelector(".productos");
    const html = templateProds({ stockProductos: products })
    productos.innerHTML = html;
  })
  .catch((error) => {console.log(error)});