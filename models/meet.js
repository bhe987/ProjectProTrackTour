const mongoose = require("mongoose");

const meetSchema = new mongoose.Schema({
    name: String,
    date: String,
    location: String,
    host: String
});

module.exports = mongoose.model("Meet", meetSchema);