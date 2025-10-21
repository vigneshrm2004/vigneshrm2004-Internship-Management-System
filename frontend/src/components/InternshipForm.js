import React, { useState } from 'react';
import { addInternship } from '../services/api';
import { useNavigate } from 'react-router-dom';

function InternshipForm() {
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); // get studentId from login

    const handleSubmit = async () => {
        try {
            await addInternship({ studentId, companyName: company, position });
            alert('Internship Added');
            navigate('/student-dashboard');
        } catch (err) {
            console.error(err.response?.data);
            alert('Error adding internship');
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                    .form-card {
                        background-color: white;
                        padding: 35px;
                        border-radius: 15px;
                        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                        width: 350px;
                        text-align: center;
                        animation: fadeInUp 1s ease forwards;
                    }
                    .form-card input {
                        width: 90%;
                        padding: 12px;
                        margin-bottom: 15px;
                        border-radius: 8px;
                        border: 1px solid #ccc;
                        outline: none;
                        transition: all 0.3s ease;
                    }
                    .form-card input:focus {
                        border-color: #cc33ff;
                        box-shadow: 0 0 8px rgba(204, 51, 255, 0.4);
                    }
                    .submit-btn {
                        width: 95%;
                        padding: 12px;
                        background: linear-gradient(90deg, #3399ff, #00c6ff);
                        color: white;
                        font-weight: bold;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                        transition: all 0.3s ease;
                        animation: fadeInUp 1.2s ease forwards;
                    }
                    .submit-btn:hover {
                        transform: scale(1.05);
                        background: linear-gradient(90deg, #2575fc, #0056b3);
                    }
                    h2 {
                        margin-bottom: 25px;
                        color: #333;
                        animation: fadeInUp 0.8s ease forwards;
                    }
                `}
            </style>

            <div className="form-card">
                <h2>Add Internship</h2>
                <input
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />
                <input
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />
                <button className="submit-btn" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default InternshipForm;
