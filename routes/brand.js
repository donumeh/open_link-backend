// express and api router for open_link
const { Brand } = require('../models/brand');
const express = require('express');
const router = express.Router();


router.get(`/`, async (req, res) => {
    const brands = await Brand.find();

    if (!brands) {
        res.status(500).json({ success: false })
    }

    res.json({ success: "ok", statusCode: 200, brands })
})

router.get('/:id', async (req, res) => {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
        res.status(500).json({ success: false, message: "The brand was not found" })
    }
    res.status(200).send(brand);
});

router.post(`/`, async (req, res) => {
    let brand = new Brand({
        name: req.body.name,
        image: req.body.image
    });

    brand = await brand.save();

    if (!brand) {
        return res.status(404).send("brand couldn't be created")
    }
    res.send({ success: "ok", status: 201, brand })
});

router.put('/:id', async (req, res) => {
    const brand = await Brand.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
    )

    if (!brand) {
        return res.status(404).send("brand couldn't be updated")
    }
    res.send({ success: "ok", status: 201, brand })

})

router.delete('/:id', (req, res) => {
    // Having issues deleting from Mongo Atlas
    Brand.findByIdAndDelete(req.params.id)
        .then(brand => {
            if (brand) {
                return res.status(200).json({ success: true, message: "brand has been deleted" })
            } else {
                return res.status(404).json({ success: false, message: "brand not found" });
            }
        })
        .catch(err => {
            return res.status(400).json({ success: false, error: err });
        });
});

module.exports = router;
