const Student = require('../models/Student');
const Coordinator = require('../models/Coordinator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Student Signup
exports.studentSignup = async (req, res) => {
    const { name, email, password, batch, role } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'student') {
            const student = new Student({ name, email, password: hashedPassword, batch });
            await student.save();
            res.status(201).json({ message: 'Student registered successfully' });
        } else if (role === 'coordinator') {
            const coordinator = new Coordinator({ name, email, password: hashedPassword });
            await coordinator.save();
            res.status(201).json({ message: 'Coordinator registered successfully' });
        } else {
            return res.status(400).json({ error: 'Invalid role specified' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Student Login
exports.studentLogin = async (req, res) => {
       const { email, password, role } = req.body;

    try {
        let user;
        if (role === 'student') user = await Student.findOne({ email });
        else if (role === 'coordinator') user = await Coordinator.findOne({ email });
        else return res.status(400).json({ error: 'Invalid role' });

        if (!user) return res.status(404).json({ error: `${role} not found` });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role }, 'secretKey', { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Coordinator Signup/Login (similar logic)
