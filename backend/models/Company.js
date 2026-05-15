const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String, required: true },
    industry: { type: String },
    website: { type: String },
    description: { type: String },
    logoUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
