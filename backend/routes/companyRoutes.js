const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Get all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
