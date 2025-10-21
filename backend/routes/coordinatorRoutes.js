const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');

// Get all internships for coordinator
router.get('/internships', async (req, res) => {
    try {
        const internships = await Internship.find().populate('student', 'name email batch');
        res.json(internships);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update internship status
router.put('/internships/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const internship = await Internship.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(internship);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
