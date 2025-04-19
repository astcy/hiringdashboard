import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';
import dashboardImg from './assets/dashboard.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      return 'All fields are required.';
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return 'Invalid email format.';
    }
    if (form.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }
    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match.';
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
      await axios.post('http://localhost:5000/api/auth/register', {
        fullName: form.fullName,
        email: form.email,
        password: form.password
      });

      navigate('/login'); // direct to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <>
      <div className="logo">
        <h1>LOGO</h1>
      </div>

      <div className="signup-wrapper">
        <div className="signup-left">
          <img src={dashboardImg} alt="Dashboard Preview" />
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
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

        <div className="signup-right">
          <h2>Welcome to Dashboard</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <label>
              Full name<span>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={form.fullName}
              onChange={handleChange}
            />

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
              <span onClick={() => setShowPassword(!showPassword)} style={{ color: 'purple' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <label>
              Confirm Password<span>*</span>
            </label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ color: 'purple' }}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">Register</button>

            <p className="login-link">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
