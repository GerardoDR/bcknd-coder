const mongoose = require('mongoose');

const usersCollection = "users";

const UsersSchema = new mongoose.Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
})

const users = mongoose.model(usersCollection, UsersSchema);
module.exports = users;