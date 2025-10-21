import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CoordinatorDashboard() {
    const [internships, setInternships] = useState([]);

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/coordinators/internships'); // coordinator route
                setInternships(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchInternships();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/coordinators/internships/${id}`, { status });
            setInternships(
                internships.map((i) => (i._id === id ? { ...i, status } : i))
            );
        } catch (err) {
            console.error(err);
        }
    };

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
                        padding: 25px;
                        border-radius: 15px;
                        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                        margin-bottom: 20px;
                        animation: fadeInUp 0.8s ease forwards;
                        transition: transform 0.3s, box-shadow 0.3s;
                    }
                    .dashboard-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 12px 25px rgba(0,0,0,0.2);
                    }
                    .status-btn {
                        margin-left: 10px;
                        padding: 8px 15px;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        color: white;
                        font-weight: bold;
                        transition: transform 0.2s, background 0.3s;
                    }
                    .status-btn:hover {
                        transform: scale(1.05);
                    }
                    .approve-btn {
                        background: #28a745;
                    }
                    .approve-btn:hover {
                        background: #218838;
                    }
                    .reject-btn {
                        background: #dc3545;
                    }
                    .reject-btn:hover {
                        background: #c82333;
                    }
                `}
            </style>

            <h2
                style={{
                    color: '#fff',
                    textAlign: 'center',
                    marginBottom: '30px',
                    fontSize: '2em',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                    animation: 'fadeInUp 1s ease forwards',
                }}
            >
                Coordinator Dashboard
            </h2>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {internships.map((i, index) => (
                    <li
                        key={i._id}
                        className="dashboard-card"
                        style={{ animationDelay: `${0.1 * index}s` }}
                    >
                        {i.companyName} - {i.position} - {i.status}
                        <button
                            onClick={() => updateStatus(i._id, 'Approved')}
                            className="status-btn approve-btn"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => updateStatus(i._id, 'Rejected')}
                            className="status-btn reject-btn"
                        >
                            Reject
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CoordinatorDashboard;
