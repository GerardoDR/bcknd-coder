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
        this.mem.push(obj);
    }

    update(id, values) {
        try {
            const products = this.getAll()
            let found = products.find((p) => p.id === Number(id));
            if (found) {
                let updated = 0
                Object.keys(values).forEach((key) => {
                    if (found[key]) {
                        found[key] = values[key]
                        updated++
                    };
                });
                if (updated > 0) {
                    return true;
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
        const ids = this.mem.map((p) => p.id);
        console.log(ids);
        return this.mem;
    }

    delete(id) {
        if (!this.mem.length < 0) {
            console.log('no product');
            return false
        }
        const filtered = this.mem.filter((p) => p.id !== Number(id));
        if (filtered.length < this.mem.length) {
            this.mem = filtered
            console.log(`Se eliminó el producto con id ${id}`);
            return true
        } else {
            console.log('error al eliminar producto');
        }
    }

    deleteAll() {
        this.mem = []
    }
}

module.exports = memProductsDao;