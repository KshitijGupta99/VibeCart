require("dotenv").config()

const mongoose = require('mongoose');
const URI = process.env.MONGO_URI

const connectToMongo = ()=>{
    mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{console.log("connected to mongoose")}).catch((err)=>{
        console.log(err)
    })
};
module.exports = connectToMongo;