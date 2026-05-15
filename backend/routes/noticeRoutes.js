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

module.exports = router;
