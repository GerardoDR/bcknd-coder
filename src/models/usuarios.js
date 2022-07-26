const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/db1"

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }, () => console.log('Connected'))

const usuariosCollection = 'usuarios';

const UsuarioSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
})
const users = mongoose.model(usuariosCollection, UsuarioSchema)
module.exports = users;