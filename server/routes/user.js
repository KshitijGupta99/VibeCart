const express = require('express')
const User = require('../models/userSchema')
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) return res.status(401).json("Invalid creds");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json("Invalid creds");
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (err) {
        console.log(err)
        res.status(500).json("SERVER ERROR")
    }
})

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    try {

        let user = await User.findOne({ username })
        if (user) return res.status(403).json("User with this username Already Exsist");
        user = await User.findOne({ email })
        if (user) return res.status(401).json("User with this email Already Exsist");


        const salt = await bcrypt.genSaltSync(10);
        const hashkey = await bcrypt.hashSync(req.body.password, salt);

        user = await User.create({
            username: username,
            email: email,
            password: hashkey
        })

        const data = {
            user: {
                id: user.id
            }
        }


        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken });

    } catch (err) {
        console.log(err)
        res.status(500).json("SERVER ERROR")
    }
})




module.exports = router;