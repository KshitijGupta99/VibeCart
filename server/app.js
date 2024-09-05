const express = require('express')
var cors = require('cors')
const app = express()
const connectToMongo = require('./db');
const port = 4000;
connectToMongo();
app.use(cors())

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello There!')
})

app.use('/auth', require('./routes/user'))
app.use('/cart', require('./routes/cart'))
app.use('/product', require('./routes/product'))
app.listen(port,()=>{
    console.log("server started ");
});