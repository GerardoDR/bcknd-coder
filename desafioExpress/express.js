const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log('Aplicación express escuchando en el puerto ' + server.address().port);
});

class Contenedor {
    constructor(archive) {
        this.archive = archive;
    }

    async save(obj) {

        const getAvailableId = (prods) => {
            const ids = getIds(prods);
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
            const found = products.find((p) => p.id === id)
            return found

        } catch (error) {
            throw new Error();
        }
    }

    async getAll() {
        try {

            const products = await read(this.archive);
            return products

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

const getIds = (arr) => arr.map((el) => el.id);

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

server.on('Error', error => { console.log(error); });

app.get("/", (req,res)=>{
    res.send(
        `<ul>
            <li>Para ver todos los productos acceda a <a href="/productos">este vínculo</a></li>
            <li>Para ver un producto aleatorio acceda a <a href="/productoRandom">este vínculo</a></li>
        </ul>`)
})

app.get("/productos", async (req,res)=>{
    res.send(
        `
            <p>${JSON.stringify(
                await stock.getAll()
            )}
            </p>
            <a href="/">Volver</a>
        `        
    )
})

const randomProduct = (products) => {
    const ids = getIds(products)
    const index = Math.floor(Math.random() * ids.length)
    return ids[index]
}

app.get("/productoRandom", async (req,res)=>{
    res.send(
        `
            <h2>producto aleatorio:</h2>
            <li>${JSON.stringify(
                await stock.getById(
                    randomProduct(await stock.getAll())
                )
            )}
            </li>
            <a href="/">Volver</a>
        `	
    )
})