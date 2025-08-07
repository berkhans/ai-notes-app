import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  HomeIcon,
  DocumentTextIcon,
  PlusIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  PlusIcon as PlusIconSolid,
  UserIcon as UserIconSolid
} from '@heroicons/react/24/solid';
import useAuthStore from '../../stores/authStore';

// Styled components
const StyledSidebar = styled(Box)(({ theme }) => ({
  width: 280,
  height: '100vh',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
    pointerEvents: 'none',
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  zIndex: 1,
}));

const NavigationSection = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  position: 'relative',
  zIndex: 1,
}));

const UserSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  position: 'relative',
  zIndex: 1,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: '16px',
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  ...(active && {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    
    '&:hover': {
      background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
    },
    
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
    
    '& .MuiListItemText-secondary': {
      color: 'rgba(255, 255, 255, 0.8)',
    },
  }),
  
  ...(!active && {
    '&:hover': {
      background: 'rgba(102, 126, 234, 0.1)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
    },
  }),
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: 48,
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
}));

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      icon: HomeIcon,
      iconSolid: HomeIconSolid,
      label: 'Dashboard',
      description: 'Genel bakış'
    },
    {
      path: '/notes',
      icon: DocumentTextIcon,
      iconSolid: DocumentTextIconSolid,
      label: 'Notlar',
      description: 'Tüm notlarınız'
    },
    {
      path: '/notes/create',
      icon: PlusIcon,
      iconSolid: PlusIconSolid,
      label: 'Yeni Not',
      description: 'Yeni not oluştur'
    },
    {
      path: '/profile',
      icon: UserIcon,
      iconSolid: UserIconSolid,
      label: 'Profil',
      description: 'Hesap ayarları'
    }
  ];

  const handleLogout = () => {
    logout();
  };

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
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
      <StyledSidebar>
        {/* Logo Section */}
        <motion.div variants={itemVariants}>
          <LogoSection>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                  }}
                >
                  <SparklesIcon style={{ width: 24, height: 24 }} />
                </Avatar>
              </Badge>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  AI Notes
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500 }}>
                  Yapay Zeka Destekli
                </Typography>
              </Box>
            </Box>
          </LogoSection>
        </motion.div>

        {/* Navigation Section */}
        <NavigationSection>
          <motion.div variants={itemVariants}>
            <Typography variant="overline" sx={{ color: '#6b7280', fontWeight: 600, mb: 2, display: 'block' }}>
              Navigasyon
            </Typography>
          </motion.div>
          
          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={item.path} variants={itemVariants}>
                  <ListItem disablePadding>
                    <StyledListItemButton
                      component={NavLink}
                      to={item.path}
                      active={isActive}
                      sx={{ py: 2, px: 3 }}
                    >
                      <StyledListItemIcon>
                        {isActive ? (
                          <item.iconSolid style={{ width: 20, height: 20 }} />
                        ) : (
                          <item.icon style={{ width: 20, height: 20 }} />
                        )}
                      </StyledListItemIcon>
                      <ListItemText
                        primary={item.label}
                        secondary={item.description}
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        }}
                        secondaryTypographyProps={{
                          fontSize: '0.75rem',
                        }}
                      />
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          style={{
                            position: 'absolute',
                            right: 16,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'white',
                          }}
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </StyledListItemButton>
                  </ListItem>
                </motion.div>
              );
            })}
          </List>
        </NavigationSection>

        {/* User Section */}
        <UserSection>
          <motion.div variants={itemVariants}>
            <Typography variant="overline" sx={{ color: '#6b7280', fontWeight: 600, mb: 2, display: 'block' }}>
              Hesap
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                p: 2,
                mb: 2,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                      width: 40,
                      height: 40,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: '1rem',
                      fontWeight: 700,
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </Avatar>
                </Badge>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1f2937', truncate: true }}>
                    {user?.name || 'Kullanıcı'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6b7280', truncate: true }}>
                    {user?.email || 'email@example.com'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <StyledListItemButton
              onClick={handleLogout}
              sx={{
                py: 2,
                px: 3,
                borderRadius: '16px',
                color: '#6b7280',
                '&:hover': {
                  background: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                },
              }}
            >
              <StyledListItemIcon>
                <ArrowRightOnRectangleIcon style={{ width: 20, height: 20 }} />
              </StyledListItemIcon>
              <ListItemText
                primary="Çıkış Yap"
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              />
            </StyledListItemButton>
          </motion.div>
        </UserSection>
      </StyledSidebar>
    </motion.div>
  );
};

export default Sidebar; 