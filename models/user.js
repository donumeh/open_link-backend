const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }, // passed in as password
    passwordHash: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    street: {
        type: String,
        default: ''
    },
    apartment: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    }
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

userSchema.set('toJSON', {
    virtuals: true
})

exports.User = mongoose.model('User', userSchema);
