// express and api router for open_link
const { Order } = require('../models/order');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const order = await Order.find();

    if (!order) {
        res.status(500).json({ success: false })
    }

    res.json({ success: "ok", statusCode: 200, order })
})

router.post(`/`, (req, res) => {
    res.send()
})

module.exports = router;