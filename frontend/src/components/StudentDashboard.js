import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function StudentDashboard() {
    const [internships, setInternships] = useState([]);
    const studentId = localStorage.getItem('studentId'); // store studentId after login

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/students/${studentId}/internships`);
                setInternships(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchInternships();
    }, [studentId]);

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: '40px',
                background: 'linear-gradient(135deg, #ff9966, #cc33ff, #3399ff)',
                backgroundSize: '400% 400%',
                animation: 'gradientMove 10s ease infinite',
                fontFamily: 'Poppins, sans-serif',
            }}
        >
            <style>
                {`
                    @keyframes gradientMove {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .dashboard-card {
                        background-color: white;
                        padding: 20px;
                        border-radius: 12px;
                        box-shadow: 0 6px 18px rgba(0,0,0,0.15);
                        margin-bottom: 15px;
                        animation: fadeInUp 0.8s ease forwards;
                        transition: transform 0.3s, box-shadow 0.3s;
                    }
                    .dashboard-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                    }
                    .add-link {
                        display: inline-block;
                        margin-bottom: 20px;
                        padding: 10px 20px;
                        background: linear-gradient(90deg, #3399ff, #00c6ff);
                        color: white;
                        font-weight: bold;
                        border-radius: 8px;
                        text-decoration: none;
                        transition: all 0.3s ease;
                    }
                    .add-link:hover {
                        transform: scale(1.05);
                        background: linear-gradient(90deg, #2575fc, #0056b3);
                    }
                `}
            </style>

            <h2
                style={{
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '25px',
                    fontSize: '2em',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                    animation: 'fadeInUp 1s ease forwards',
                }}
            >
                Student Dashboard
            </h2>

            <Link to="/add-internship" className="add-link">
                Add Internship
            </Link>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {internships.map((i, index) => (
                    <li
                        key={i._id}
                        className="dashboard-card"
                        style={{ animationDelay: `${0.1 * index}s` }}
                    >
                        {i.companyName} - {i.position} - {i.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentDashboard;
