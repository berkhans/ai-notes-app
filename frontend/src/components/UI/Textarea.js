import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Textarea = forwardRef(({ 
  label,
  placeholder,
  value,
  onChange,
  error,
  success,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  showCharacterCount = false,
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  };

  const baseClasses = 'w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical';
  
  const getTextareaClasses = () => {
    let classes = `${baseClasses} ${sizeClasses[size]}`;
    
    if (error) {
      classes += ' border-red-300 focus:border-red-500 focus:ring-red-500';
    } else if (success) {
      classes += ' border-green-300 focus:border-green-500 focus:ring-green-500';
    } else {
      classes += ' border-gray-300 focus:border-blue-500 focus:ring-blue-500';
    }

    if (fullWidth) {
      classes += ' w-full';
    }

    return classes;
  };

  const characterCount = value ? value.length : 0;
  const isOverLimit = maxLength && characterCount > maxLength;

  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <motion.textarea
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          maxLength={maxLength}
          className={getTextareaClasses()}
          {...props}
        />
      </div>

      {/* Character Count */}
      {showCharacterCount && maxLength && (
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center gap-2">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600"
              >
                {error}
              </motion.p>
            )}
            
            {success && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600"
              >
                {success}
              </motion.p>
            )}
          </div>
          
          <span className={`text-xs ${
            isOverLimit ? 'text-red-500' : 'text-gray-500'
          }`}>
            {characterCount}/{maxLength}
          </span>
        </div>
      )}

      {/* Error Message (when not showing character count) */}
      {error && !showCharacterCount && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}

      {/* Success Message (when not showing character count) */}
      {success && !showCharacterCount && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-green-600"
        >
          {success}
        </motion.p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea; 