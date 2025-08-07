import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Bars3Icon, 
  SparklesIcon
} from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';
import Header from './Header';
import useAuthStore from '../../stores/authStore';

// Styled components
const LayoutContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
  zIndex: 1,
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(3),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(4),
  },
  maxWidth: '1400px',
  margin: '0 auto',
  width: '100%',
}));

const MobileAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
  color: '#1f2937',
}));

const Layout = () => {
  const { initializeAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const theme = useTheme();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <LayoutContainer>
      <motion.div 
        style={{ display: 'flex', height: '100vh' }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Mobile Sidebar */}
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              width: 280,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <Sidebar />
        </Drawer>

        {/* Desktop Sidebar */}
        <motion.div
          variants={itemVariants}
          sx={{
            display: { xs: 'none', lg: 'block' },
            width: 280,
            flexShrink: 0,
          }}
        >
          <Sidebar />
        </motion.div>

        {/* Main Content */}
        <MainContent>
          {/* Mobile Header */}
          <motion.div variants={itemVariants}>
            <MobileAppBar
              position="sticky"
              sx={{ display: { xs: 'block', lg: 'none' } }}
            >
              <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 1 }}
                  >
                    <Bars3Icon style={{ width: 24, height: 24 }} />
                  </IconButton>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      }}
                    >
                      <SparklesIcon style={{ width: 16, height: 16 }} />
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      AI Notes
                    </Typography>
                  </Box>
                </Box>
              </Toolbar>
            </MobileAppBar>
          </motion.div>

          {/* Desktop Header */}
          <motion.div
            variants={itemVariants}
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            <Header />
          </motion.div>

          {/* Page Content */}
          <motion.div variants={itemVariants}>
            <ContentArea>
              <AnimatePresence mode="wait">
                <motion.div
                  key={window.location.pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ height: '100%' }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </ContentArea>
          </motion.div>
        </MainContent>
      </motion.div>
    </LayoutContainer>
  );
};

export default Layout; 