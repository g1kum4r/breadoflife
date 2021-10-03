const mongoose = require('mongoose');

const authUserSchema = mongoose.Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: {
        type: String,
        index: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER'
    },
    distributions: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Distributor'
    }]
})

const AuthUser = module.exports = mongoose.model('AuthUser', authUserSchema);
