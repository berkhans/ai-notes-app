import React from 'react';
import { motion } from 'framer-motion';
import { Card as MuiCard, CardContent, CardActions, CardMedia, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Material UI Card
const StyledCard = styled(MuiCard)(({ theme, variant, elevation, hoverable }) => ({
  borderRadius: '20px',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  
  // Default glassmorphism style
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: elevation === 'high' 
    ? '0 20px 40px rgba(0, 0, 0, 0.1)' 
    : elevation === 'medium'
    ? '0 10px 30px rgba(0, 0, 0, 0.1)'
    : '0 4px 14px rgba(0, 0, 0, 0.1)',
  
  ...(hoverable && {
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
  }),
  
  // Gradient variant
  ...(variant === 'gradient' && {
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
    
    ...(hoverable && {
      '&:hover::before': {
        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
      },
    }),
  }),
  
  // Glass variant
  ...(variant === 'glass' && {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: 'white',
    
    '& .MuiCardContent-root': {
      color: 'white',
    },
    
    '& .MuiTypography-root': {
      color: 'white',
    },
    
    ...(hoverable && {
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      },
    }),
  }),
  
  // Solid variant
  ...(variant === 'solid' && {
    background: 'white',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    
    ...(hoverable && {
      '&:hover': {
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      },
    }),
  }),
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: '24px 24px 0 24px',
  
  '& .MuiCardHeader-title': {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1f2937',
  },
  
  '& .MuiCardHeader-subheader': {
    fontSize: '0.875rem',
    color: '#6b7280',
  },
}));

const StyledCardContent = styled(CardContent)(({ theme, padding }) => ({
  padding: padding === 'none' ? 0 : padding === 'small' ? '16px 24px' : '24px',
  
  '&:last-child': {
    paddingBottom: padding === 'none' ? 0 : padding === 'small' ? '16px' : '24px',
  },
}));

const StyledCardActions = styled(CardActions)(({ theme, padding }) => ({
  padding: padding === 'none' ? 0 : padding === 'small' ? '8px 24px 24px' : '16px 24px 24px',
  gap: '8px',
}));

const Card = ({
  children,
  variant = 'default',
  elevation = 'medium',
  hoverable = true,
  padding = 'normal',
  header,
  subheader,
  avatar,
  action,
  media,
  mediaHeight = 200,
  actions,
  className,
  onClick,
  ...props
}) => {
  const cardProps = {
    variant,
    elevation,
    hoverable,
    className,
    onClick,
    ...props,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hoverable ? { scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      <StyledCard {...cardProps}>
        {header && (
          <StyledCardHeader
            title={header}
            subheader={subheader}
            avatar={avatar}
            action={action}
          />
        )}
        
        {media && (
          <CardMedia
            component="img"
            height={mediaHeight}
            image={media}
            alt={header || 'Card media'}
            sx={{ objectFit: 'cover' }}
          />
        )}
        
        <StyledCardContent padding={padding}>
          {children}
        </StyledCardContent>
        
        {actions && (
          <StyledCardActions padding={padding}>
            {actions}
          </StyledCardActions>
        )}
      </StyledCard>
    </motion.div>
  );
};

export default Card; 