const mongoose = require("mongoose")


const userschema = mongoose.Schema({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    catchPhrase: { type: String, required: true }
})

module.exports = mongoose.model("pro-celebrities", userschema)
