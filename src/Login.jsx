import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import dashboardImg from './assets/dashboard.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.email || !form.password) {
      return 'Email and Password are required.';
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return 'Invalid email format.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, user } = response.data;

      localStorage.setItem('hrms_token', token);
      localStorage.setItem('hrms_user', JSON.stringify(user));

      // Set session timeout (2 hours)
      setTimeout(() => {
        localStorage.removeItem('hrms_token');
        localStorage.removeItem('hrms_user');
        navigate('/login');
        alert('Session expired. Please login again.');
      }, 7200000); // 2 hours

      navigate('/dashboard'); // 👈 Immediately go to dashboard

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-wrapper">
      {/* Left Side */}
      <div className="signup-left">
        <img src={dashboardImg} alt="Dashboard Preview" />
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>
        <p>
          Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <div className="slider-dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      {/* Right Side */}
      <div className="signup-right">
        <h2>Welcome Back!</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}

          <label>
            Email Address<span>*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <label>
            Password<span>*</span>
          </label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <span onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit">Login</button>

          <p className="login-link">
            Don't have an account? <Link to="/">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
