const mongoose = require('mongoose');

const DistributorSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }
})

const Distributor = module.exports = mongoose.model('Distributor', DistributorSchema);