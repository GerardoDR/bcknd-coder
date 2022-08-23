class memProductsDao {
    static mem;
    constructor() {
        if (memProductsDao.mem) return new memProductsDao.mem;
        this.mem = [];
    }

    save(obj) {
        const getAvailableId = (prods) => {
            const ids = prods.map((p) => p.id);
            let avail = 0;
            ids.length > 0 && (avail = Math.max(...ids) + 1);
            return avail;
        };
        obj.id = getAvailableId(this.mem);
        obj.thumbnail = 'http://fakeimg.pl/160x160?text=lorem&font=lobster'
        this.mem.push(obj);
    }

    update(id, values) {
        try {
            const products = this.getAll()
            let found = products.find((p) => p.id === id);
            if (found) {
                let updatedFlag = 0
                for (val in values) {
                    if (Object.hasOwn(found, val)) {
                        found[val] = values[val];
                        updatedFlag++
                    }
                }
                if (updatedFlag > 0) {
                    console.log('product updated');
                    console.log(found)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    getById(id) {
        console.log((this.mem).find((p) => p.id === id));
    }

    getAll() {
        return this.mem
    }

    delete(id) {
        if (!this.mem.length < 0) {
            console.log('no product');
            return false
        }
        const filtered = this.mem.filter((p) => p.id !== id);
        if (filtered) {
            this.mem = filtered
            console.log(`Se eliminó el producto con id ${id}`);
        } else {
            console.log('error al eliminar producto');
        }
    }

    deleteAll() {
        this.mem = []
    }
}

module.exports = memProductsDao;