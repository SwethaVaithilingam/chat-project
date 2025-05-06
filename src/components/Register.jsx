import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNext = () => {
    if (!formData.username || !formData.phone) {
      setMessage("❌ Name and phone are required.");
      return;
    }
    setMessage('');
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/register', {
        username: formData.username,
        phone: formData.phone,
        email: formData.email,
        password: formData.password
      });

      setMessage(`✅ ${response.data.message}`);
    } catch (error) {
      if (error.response) {
        setMessage(`❌ ${error.response.data.detail}`);
      } else {
        setMessage("❌ Registration failed.");
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Register</h2>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <button type="button" onClick={handleNext} style={{ width: '100%' }}>
              Next →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button type="button" onClick={handleBack}>← Back</button>
              <button type="submit">Register</button>
            </div>
          </>
        )}
      </form>

      <p style={{ color: message.startsWith("✅") ? "green" : "red", marginTop: '1rem' }}>{message}</p>
    </div>
  );
};

export default Register;
