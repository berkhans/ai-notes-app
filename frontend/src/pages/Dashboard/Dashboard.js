import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  DocumentTextIcon,
  PlusIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  ArchiveBoxIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import useNotesStore from '../../stores/notesStore';
import useAuthStore from '../../stores/authStore';
import Button from '../../components/UI/Button';
import Card from '../../components/UI/Card';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: '32px',
  padding: theme.spacing(6, 4),
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.3,
  },
}));

const StatsCard = styled(Paper)(({ theme, gradient }) => ({
  borderRadius: '24px',
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  },
  
  ...(gradient && {
    background: `linear-gradient(135deg, ${gradient})`,
    color: 'white',
    
    '& .MuiTypography-root': {
      color: 'white',
    },
  }),
}));

const QuickActionCard = styled(Paper)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  textDecoration: 'none',
  display: 'block',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    textDecoration: 'none',
  },
}));

const NoteCard = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.9)',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const Dashboard = () => {
  const { user } = useAuthStore();
  const { stats, getStats, getNotes, notes } = useNotesStore();

  useEffect(() => {
    getStats();
    getNotes({ limit: 5 });
  }, [getStats, getNotes]);

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

  const getCategoryColor = (category) => {
    const colors = {
      personal: '#3b82f6',
      work: '#10b981',
      education: '#8b5cf6',
      health: '#ef4444',
      finance: '#f59e0b',
      travel: '#6366f1',
      other: '#6b7280'
    };
    return colors[category] || colors.other;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      personal: '👤',
      work: '💼',
      education: '📚',
      health: '🏥',
      finance: '💰',
      travel: '✈️',
      other: '📝'
    };
    return icons[category] || icons.other;
  };

  const statsCards = [
    {
      title: 'Toplam Not',
      value: stats?.totalNotes || 0,
      description: 'Tüm notlarınız',
      icon: DocumentTextIcon,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea'
    },
    {
      title: 'Sabitlenmiş',
      value: stats?.pinnedNotes || 0,
      description: 'Önemli notlar',
      icon: StarIcon,
      gradient: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      color: '#f59e0b'
    },
    {
      title: 'Arşivlenmiş',
      value: stats?.archivedNotes || 0,
      description: 'Saklanan notlar',
      icon: ArchiveBoxIcon,
      gradient: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
      color: '#6b7280'
    },
    {
      title: 'Bu Ay',
      value: notes?.length || 0,
      description: 'Yeni notlar',
      icon: ChartBarIcon,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#10b981'
    }
  ];

  const quickActions = [
    {
      title: 'Yeni Not',
      description: 'Hemen oluştur',
      icon: PlusIcon,
      path: '/notes/create',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea'
    },
    {
      title: 'Tüm Notlar',
      description: 'Görüntüle',
      icon: DocumentTextIcon,
      path: '/notes',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: '#3b82f6'
    },
    {
      title: 'İstatistikler',
      description: 'Analiz et',
      icon: ChartBarIcon,
      path: '/profile',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: '#10b981'
    }
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ padding: '24px' }}
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants}>
        <HeroSection>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      mr: 2
                    }}
                  >
                    <SparklesIcon style={{ width: 28, height: 28 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                      Hoş Geldiniz, {user?.name?.split(' ')[0] || 'Kullanıcı'}! 👋
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      AI destekli not alma deneyiminiz başlıyor
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 600 }}>
                  Notlarınızı yapay zeka ile özetleyin, kategorize edin ve organize edin. 
                  Daha akıllı not alma deneyimi için hazır mısınız?
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    margin: '0 auto',
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <SparklesIcon style={{ width: 60, height: 60 }} />
                </Avatar>
              </Grid>
            </Grid>
          </Box>
        </HeroSection>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} style={{ marginTop: '32px' }}>
        <Grid container spacing={3}>
          {statsCards.map((card, index) => (
            <Grid item xs={12} sm={6} lg={3} key={card.title}>
              <StatsCard gradient={card.gradient}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.6 }}>
                      {card.description}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      background: card.gradient,
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <card.icon style={{ width: 28, height: 28 }} />
                  </Avatar>
                </Box>
              </StatsCard>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} style={{ marginTop: '32px' }}>
        <Card variant="glass" elevation="medium">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Hızlı İşlemler
            </Typography>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <SparklesIcon style={{ width: 24, height: 24 }} />
            </Avatar>
          </Box>
          
          <Grid container spacing={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} md={4} key={action.title}>
                <Link to={action.path} style={{ textDecoration: 'none' }}>
                  <QuickActionCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          background: action.gradient,
                          mr: 2
                        }}
                      >
                        <action.icon style={{ width: 24, height: 24 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
                          {action.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          {action.description}
                        </Typography>
                      </Box>
                    </Box>
                  </QuickActionCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Card>
      </motion.div>

      {/* Recent Notes */}
      <motion.div variants={itemVariants} style={{ marginTop: '32px' }}>
        <Card variant="glass" elevation="medium">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mr: 2 }}>
                Son Notlar
              </Typography>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <DocumentTextIcon style={{ width: 16, height: 16 }} />
              </Avatar>
            </Box>
            <Link to="/notes" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<EyeIcon style={{ width: 16, height: 16 }} />}
              >
                Tümünü Gör
              </Button>
            </Link>
          </Box>

          {notes && notes.length > 0 ? (
            <Box sx={{ space: 2 }}>
              {notes.slice(0, 5).map((note, index) => (
                <motion.div
                  key={note._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <NoteCard sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          background: `linear-gradient(135deg, ${getCategoryColor(note.category)}20 0%, ${getCategoryColor(note.category)}10 100%)`,
                          mr: 2,
                          fontSize: '20px'
                        }}
                      >
                        {getCategoryIcon(note.category)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                            {note.title}
                          </Typography>
                          {note.isPinned && (
                            <Tooltip title="Sabitlenmiş">
                              <StarIcon style={{ width: 16, height: 16, color: '#f59e0b' }} />
                            </Tooltip>
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ color: '#6b7280', mb: 2, lineHeight: 1.5 }}>
                          {note.content.substring(0, 120)}...
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={note.category}
                              size="small"
                              sx={{
                                background: `${getCategoryColor(note.category)}20`,
                                color: getCategoryColor(note.category),
                                fontWeight: 600
                              }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', color: '#9ca3af' }}>
                              <ClockIcon style={{ width: 14, height: 14, marginRight: 4 }} />
                              <Typography variant="caption">
                                {new Date(note.createdAt).toLocaleDateString('tr-TR')}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Görüntüle">
                              <IconButton size="small" sx={{ color: '#6b7280' }}>
                                <EyeIcon style={{ width: 16, height: 16 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Düzenle">
                              <IconButton size="small" sx={{ color: '#6b7280' }}>
                                <PencilIcon style={{ width: 16, height: 16 }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Sil">
                              <IconButton size="small" sx={{ color: '#6b7280' }}>
                                <TrashIcon style={{ width: 16, height: 16 }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </NoteCard>
                </motion.div>
              ))}
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Avatar
                  sx={{
                    width: 96,
                    height: 96,
                    background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                    margin: '0 auto 24px',
                    fontSize: '48px'
                  }}
                >
                  📝
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Henüz not oluşturmadınız
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 3, maxWidth: 400, mx: 'auto' }}>
                  İlk notunuzu oluşturarak AI destekli not alma deneyiminizi başlatın
                </Typography>
                <Link to="/notes/create" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="gradient-purple"
                    startIcon={<PlusIcon style={{ width: 20, height: 20 }} />}
                  >
                    İlk Notunuzu Oluşturun
                  </Button>
                </Link>
              </Box>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Category Stats */}
      {stats?.categoryStats && stats.categoryStats.length > 0 && (
        <motion.div variants={itemVariants} style={{ marginTop: '32px' }}>
          <Card variant="glass" elevation="medium">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Kategori Dağılımı
              </Typography>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <ChartBarIcon style={{ width: 16, height: 16 }} />
              </Avatar>
            </Box>
            
            <Grid container spacing={3}>
              {stats.categoryStats.map((cat, index) => (
                <Grid item xs={6} md={3} key={cat._id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Paper
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 64,
                          height: 64,
                          background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
                          margin: '0 auto 16px',
                          fontSize: '32px'
                        }}
                      >
                        {getCategoryIcon(cat._id)}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, textTransform: 'capitalize' }}>
                        {cat._id === 'other' ? 'Diğer' : cat._id}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea' }}>
                        {cat.count}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dashboard; 