import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import StudentDashboard from './components/StudentDashboard';
import CoordinatorDashboard from './components/CoordinatorDashboard';
import InternshipForm from './components/InternshipForm';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
            <Route path="/add-internship" element={<InternshipForm />} />
        </Routes>
    );
}

export default App;
