const mongoose = require("mongoose");
const Athlete = require("./athlete");
const Meet = require("./meet");

const entrySchema = new mongoose.Schema({
    athlete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Athlete"
    },
    meet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Meet"
    },
    event: String,
    seedTime: String,
    finalTime: String,
    finalPlace: String,
    points: Number
});

module.exports = mongoose.model("Entry", entrySchema);