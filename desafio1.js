class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas
    }
    getFullName() {
        console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota) {
        this.mascotas.push(mascota)
        console.log(`Agregada mascotade ${this.nombre}: ${mascota}`)
    }

    countMascotas() {
        let count = 0
        this.mascotas.forEach(() => count++)
        console.log(`Total mascotas de ${this.nombre}: ${count}`)
    }

    addBook(nombre, autor) {

        this.libros.push({
            nombre,
            autor
        })
        console.log(`Agregado libro de ${this.nombre}: ${nombre}`)
    }

    getBookNames() {
        const bookNames = this.libros.map((e) =>{
            return e.nombre
        })

        console.log('Nombre de los libros:')
        console.log(bookNames)
    }
}

const usuario1 = new Usuario('Dave', 'Grohl', [{
    nombre: 'If I Ran the Rainforest',
    autor: 'Bonnie Worth'
}, {
    nombre: 'Don Quijote',
    autor: 'Miguel de Cervantes'
}], ['Gato']);

console.log('----------')
usuario1.getFullName()
console.log('----------')
usuario1.addMascota('Perro')
console.log('----------')
usuario1.countMascotas()
console.log('----------')
usuario1.addBook('Moby Dick', 'Herman Melville')
console.log('----------')
usuario1.getBookNames()
console.log('----------')