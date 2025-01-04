// express and api router for open_link
const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')


router.get(`/`, async (req, res) => {
    let filter = {}
    if (req.query.brand) {
        filter = { brand: req.query.brand.split(",") }
    }
    const products = await Product.find(filter).populate('brand');

    if (!products) {
        res.status(500).json({ success: false })
    }

    res.json({ success: "ok", statusCode: 200, products })
})

router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id).populate('brand');

    if (!product) {
        res.status(500).json({ success: false, message: "product cannot be found" })
    }

    res.json({ success: "ok", statusCode: 200, product })
})

router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ success: false, message: "Invalid product id" });
    }
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
    )

    if (!product) {
        return res.status(404).send("product couldn't be updated")
    }
    res.send({ success: "ok", status: 201, product })

})

router.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(404).json({ success: false, message: "Invalid product id" });
    }
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return res.status(404).json({ success: false, message: "product not found" });
    }
    return res.status(200).json({ success: true, messag: "product has been deleted" })
})

router.post(`/`, async (req, res) => {
    const brand = await Brand.findById(req.body.brand);
    if (!brand) {
        return res.status(400).json({ success: false, message: "Invalid Brand" })
    }
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        longDescription: req.body.longDescription,
        image: req.body.image,
        images: req.body.images,
        price: req.body.price,
        brand: req.body.brand,
        stock: req.body.stock,
        dateCreated: req.body.dateCreated
    })
    product = await product.save();

    if (!product) {
        return res.status(500).json({ success: false, message: "product cannot be created" })
    }
    return res.status(201).json({ success: "ok", status: 200, product })
})

router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments();

    if (!productCount) {
        res.status(500).json({ success: false, message: "product cannot be counted" })
    }

    res.json({ success: "ok", statusCode: 200, productCount })
})


module.exports = router;