const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Company = require('../models/Company');
const Drive = require('../models/Drive');

// Get analytics data
router.get('/', async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const placedStudents = await Student.countDocuments({ placementStatus: 'Placed' });
        const totalCompanies = await Company.countDocuments();
        const activeDrives = await Drive.countDocuments({ status: 'Active' });

        // Branch-wise stats
        const branchStats = await Student.aggregate([
            { $group: { _id: "$branch", count: { $sum: 1 }, placed: { $sum: { $cond: [{ $eq: ["$placementStatus", "Placed"] }, 1, 0] } } } }
        ]);

        res.json({
            totalStudents,
            placedStudents,
            unplacedStudents: totalStudents - placedStudents,
            totalCompanies,
            activeDrives,
            branchStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
