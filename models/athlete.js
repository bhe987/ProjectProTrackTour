const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
    name: String,
    dob: String,
    affiliation: String,
    gender: String,
    image: String
});

module.exports = mongoose.model("Athlete", athleteSchema);