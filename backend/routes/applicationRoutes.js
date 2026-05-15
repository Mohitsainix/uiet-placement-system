const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// Get all applications
router.get('/', async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('studentId', 'fullName branch cgpa')
            .populate({
                path: 'driveId',
                select: 'jobRole packageLPA',
                populate: { path: 'companyId', select: 'companyName' }
            });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new application (Apply to drive)
router.post('/', async (req, res) => {
    try {
        const { studentId, driveId } = req.body;
        // Basic check to see if already applied
        const existing = await Application.findOne({ studentId, driveId });
        if(existing) return res.status(400).json({ message: 'Already applied' });

        const application = await Application.create({ studentId, driveId, status: 'Applied' });
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update application status
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
