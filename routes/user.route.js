const express = require('express');
const router = express.Router();
const User=require("../models/user")
// créer un nouvel utilisateur
router.post('/register', async (req, res) => {
    try {
    let { email, password, firstname, lastname } = req.body
    const user = await User.findOne({ email })
    if (user) return res.status(404).send({ success: false, message:
    "User already exists" })

    const newUser = new User({ email, password, firstname, lastname })
    const createdUser = await newUser.save()
    return res.status(201).send({ success: true, message: "Account created successfully", user: createdUser })
    } catch (err) {
    console.log(err)
    res.status(404).send({ success: false, message: err })
    }
    });

    router.get('/', async (req, res, )=> {
        try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
        });
    module.exports = router;