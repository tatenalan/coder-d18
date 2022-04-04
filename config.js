const mongoose = require('mongoose');


const mongoConnect = () => {
    // Mongo Atlas
    const URL = process.env.DB_URL
    mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true },err => {
        if(err) console.log(`Error connecting Mongo Atlas ${err}`)
        console.log(`Mongo Atlas connected`)
    })
}


module.exports = { mongoConnect }