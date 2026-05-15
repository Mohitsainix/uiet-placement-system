const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('userId', 'email').populate('selectedCompany', 'companyName');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
