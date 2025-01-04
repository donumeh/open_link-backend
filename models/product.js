const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        require: false,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    // TODO: Implementation later
    // rating: Number,
    // isFeatured: Boolean,
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

productSchema.set('toJSON', {
    virtuals: true
})

exports.Product = mongoose.model('Product', productSchema);
