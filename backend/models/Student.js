const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    rollNumber: { type: String, required: true, unique: true },
    branch: { type: String, required: true },
    year: { type: Number, required: true },
    cgpa: { type: Number, required: true },
    skills: [{ type: String }],
    phone: { type: String },
    resumeUrl: { type: String },
    resumeStatus: { type: String, enum: ['Uploaded', 'Not Uploaded'], default: 'Not Uploaded' },
    placementStatus: { type: String, enum: ['Placed', 'Unplaced'], default: 'Unplaced' },
    backlogs: { type: Number, default: 0 },
    profilePhoto: { type: String },
    selectedCompany: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
