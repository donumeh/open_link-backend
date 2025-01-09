// express and api router for open_link
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');


router.get(`/`, async (req, res) => {
    const users = await User.find().select("-passwordHash");

    if (!users) {
        res.status(500).json({ success: false })
    }

    res.json({ success: "ok", statusCode: 200, users })
});

router.get('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id).select("-passwordHash");
        if (!user) {
            res.status(500).json({ success: false, message: "The user was not found" })
        }
        res.status(200).json({ success: true, user });
    } catch (err) {
        return res.status(500).json({ success: false, message: "The user was not found" })
    }
});


router.put('/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const updateData = { ...req.body };

        const allowedFields = ["name", "email"];
        Object.keys(updateData).forEach((field) => {
            if (!allowedFields.includes(field)) {
                delete updateData[field];
            }
        });

        const user = await User.findOneAndUpdate({ _id: userId }, updateData, { new: true });

        if (!user) {
            res.status(404).json({ success: false, message: "user not found" })
        }
        else {
            res.json({ success: true, user })
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: "The user was not found" })
    }
});


router.post('/register', async (req, res) => {

    try {

        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ success: false, message: "name, email, or password cannot be empty" })
        }

        const userExist = await User.find({ email: req.body.email });

        if (userExist.length !== 0) {
            return res.status(409).json({ success: false, message: "user already exist" })
        }

        let user = new User({
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            ...req.body,
            email: req.body.email.toLowerCase()
        });

        user = await user.save();

        if (!user) {
            return res.status(404).send("user couldn't be created")
        }
        return res.send({ success: "ok", status: 201, user: { email: user.email, name: user.name, phone: user.phone } })
    } catch (error) {
        return res.status(500).json({ success: false, message: "error while trying to register user" })
    }
})


router.post(`/`, async (req, res) => {

    try {

        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ success: false, message: "name, email, or password cannot be empty" })
        }

        const userExist = await User.find({ email: req.body.email.toLowerCase() });

        if (userExist.length !== 0) {
            return res.status(409).json({ success: false, message: "user already exist" })
        }
        let user = new User({
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            ...req.body
        });

        user = await user.save();

        if (!user) {
            return res.status(404).send("user couldn't be created")
        }
        res.send({ success: "ok", status: 201, user: [user.email, user.name, user.phone] })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
});


router.post('/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        const secret = process.env.SECRET

        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" })
        }

        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                { userId: user.id },
                secret,
                { expiresIn: '1d' }
            )
            return res.status(200).json({ success: true, user, token }) // token
        }

        return res.status(400).json({ success: false, message: "password incorrect" });
    } catch (err) {
        res.status(500).json({ success: failed, error: err.message })
    }

})



router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
        res.status(500).json({ success: false, message: "user cannot be counted" })
    }

    res.json({ success: "ok", statusCode: 200, userCount })
})

router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ success: false, message: "Invalid user id" });
    }
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        return res.status(404).json({ success: false, message: "user not found" });
    }
    return res.status(200).json({ success: true, messag: "user has been deleted" })
})

module.exports = router;