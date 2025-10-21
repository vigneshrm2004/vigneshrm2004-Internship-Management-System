const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    companyName: String,
    position: String,
    status: { type: String, default: 'Pending' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    uploadedDocuments: [String]
});

module.exports = mongoose.model('Internship', internshipSchema);
