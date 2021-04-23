const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Athlete = require("./models/athlete");

mongoose.connect("mongodb://localhost:27017/trackAmerica", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/athletes", async function(req, res){
    const athletes = await Athlete.find({});
    res.render("athletes/index.ejs", {athletes});
});

app.listen(3000, function(){
    console.log("Server started and listening on port 3000.");
});