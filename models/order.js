const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    orderItems: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    },
    shippingAddress: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    zip: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        default: "pending"
    },
    totalPrice: {
        type: Number,
        default: ""
    },
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
