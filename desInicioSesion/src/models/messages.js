const mongoose = require('mongoose');

const messagesCollection = "messages";

const MessagesSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    email: {type: String, required: true},
    message: {type: String, default: "empty message", required: true},
    date: {type: Date, default: Date.now, required: true},
});

const messages = mongoose.model(messagesCollection, MessagesSchema);
module.exports = messages;