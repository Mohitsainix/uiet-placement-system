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

// Create a new drive
router.post('/', async (req, res) => {
    try {
        const { companyName, jobRole, packageLPA, driveDate } = req.body;
        
        const User = require('../models/User');
        const Company = require('../models/Company');

        let company = await Company.findOne({ companyName: new RegExp(`^${companyName}$`, 'i') });
        if (!company) {
            let user = await User.findOne({ role: 'company' });
            if (!user) user = await User.findOne();
            if (!user) throw new Error("No users found to associate with company");
            
            company = await Company.create({
                companyName,
                userId: user._id
            });
        }
        
        const newDrive = new Drive({
            companyId: company._id,
            jobRole,
            packageLPA,
            lastDate: driveDate
        });
        
        await newDrive.save();
        res.status(201).json(newDrive);
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
