const fs = require("fs");
const csv = require("csv-parser");
const firstline = require("firstline");
const mongoose = require("mongoose");
const Entry = require("./models/entry");
const Athlete = require("./models/athlete");
const Meet = require("./models/meet");

const createConnection = async function(){
    await mongoose.connect("mongodb://localhost:27017/trackAmerica", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
}

createConnection();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Database connected");
});

const readEntries = async function(){
    const filename = process.argv[2];
    console.log(filename);
    const meetname = (await firstline(filename)).trim();
    //firstline() adds a "\r" to the end of the String that needs to be trimmed.
    const meet = await Meet.findOne({name: String(meetname)});
    console.log("meet name from db:", meet);
    
    let entry;
    let data = [];
    let newRow = [];
    
    const processRow = async (row) => {
        newRow = [row.athleteName, row.event, row.finalTime, row.finalPlace];
        data.push(newRow);
        const athlete = await Athlete.findOne({name: row.athleteName});
        console.log(athlete.name);
        entry = new Entry({
            athlete: athlete._id,
            meet: meet._id,
            event: row.event,
            finalTime: row.finalTime,
            finalPlace: row.finalPlace
        });
        await entry.save();
    }

    /* creates a readable stream from file that pipes its output into csv */
    const stream = fs.createReadStream(filename).pipe(csv({skipLines: 1}));
    /* iterate through stream data, just like .on("data"), but now is waiting */
    for await (const row of stream) {
        await processRow(row);
    }

    console.log("resulting data: ", data);

}

const app = async () => {
    // encapsulates the app into a async func to avoid using .then/.catch
    await readEntries();
    mongoose.connection.close();
}
app();