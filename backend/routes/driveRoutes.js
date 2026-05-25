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
        const { companyName, jobRole, packageLPA, driveDate, eligibilityLink, applyLink } = req.body;
        
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
            lastDate: driveDate,
            eligibilityLink,
            applyLink
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

// Update drive by ID
router.put('/:id', async (req, res) => {
    try {
        const { jobRole, packageLPA, lastDate, status, eligibilityLink, applyLink } = req.body;
        const drive = await Drive.findById(req.params.id);
        
        if (!drive) {
            return res.status(404).json({ message: 'Drive not found' });
        }
        
        if (jobRole !== undefined) drive.jobRole = jobRole;
        if (packageLPA !== undefined) drive.packageLPA = packageLPA;
        if (lastDate !== undefined) drive.lastDate = lastDate;
        if (status !== undefined) drive.status = status;
        if (eligibilityLink !== undefined) drive.eligibilityLink = eligibilityLink;
        if (applyLink !== undefined) drive.applyLink = applyLink;
        
        await drive.save();
        res.json(drive);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete drive by ID
router.delete('/:id', async (req, res) => {
    try {
        const drive = await Drive.findByIdAndDelete(req.params.id);
        if (!drive) {
            return res.status(404).json({ message: 'Drive not found' });
        }
        res.json({ message: 'Drive deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
