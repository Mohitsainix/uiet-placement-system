const mongoose = require('mongoose');

const driveSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    jobRole: { type: String, required: true },
    packageLPA: { type: Number, required: true },
    eligibilityCriteria: { type: String },
    branchEligibility: [{ type: String }],
    cgpaCriteria: { type: Number, default: 0 },
    jobDescription: { type: String },
    lastDate: { type: Date },
    interviewDate: { type: Date },
    numberOfOpenings: { type: Number },
    requiredSkills: [{ type: String }],
    eligibilityLink: { type: String },
    applyLink: { type: String },
    status: { type: String, enum: ['Active', 'Upcoming', 'Completed'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Drive', driveSchema);
