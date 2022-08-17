class Product {
  #title;
  #price;
  #thumbnail;

  constructor({ title, price, thumbnail }) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }

  get title() {
    return this.#title;
  }

  set title(title) {
    if (!title) throw new Error('"title" es un campo requerido');
    this.#title = title;
  }

  get price() {
    return this.#price;
  }

  set price(price) {
    if (!price) throw new Error('"price" es un campo requerido');
    if (isNaN(price)) throw new Error('"price" debe ser numérico');
    if (price < 0) throw new Error('"price" debe ser positivo');
    this.#price = price;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  set thumbnail(thumbnail) {
    // if (!thumbnail) throw new Error('"thumbnail" es un campo requerido');
    this.#thumbnail = thumbnail;
  }
}

module.exports = Product;