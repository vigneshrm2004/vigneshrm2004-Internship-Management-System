const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Internship = require('../models/Internship');

// Add Internship
router.post('/internship', async (req, res) => {
    const { studentId, companyName, position } = req.body;
    try {
        const internship = new Internship({ student: studentId, companyName, position });
        await internship.save();
        await Student.findByIdAndUpdate(studentId, { $push: { internships: internship._id } });
        res.json({ message: 'Internship added', internship });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
