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

    getById(id) {
        console.log(this.mem.find((p) => p.id === id));
    }

    getAll() {
        return this.mem
    }

    deleteById(id) {
        const newProducts = this.mem.filter((p) => p.id !== id);
        this.mem = {...newProducts}
        console.log(`Se eliminó el producto con id ${id}`);
    }

    deleteAll() {
        this.mem = []
    }
}

module.exports = memProductsDao;