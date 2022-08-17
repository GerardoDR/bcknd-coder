const { model, Schema } = require('mongoose');
const usuariosCollection = 'users';
const UsuarioSchema = new Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
})
const users = model(usuariosCollection, UsuarioSchema)
module.exports = users;