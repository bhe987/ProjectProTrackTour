const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/athletes", function(req, res){
    res.render("athletes.ejs");
});

app.listen(3000, function(){
    console.log("Server started and listening on port 3000.");
});