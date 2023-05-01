const express = require('express')
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
let astrologyLog = require('./log.json')
const { Configuration, OpenAIApi } = require('openai')



const config = new Configuration({
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(config);

const HoroscopeSchema = mongoose.Schema({
    "sign": String,
    "content": String,
    "date": Date,

});
const HoroscopeModel = mongoose.model('Horoscopes', HoroscopeSchema);



const app = express();
const PORT = 4000;

app.use(express.static(path.resolve() + "/dist"))
app.use(cors())
app.use(bodyParser.json())




const generateHoroscopes = async () => {

    let startTime = performance.now();

    console.log("Generating Horoscopes");
    let response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content":"Write 12 brief cryptic fortunes, but only inside an array. Example array ['fortune1','fortune2']" }],
        temperature: 1,


    });


    let endTime = performance.now();
    let etc = endTime - startTime;

    let fortune = response.data.choices[0].message.content;
    console.log("AI Output:", fortune);
    console.log("Took " + etc + " ms to complete");

    return fortune;

}

const checkLog = async (sign) => {
    console.log(astrologyLog);

    //Current date minus hrs and minutes
    let currentDate = new Date(new Date().toDateString());



    //If a day has passed since the last log update.
    if (currentDate > new Date( astrologyLog.lastUpdated)) {
        console.log("new day horoscope request");
        astrologyLog.horoscopes = await generateHoroscopes();
        
        
        astrologyLog.lastUpdated = currentDate;
        astrologyLog.timesUpdated += 1;
        fs.writeFileSync("./server/log.json", JSON.stringify(astrologyLog));

        return astrologyLog.horoscopes;
    }
    else {
        console.log("Same day horoscope request");
        return astrologyLog.horoscopes
    }
}






//Asks if the horoscopes are up to date, if not call a function to generate some.

//Check if a day has passed  => if so wipe slate, then add the new sign to the log.
app.get("/api/horoscopes/", async (req, res) => {
    // let sign = req.params.sign;


    res.json(await checkLog());



})
app.get("/", (req, res) => {

    // console.log(path.resolve());
    res.sendFile(path.resolve() + '/dist/index.html')
})

app.listen(PORT, () => { console.log("Server started on port:", PORT) })
