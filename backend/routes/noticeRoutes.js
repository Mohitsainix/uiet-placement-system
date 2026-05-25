const express = require('express');
const router = express.Router();
const Notice = require('../models/Notice');

// Get all notices
router.get('/', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ isPinned: -1, createdAt: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new notice
router.post('/', async (req, res) => {
    try {
        const { title, content, category, isPinned, expiryDate } = req.body;
        const newNotice = new Notice({
            title,
            content,
            category: category || 'Important Announcement',
            isPinned: isPinned || false,
            expiryDate
        });
        await newNotice.save();
        res.status(201).json(newNotice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
