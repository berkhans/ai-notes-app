import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  Container,
  Grid,
  Card,
  Avatar
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Google,
  Twitter,
  PersonAdd,
  AutoAwesome,
  Security,
  Category
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';
import useAuthStore from '../../stores/authStore';
import useCanvasCursor from '../../hooks/useCanvasCursor';
import SpaceBackground from '../../components/SpaceBackground';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 24,
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
    '& input': {
      color: 'white',
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.7)',
        opacity: 1,
      },
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5),
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 600,
  background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
  '&:hover': {
    background: 'linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)',
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5),
  textTransform: 'none',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 16,
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Initialize canvas cursor
  useCanvasCursor();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange'
  });

  const password = watch('password', '');

  const onSubmit = async (data) => {
    try {
      console.log('Register attempt with:', data.email);
      
      // Call the register function from authStore
      await registerUser(data.name, data.email, data.password);
      
      console.log('Register successful');
      toast.success('Hesabınız başarıyla oluşturuldu!');
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Register error:', error);
      toast.error(error.message || 'Kayıt olurken bir hata oluştu');
    }
  };



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      {/* Space Background */}
      <SpaceBackground />
      
      {/* Animated background elements */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 2 }}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            top: '-160px',
            right: '-160px',
            width: '320px',
            height: '320px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            bottom: '-160px',
            left: '-160px',
            width: '320px',
            height: '320px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            filter: 'blur(40px)',
          }}
        />
      </Box>

      {/* Canvas for animated cursor */}
      <canvas
        id="canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.3
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 30 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Features */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <PersonAdd sx={{ fontSize: 40, color: 'white' }} />
                  </Avatar>
                </motion.div>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 1,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  AI Notes
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 4,
                    fontWeight: 400
                  }}
                >
                  Hesabınızı oluşturun
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <motion.div variants={itemVariants}>
                    <FeatureCard>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          mx: 'auto',
                          mb: 2,
                          background: 'rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <AutoAwesome />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                        AI Özetleme
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Notlarınızı otomatik özetleyin
                      </Typography>
                    </FeatureCard>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <motion.div variants={itemVariants}>
                    <FeatureCard>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          mx: 'auto',
                          mb: 2,
                          background: 'rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <Category />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                        Kategorilendirme
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Akıllı kategori önerileri
                      </Typography>
                    </FeatureCard>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <motion.div variants={itemVariants}>
                    <FeatureCard>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          mx: 'auto',
                          mb: 2,
                          background: 'rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        <Security />
                      </Avatar>
                      <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                        Güvenli
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        Verileriniz güvende
                      </Typography>
                    </FeatureCard>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </Grid>

          {/* Right side - Register Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <StyledPaper elevation={0}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      mb: 1
                    }}
                  >
                    Kayıt Ol
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 3
                    }}
                  >
                    Zaten hesabınız var mı?{' '}
                    <Link
                      to="/login"
                      style={{
                        color: '#90caf9',
                        textDecoration: 'none',
                        fontWeight: 600
                      }}
                    >
                      Giriş yapın
                    </Link>
                  </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mb: 3 }}>
                  <motion.div variants={itemVariants}>
                    <StyledTextField
                      fullWidth
                      type="text"
                      placeholder="Ad Soyad"
                      {...register('name', {
                        required: 'Ad Soyad gereklidir',
                        minLength: {
                          value: 2,
                          message: 'Ad en az 2 karakter olmalıdır'
                        }
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />
                    {errors.name && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.name.message}
                      </Alert>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledTextField
                      fullWidth
                      type="email"
                      placeholder="E-posta"
                      {...register('email', {
                        required: 'E-posta gereklidir',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Geçerli bir e-posta adresi girin'
                        }
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />
                    {errors.email && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.email.message}
                      </Alert>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledTextField
                      fullWidth
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Şifre"
                      {...register('password', {
                        required: 'Şifre gereklidir',
                        minLength: {
                          value: 6,
                          message: 'Şifre en az 6 karakter olmalıdır'
                        }
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />
                    {errors.password && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.password.message}
                      </Alert>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledTextField
                      fullWidth
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Şifre Tekrar"
                      {...register('confirmPassword', {
                        required: 'Şifre tekrarı gereklidir',
                        validate: value => value === password || 'Şifreler eşleşmiyor'
                      })}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                              sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 3 }}
                    />
                    {errors.confirmPassword && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {errors.confirmPassword.message}
                      </Alert>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&.Mui-checked': {
                              color: '#90caf9',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          Kullanım şartlarını kabul ediyorum
                        </Typography>
                      }
                      sx={{ mb: 3 }}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <StyledButton
                      fullWidth
                      type="submit"
                      disabled={isLoading || !isValid}
                      startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
                      sx={{ mb: 3 }}
                    >
                      {isLoading ? 'Kayıt Oluşturuluyor...' : 'Kayıt Ol'}
                    </StyledButton>
                  </motion.div>
                </Box>

                <motion.div variants={itemVariants}>
                  <Divider sx={{ mb: 3, '&::before, &::after': { borderColor: 'rgba(255, 255, 255, 0.2)' } }}>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', px: 2 }}>
                      veya
                    </Typography>
                  </Divider>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <SocialButton
                        fullWidth
                        startIcon={<Google />}
                        variant="outlined"
                      >
                        Google
                      </SocialButton>
                    </Grid>
                    <Grid item xs={6}>
                      <SocialButton
                        fullWidth
                        startIcon={<Twitter />}
                        variant="outlined"
                      >
                        Twitter
                      </SocialButton>
                    </Grid>
                  </Grid>
                </motion.div>
              </StyledPaper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register; 