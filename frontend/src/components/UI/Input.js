import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { 
  TextField, 
  InputAdornment, 
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Material UI TextField
const StyledTextField = styled(TextField)(({ theme, variant, size, color }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
    },
    
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #667eea',
      boxShadow: '0 8px 25px 0 rgba(102, 126, 234, 0.15)',
      transform: 'translateY(-2px)',
    },
    
    '&.Mui-error': {
      border: '2px solid #f56565',
      backgroundColor: 'rgba(245, 101, 101, 0.05)',
    },
  },
  
  '& .MuiInputLabel-root': {
    color: '#6b7280',
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#667eea',
    },
    '&.Mui-error': {
      color: '#f56565',
    },
  },
  
  '& .MuiInputBase-input': {
    padding: size === 'large' ? '16px 20px' : size === 'small' ? '10px 16px' : '14px 18px',
    fontSize: size === 'large' ? '1.125rem' : size === 'small' ? '0.875rem' : '1rem',
    fontWeight: 500,
    color: '#1f2937',
    
    '&::placeholder': {
      color: '#9ca3af',
      opacity: 1,
    },
  },
  
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  
  // Glassmorphism variant
  ...(variant === 'glass' && {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: 'white',
      
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      },
      
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        border: '2px solid rgba(255, 255, 255, 0.5)',
      },
    },
    
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.8)',
      '&.Mui-focused': {
        color: 'white',
      },
    },
    
    '& .MuiInputBase-input': {
      color: 'white',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)',
      },
    },
  }),
  
  // Gradient border variant
  ...(variant === 'gradient' && {
    '& .MuiOutlinedInput-root': {
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
      border: '2px solid transparent',
      backgroundClip: 'padding-box',
      position: 'relative',
      
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -1,
        margin: '-2px',
        borderRadius: 'inherit',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      
      '&:hover::before': {
        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
      },
      
      '&.Mui-focused::before': {
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
    },
  }),
}));

const Input = forwardRef(({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  required = false,
  type = 'text',
  variant = 'outlined',
  size = 'medium',
  fullWidth = true,
  multiline = false,
  rows = 1,
  maxRows,
  startIcon,
  endIcon,
  className,
  name,
  id,
  autoComplete,
  autoFocus = false,
  readOnly = false,
  ...props
}, ref) => {
  const inputProps = {
    label,
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    error: !!error,
    helperText: error || helperText,
    disabled,
    required,
    type,
    variant: variant === 'glass' || variant === 'gradient' ? 'outlined' : variant,
    size,
    fullWidth,
    multiline,
    rows,
    maxRows,
    className,
    name,
    id,
    autoComplete,
    autoFocus,
    readOnly,
    ...props,
  };

  const inputAdornment = {
    ...(startIcon && {
      startAdornment: (
        <InputAdornment position="start">
          {startIcon}
        </InputAdornment>
      ),
    }),
    ...(endIcon && {
      endAdornment: (
        <InputAdornment position="end">
          {endIcon}
        </InputAdornment>
      ),
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={{ position: 'relative' }}>
        <StyledTextField
          ref={ref}
          {...inputProps}
          variant={variant}
          size={size}
          InputProps={inputAdornment}
        />
      </Box>
    </motion.div>
  );
});

Input.displayName = 'Input';

export default Input; 