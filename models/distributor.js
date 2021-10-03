const mongoose = require('mongoose');

const distributionSchema = mongoose.Schema({
    distribution_type: String,
    phone_number: String,
    reference_media: [String],
    zip_code: String,
    need_covid_vaccine: Boolean,
    covid_vaccine_brand: String,
    covid_vaccinated: Boolean,
    need_additional_support: Boolean,
    number_of_children: Number,
    any_one_above_65: Boolean,
    is_veteran: Boolean,
    what_describes_you: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'AuthUser'
    }
})

const Distributor = module.exports = mongoose.model('Distributor', distributionSchema);