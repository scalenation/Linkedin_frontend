// src/pages/login-register/components/RegisterForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSuccess, isLoading }) => {
  const { signUp, authError } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    industry: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      const userData = {
        fullName: formData.fullName,
        company: formData.company,
        industry: formData.industry,
        role: 'user'
      };

      const result = await signUp(formData.email, formData.password, userData);
      
      if (result.success) {
        onSuccess();
      } else {
        setErrors({ general: result.error || 'Registration failed. Please try again.' });
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

      {/* Full Name Field */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-2">
          Full Name *
        </label>
        <div className="relative">
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 border rounded-md focus-ring transition-colors duration-200 ${
              errors.fullName ? 'border-error' : 'border-border focus:border-primary'
            }`}
            placeholder="Enter your full name"
            disabled={isLoading || isSubmitting}
          />
          <Icon name="User" size={18} className="absolute left-3 top-3.5 text-text-secondary" />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.fullName}</span>
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
          Email Address *
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

      {/* Company and Industry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-text-primary mb-2">
            Company
          </label>
          <div className="relative">
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-10 border border-border rounded-md focus-ring transition-colors duration-200 focus:border-primary"
              placeholder="Your company"
              disabled={isLoading || isSubmitting}
            />
            <Icon name="Building" size={18} className="absolute left-3 top-3.5 text-text-secondary" />
          </div>
        </div>
        
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-text-primary mb-2">
            Industry
          </label>
          <div className="relative">
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-4 py-3 pl-10 border border-border rounded-md focus-ring transition-colors duration-200 focus:border-primary appearance-none"
              disabled={isLoading || isSubmitting}
            >
              <option value="">Select industry</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="marketing">Marketing</option>
              <option value="consulting">Consulting</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="other">Other</option>
            </select>
            <Icon name="Briefcase" size={18} className="absolute left-3 top-3.5 text-text-secondary" />
          </div>
        </div>
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password *
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
            placeholder="Create a password"
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

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
          Confirm Password *
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 pl-10 pr-10 border rounded-md focus-ring transition-colors duration-200 ${
              errors.confirmPassword ? 'border-error' : 'border-border focus:border-primary'
            }`}
            placeholder="Confirm your password"
            disabled={isLoading || isSubmitting}
          />
          <Icon name="Lock" size={18} className="absolute left-3 top-3.5 text-text-secondary" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3.5 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.confirmPassword}</span>
          </p>
        )}
      </div>

      {/* Terms Agreement */}
      <div>
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className={`mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 ${
              errors.agreeToTerms ? 'border-error' : ''
            }`}
            disabled={isLoading || isSubmitting}
          />
          <span className="text-sm text-text-secondary leading-5">
            I agree to the{' '}
            <button type="button" className="text-secondary hover:text-secondary/80 transition-colors duration-200">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-secondary hover:text-secondary/80 transition-colors duration-200">
              Privacy Policy
            </button>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-1 text-sm text-error flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.agreeToTerms}</span>
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || isSubmitting}
        className="w-full btn-primary py-3 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading || isSubmitting ? (
          <>
            <Icon name="Loader" size={18} className="animate-spin" />
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <Icon name="UserPlus" size={18} />
            <span>Create Account</span>
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;