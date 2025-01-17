// express and api router for open_link
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../services/emailService');


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
        const updateData = { ...JSON.parse(req.body) };
        const constantValues = ["password", "passwordHash", "name", "token", "email"]

        for (const value of constantValues) {
            if (Object.keys(updateData).includes(value)) {
                delete updateData[value]
            }
        }

        console.log(updateData);
        const user = await User
            .findOneAndUpdate({ _id: req.params.id }, { $set: { ...updateData } }, { new: true })
            .select("-passwordHash");

        console.log(user)
        if (!user) {
            res.status(404).json({ success: false, message: "user not found" })
        }
        else {
            res.status(201).json({ success: true, user })
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: "An error occurred" })
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

        // sending a welcome email
        try {
            sendWelcomeEmail(user.email, user.name);
            res.status(201).json({ success: true, message: "Signup Successful. Welcome email sent" });
        } catch (emailError) {
            console.error("Error sending welcome email:", emailError);
            res.status(500).json({ success: false, message: "User created, but failed to send email" });
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
        const user = await User.findOne({ email: req.body.email });
        const secret = process.env.SECRET

        console.log(user)

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                { userId: user.id },
                secret,
                { expiresIn: '5d' }
            )
            return res.status(200).json({ success: true, user, token })
        }

        return res.status(400).json({ success: false, message: "Incorrect password" });
    } catch (err) {
        res.status(500).json({ success: false, error: "An error ocurred. " })
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