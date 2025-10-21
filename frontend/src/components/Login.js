
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // default role
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/student/login',
                { email, password, role }
            );

            if (res && res.data && res.data.user) {
                localStorage.setItem('userId', res.data.user.id);
                localStorage.setItem('role', res.data.user.role);
                alert('Login Successful!');
                if (res.data.user.role === 'student') navigate('/student-dashboard');
                else navigate('/coordinator-dashboard');
            } else {
                alert('Login failed: Invalid response from server');
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.error) {
                alert('Login failed: ' + err.response.data.error);
            } else {
                alert('Login failed: Server not reachable');
            }
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
                    .login-card input:focus {
                        border-color: #cc33ff;
                        box-shadow: 0 0 8px rgba(204, 51, 255, 0.4);
                    }
                    .login-btn:hover {
                        transform: scale(1.05);
                        background: linear-gradient(90deg, #3399ff, #00c6ff);
                    }
                `}
            </style>

            <div
                className="login-card"
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

                <h2 style={{ color: '#333', marginBottom: '25px', animation: 'fadeIn 1.2s ease' }}>
                    Login
                </h2>

                {[{ placeholder: 'Email', type: 'text' }, { placeholder: 'Password', type: 'password' }].map(
                    ({ placeholder, type }, index) => (
                        <input
                            key={placeholder}
                            placeholder={placeholder}
                            type={type}
                            value={placeholder === 'Email' ? email : password}
                            onChange={(e) =>
                                placeholder === 'Email' ? setEmail(e.target.value) : setPassword(e.target.value)
                            }
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
                    )
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button
                        onClick={handleLogin}
                        className="login-btn"
                        style={{
                            padding: '12px 20px',
                            background: 'linear-gradient(90deg, #ff9966, #ff5e62)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            width: '48%',
                            transition: 'all 0.3s ease',
                            animation: 'fadeIn 1.6s ease forwards',
                        }}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate('/signup')}
                        className="login-btn"
                        style={{
                            padding: '12px 20px',
                            background: 'linear-gradient(90deg, #3399ff, #00c6ff)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            width: '48%',
                            transition: 'all 0.3s ease',
                            animation: 'fadeIn 1.7s ease forwards',
                        }}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
