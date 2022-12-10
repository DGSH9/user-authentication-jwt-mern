const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model')
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect('mongodb+srv://dgsh:dgsh@codifi-training.73cayg3.mongodb.net/codedam')

//regitser
app.post('/api/register', async (req, res) => {
    // console.log(req.body);
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({ status: 'ok' });
    } catch (err) {
        console.log(err.message);
    }
})


//login
app.put('/api/login', async (req, res) => {
    // console.log(req.body);
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        const { name, email } = user;
        if (user) {
            const token = jwt.sign({
                name: user.name,
                email: user.email
            },
                'secret-key'
            );
            return res.json({ status: 'ok', user: token, profile: { name, email } })
        }
        else {
            return res.json({ status: 'error', user: false })
        }
    } catch (err) {
        console.log(err.message);
    }
})



//get quote
app.get('/api/quote', async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, 'secret-key')

        const { email } = decoded;
        const user = await User.findOne(
            { email: email }
        )
        return res.json({ status: 'ok', quote: user.quote })
    } catch (error) {
        console.log(error.message);
        res.json({ status: 'error', error: 'invalid token' })
    }
})

//create quote
app.post('/api/quote', async (req, res) => {
    const token = req.headers['x-access-token']
    // console.log(req.header);
    try {
        const decoded = jwt.verify(token, 'secret-key')
        const { email } = decoded;
        const user = await User.updateOne(
            { email: email },
            { $set: { quote: req.body.quote } }
        )
        return res.json({ status: 'ok' })


    } catch (error) {
        console.log(error.message);
        res.json({ status: 'error', error: 'invalid token' })
    }
})






app.listen(1337, () => { console.log('server is running on 1337'); })