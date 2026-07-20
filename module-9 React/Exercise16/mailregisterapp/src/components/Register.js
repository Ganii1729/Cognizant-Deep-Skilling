import React, { useState } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });

  const [success, setSuccess] = useState(false);

  // Field validation logic
  const validateField = (fieldName, value) => {
    let errorMsg = '';
    
    if (fieldName === 'name') {
      if (!value) {
        errorMsg = 'Name is required.';
      } else if (value.length < 5) {
        errorMsg = 'Name must be at least 5 characters long.';
      }
    }
    
    if (fieldName === 'email') {
      if (!value) {
        errorMsg = 'Email is required.';
      } else if (!value.includes('@') || !value.includes('.')) {
        errorMsg = 'Email must contain both "@" and "." characters.';
      }
    }
    
    if (fieldName === 'password') {
      if (!value) {
        errorMsg = 'Password is required.';
      } else if (value.length < 8) {
        errorMsg = 'Password must be at least 8 characters long.';
      }
    }

    return errorMsg;
  };

  // Handle onChange events (dynamic validation as user types)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  // Handle onBlur events (displays validation errors when leaving inputs)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const errorMsg = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  // Handle form submission (onSubmit validation check)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger validation checks on all fields
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });

    // Validate if any field is empty or has errors
    const hasErrors = Object.values(newErrors).some(err => err !== '');
    if (hasErrors) {
      return;
    }

    // Trigger success alert as specified in the lab details
    alert(`Registration Successful!\n\nName: ${formData.name}\nEmail: ${formData.email}`);
    
    setSuccess(true);
    
    // Clear registration form states
    setFormData({ name: '', email: '', password: '' });
    setTouched({ name: false, email: false, password: false });
    setErrors({ name: '', email: '', password: '' });
  };

  return (
    <div className="register-panel glass-panel">
      <h3>Register Secure Account</h3>
      <p className="sub-header">Please fill in details. Fields are validated in real-time as you focus/type.</p>

      {success && (
        <div className="alert-success">
          <span>✔️ Account registered successfully! Form has been reset.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form" noValidate>
        {/* Name input field */}
        <div className="form-group">
          <label htmlFor="reg-name">Full Name:</label>
          <input
            id="reg-name"
            name="name"
            type="text"
            placeholder="Min 5 characters"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.name && errors.name ? 'input-error' : (touched.name && !errors.name ? 'input-success' : '')}
            required
          />
          {touched.name && errors.name && (
            <span className="error-message">⚠️ {errors.name}</span>
          )}
        </div>

        {/* Email input field */}
        <div className="form-group">
          <label htmlFor="reg-email">Email Address:</label>
          <input
            id="reg-email"
            name="email"
            type="email"
            placeholder="Must contain @ and ."
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.email && errors.email ? 'input-error' : (touched.email && !errors.email ? 'input-success' : '')}
            required
          />
          {touched.email && errors.email && (
            <span className="error-message">⚠️ {errors.email}</span>
          )}
        </div>

        {/* Password input field */}
        <div className="form-group">
          <label htmlFor="reg-password">Password:</label>
          <input
            id="reg-password"
            name="password"
            type="password"
            placeholder="Min 8 characters"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.password && errors.password ? 'input-error' : (touched.password && !errors.password ? 'input-success' : '')}
            required
          />
          {touched.password && errors.password && (
            <span className="error-message">⚠️ {errors.password}</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default Register;
