const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    orderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    },
    shippingAddress1: String,
    shippingAddress2: String,
    city: String,
    zip: String,
    country: String,
    phone: String,
    status: String,
    totalPrice: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    }
})

exports.Order = mongoose.model('Order', orderSchema);
