import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Badge,
  IconButton,
  TextField,
  InputAdornment,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  BellIcon, 
  MagnifyingGlassIcon, 
  Cog6ToothIcon,
  SparklesIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import useAuthStore from '../../stores/authStore';

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
  color: '#1f2937',
  padding: theme.spacing(2, 4),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s',
    
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    
    '&.Mui-focused': {
      background: 'rgba(255, 255, 255, 0.95)',
      border: '2px solid #667eea',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.15)',
    },
  },
  
  '& .MuiInputBase-input': {
    padding: '12px 16px',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
}));

const Header = () => {
  const { user } = useAuthStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <StyledAppBar position="static" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: '80px !important' }}>
          {/* Left side */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <SparklesIcon style={{ width: 24, height: 24 }} />
                </Avatar>
              </motion.div>
              
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 0.5,
                  }}
                >
                  Hoş Geldiniz, {user?.name?.split(' ')[0] || 'Kullanıcı'}! 👋
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#6b7280', fontWeight: 500 }}
                >
                  AI destekli not alma deneyimi
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Right side */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Search */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <StyledTextField
                  placeholder="Notlarda ara..."
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MagnifyingGlassIcon style={{ width: 20, height: 20, color: '#9ca3af' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: 320 }}
                />
              </motion.div>

              {/* Notifications */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Tooltip title="Bildirimler">
                  <Badge
                    badgeContent={
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          border: '2px solid white',
                          animation: 'pulse 2s infinite',
                        }}
                      />
                    }
                    overlap="circular"
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <IconButton
                      sx={{
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        width: 48,
                        height: 48,
                        color: '#6b7280',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.9)',
                          color: '#374151',
                        },
                      }}
                    >
                      <BellIcon style={{ width: 20, height: 20 }} />
                    </IconButton>
                  </Badge>
                </Tooltip>
              </motion.div>

              {/* Settings */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Tooltip title="Ayarlar">
                  <IconButton
                    sx={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '16px',
                      width: 48,
                      height: 48,
                      color: '#6b7280',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#374151',
                      },
                    }}
                  >
                    <Cog6ToothIcon style={{ width: 20, height: 20 }} />
                  </IconButton>
                </Tooltip>
              </motion.div>

              {/* User Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Tooltip title="Profil">
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          border: '2px solid white',
                          animation: 'pulse 2s infinite',
                        }}
                      />
                    }
                  >
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                        border: '2px solid white',
                        cursor: 'pointer',
                      }}
                    >
                      <UserCircleIcon style={{ width: 24, height: 24 }} />
                    </Avatar>
                  </Badge>
                </Tooltip>
              </motion.div>
            </Box>
          </motion.div>
        </Toolbar>
      </StyledAppBar>
    </motion.div>
  );
};

export default Header; 