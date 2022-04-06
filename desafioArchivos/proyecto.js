const fs = require("fs");

class Contenedor {
    constructor(archive) {
        this.archive = archive;
    }

    async save(obj) {

        const getAvailableId = (prods) => {
            const ids = prods.map((p) => p.id);
            const avail = Math.max(...ids) + 1;
            return (avail ? avail : 1)
        }

        try {

            const products = await read(this.archive);
            obj.id = getAvailableId(products);
            products.push(obj);

            await write(this.archive, JSON.stringify(products));

        } catch (error) {
            throw new Error();
        }
    }

    async getById(id) {
        try {

            const products = await read(this.archive);
            console.log(products.find((p) => p.id === id))

        } catch (error) {
            throw new Error();
        }
    }

    async getAll() {
        try {

            const products = await read(this.archive);
            console.log(products)

        } catch (error) {
            throw new Error();
        }
    }

    async deleteById(id) {
        try {

            const products = await read(this.archive);
            const newProducts = products.filter((p) => p.id !== id);
            await this.deleteAll();
            await write(this.archive, JSON.stringify(newProducts));
            console.log(`Se eliminó el producto con id ${id}`)

        } catch (error) {
            throw new Error();
        }
    }

    async deleteAll() {
        try {
            await write(this.archive, '');
        } catch (error) {
            throw new Error();
        }
    }
}


const read = async (file) => {
    try {

        const data = await fs.promises.readFile(file, 'utf-8')
        return JSON.parse(data);

    } catch (err) {
        throw new Error();
    }
}

const write = async (file, data) => {
    try {

        await fs.promises.writeFile(file, data)

    } catch (err) {
        throw new Error();
    }
}

const stock = new Contenedor('productos.txt');

const ejecutarTodo = async () => {

    await stock.save({
            title: 'Laptop',
            price: '2000',
            thumbnail: 'img',
    })

    await stock.getById(4)

    await stock.getAll()

    await stock.deleteById(4)

    await stock.deleteAll()

}

ejecutarTodo();