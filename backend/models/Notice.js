const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['Placement Drive', 'Exam Notice', 'Interview Schedule', 'Important Announcement', 'Holiday Notice', 'Result Notice'],
        required: true 
    },
    isPinned: { type: Boolean, default: false },
    expiryDate: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
