import React from 'react';
import { motion } from 'framer-motion';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Material UI Button
const StyledButton = styled(MuiButton)(({ theme, variant, size, color }) => ({
  borderRadius: '16px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: variant === 'contained' ? '12px 24px' : '10px 20px',
  minHeight: size === 'large' ? '48px' : size === 'small' ? '36px' : '44px',
  boxShadow: variant === 'contained' ? '0 4px 14px 0 rgba(0, 0, 0, 0.1)' : 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: variant === 'contained' ? '0 8px 25px 0 rgba(0, 0, 0, 0.15)' : '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
  },
  
  '&:active': {
    transform: 'translateY(0px)',
  },
  
  // Gradient variants
  ...(variant === 'contained' && color === 'gradient' && {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    },
  }),
  
  ...(variant === 'contained' && color === 'gradient-purple' && {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    },
  }),
  
  ...(variant === 'contained' && color === 'gradient-blue' && {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #43a1f4 0%, #00e6f4 100%)',
    },
  }),
  
  ...(variant === 'contained' && color === 'gradient-green' && {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    '&:hover': {
      background: 'linear-gradient(135deg, #3dd870 0%, #32e8c6 100%)',
    },
  }),
  
  // Glassmorphism variant
  ...(variant === 'glass' && {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
  }),
  
  // Icon button styles
  ...(size === 'icon' && {
    minWidth: 'unset',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    padding: 0,
  }),
}));

const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  className,
  type = 'button',
  fullWidth = false,
  href,
  target,
  ...props
}) => {
  const buttonContent = (
    <>
      {loading && (
        <CircularProgress
          size={20}
          sx={{
            color: variant === 'contained' ? 'white' : 'primary.main',
            mr: 1,
          }}
        />
      )}
      {!loading && startIcon}
      {children}
      {!loading && endIcon}
    </>
  );

  const buttonProps = {
    variant: variant === 'glass' ? 'contained' : variant,
    color: color.startsWith('gradient') ? 'primary' : color,
    size,
    disabled: disabled || loading,
    onClick,
    className,
    type,
    fullWidth,
    href,
    target,
    ...props,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <StyledButton
        {...buttonProps}
        variant={variant}
        color={color}
        size={size}
      >
        {buttonContent}
      </StyledButton>
    </motion.div>
  );
};

export default Button; 