const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    batch: String,
    internships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Internship' }]
});

module.exports = mongoose.model('Student', studentSchema);
