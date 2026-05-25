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

// Create a new company
router.post('/', async (req, res) => {
    try {
        const { companyName, industry, website, description } = req.body;
        
        const User = require('../models/User');
        let user = await User.findOne({ role: 'company' });
        if (!user) user = await User.findOne();
        
        const company = new Company({
            companyName,
            industry,
            website,
            description,
            userId: user ? user._id : null
        });
        
        await company.save();
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
