// src/pages/login-register/components/LoginForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSuccess, isLoading }) => {
  const { signIn, authError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo credentials for testing
  const demoCredentials = {
    admin: { email: "admin@socialai.com", password: "admin123" },
    user: { email: "demo@socialai.com", password: "demo123" }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await signIn(formData.email, formData.password);
      
      if (result.success) {
        onSuccess();
      } else {
        setErrors({ general: result.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setTimeout(() => {
      setShowForgotPassword(false);
    }, 3000);
  };

  const fillDemoCredentials = (type) => {
    const creds = demoCredentials[type];
    setFormData(prev => ({
      ...prev,
      email: creds.email,
      password: creds.password
    }));
    setErrors({});
  };

  const displayError = authError || errors.general;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* General Error */}
      {displayError && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
            <p className="text-sm text-error">{displayError}</p>
          </div>
        </div>
      )}

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 border rounded-md focus-ring transition-colors duration-200 ${
              errors.email ? 'border-error' : 'border-border focus:border-primary'
            }`}
            placeholder="Enter your email"
            disabled={isLoading || isSubmitting}
          />
          <Icon name="Mail" size={18} className="absolute left-3 top-3.5 text-text-secondary" />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 pr-10 border rounded-md focus-ring transition-colors duration-200 ${
              errors.password ? 'border-error' : 'border-border focus:border-primary'
            }`}
            placeholder="Enter your password"
            disabled={isLoading || isSubmitting}
          />
          <Icon name="Lock" size={18} className="absolute left-3 top-3.5 text-text-secondary" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            disabled={isLoading || isSubmitting}
          />
          <span className="text-sm text-text-secondary">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-secondary hover:text-secondary/80 transition-colors duration-200"
          disabled={isLoading || isSubmitting}
        >
          Forgot password?
        </button>
      </div>

      {/* Forgot Password Message */}
      {showForgotPassword && (
        <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-md animate-fade-in">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-secondary mt-0.5" />
            <p className="text-sm text-secondary">
              Password reset link has been sent to your email address.
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || isSubmitting}
        className="w-full btn-primary py-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading || isSubmitting ? (
          <>
            <Icon name="Loader" size={18} className="animate-spin" />
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <Icon name="LogIn" size={18} />
            <span>Sign In</span>
          </>
        )}
      </button>

      {/* Demo Credentials Helper */}
      <div className="mt-4 p-3 bg-background rounded-md border border-border">
        <p className="text-xs font-caption text-text-secondary mb-2">Demo Credentials:</p>
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => fillDemoCredentials('admin')}
            className="w-full text-left text-xs font-mono bg-surface hover:bg-background transition-colors p-2 rounded"
            disabled={isLoading || isSubmitting}
          >
            <div className="flex justify-between">
              <span className="text-text-secondary">Admin:</span>
              <span className="text-text-primary">admin@socialai.com / admin123</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials('user')}
            className="w-full text-left text-xs font-mono bg-surface hover:bg-background transition-colors p-2 rounded"
            disabled={isLoading || isSubmitting}
          >
            <div className="flex justify-between">
              <span className="text-text-secondary">Demo:</span>
              <span className="text-text-primary">demo@socialai.com / demo123</span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;