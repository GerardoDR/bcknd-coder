const template = Handlebars.compile(
    `<h1>{{titulo}}</h1>
    <ul>
        <li>{{nombre}}</li>
        <li>{{apellido}}</li>
        <li>{{edad}}</li>
        <li>{{email}}</li>
        <li>{{telefono}}</li>
    </ul>
`); // compila la plantilla

const html = template({
    titulo: 'Datos personales',
    nombre: 'Gerardo',
    apellido: 'Rodriguez',
    edad: 30,
    email: 'adsasd',
    telefono: '11111111'
}); // genera el html

document.querySelector('div').innerHTML = html; // inyecta el resultado en la vista