const express = require('express');
const router = express.Router();
const Drive = require('../models/Drive');

// Get all drives
router.get('/', async (req, res) => {
    try {
        const drives = await Drive.find().populate('companyId', 'companyName logoUrl');
        res.json(drives);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get drive by ID
router.get('/:id', async (req, res) => {
    try {
        const drive = await Drive.findById(req.params.id).populate('companyId', 'companyName logoUrl');
        res.json(drive);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
