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

module.exports = router;
