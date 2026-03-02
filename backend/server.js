const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const coordinatorRoutes = require('./routes/coordinatorRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/coordinators', coordinatorRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, 'public')));

// ⚡ Correct catch-all route for React
app.get('/:path(*)', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
