const express = require('express');
const router = express.Router();
const { studentSignup, studentLogin } = require('../controllers/authController');

router.post('/student/signup', studentSignup);
router.post('/student/login', studentLogin);

module.exports = router;
