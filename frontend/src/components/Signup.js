import React, { useState } from 'react';
import { studentSignup } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [batch, setBatch] = useState('');
    const [role, setRole] = useState('student'); // default role
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const res = await studentSignup({ name, email, password, batch, role });
            alert(res.data.message);
            navigate('/');
        } catch (err) {
            console.error(err.response?.data);
            alert(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #ff9966, #cc33ff, #3399ff)',
                backgroundSize: '400% 400%',
                animation: 'gradientMove 8s ease infinite',
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
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .signup-card input:focus {
                        border-color: #cc33ff;
                        box-shadow: 0 0 8px rgba(204, 51, 255, 0.4);
                    }
                    .signup-btn:hover {
                        transform: scale(1.05);
                        background: linear-gradient(90deg, #3399ff, #00c6ff);
                    }
                `}
            </style>

            <div
                className="signup-card"
                style={{
                    backgroundColor: 'white',
                    padding: '40px',
                    borderRadius: '15px',
                    width: '350px',
                    textAlign: 'center',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    animation: 'fadeIn 1s ease',
                }}
            >
                {/* Role Selector */}
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <label style={{ fontWeight: 'bold' }}>
                        <input
                            type="radio"
                            value="student"
                            checked={role === 'student'}
                            onChange={(e) => setRole(e.target.value)}
                        /> Student
                    </label>
                    <label style={{ fontWeight: 'bold' }}>
                        <input
                            type="radio"
                            value="coordinator"
                            checked={role === 'coordinator'}
                            onChange={(e) => setRole(e.target.value)}
                        /> Coordinator
                    </label>
                </div>

                <h2 style={{ color: '#333', marginBottom: '25px', animation: 'fadeIn 1.2s ease' }}>Signup</h2>

                {['Name', 'Email', 'Password', 'Batch'].map((placeholder, index) => (
                    <input
                        key={placeholder}
                        placeholder={placeholder}
                        type={placeholder === 'Password' ? 'password' : 'text'}
                        value={
                            placeholder === 'Name'
                                ? name
                                : placeholder === 'Email'
                                ? email
                                : placeholder === 'Password'
                                ? password
                                : batch
                        }
                        onChange={(e) => {
                            if (placeholder === 'Name') setName(e.target.value);
                            else if (placeholder === 'Email') setEmail(e.target.value);
                            else if (placeholder === 'Password') setPassword(e.target.value);
                            else setBatch(e.target.value);
                        }}
                        style={{
                            padding: '12px',
                            width: '90%',
                            marginBottom: '15px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            transition: 'all 0.3s',
                            animation: `fadeIn 1.${index + 3}s ease forwards`,
                        }}
                    />
                ))}

                <button
                    onClick={handleSignup}
                    className="signup-btn"
                    style={{
                        padding: '12px 25px',
                        width: '90%',
                        background: 'linear-gradient(90deg, #ff9966, #ff5e62)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        animation: 'fadeIn 1.8s ease forwards',
                    }}
                >
                    Signup
                </button>
            </div>
        </div>
    );
}

export default Signup;
