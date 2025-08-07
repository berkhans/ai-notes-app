import React, { useEffect, useState } from 'react';
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
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  InputAdornment,
  Fab,
  Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  ListBulletIcon,
  StarIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  SparklesIcon,
  DocumentTextIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import useNotesStore from '../../stores/notesStore';
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

const SearchCard = styled(Paper)(({ theme }) => ({
  borderRadius: '24px',
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
}));

const NoteCard = styled(Paper)(({ theme, viewMode }) => ({
  borderRadius: '20px',
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  height: viewMode === 'grid' ? 'auto' : 'auto',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    background: 'rgba(255, 255, 255, 0.95)',
  },
}));

const CategoryChip = styled(Chip)(({ theme, active, color }) => ({
  borderRadius: '16px',
  fontWeight: 600,
  transition: 'all 0.3s',
  
  ...(active && {
    background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
    color: 'white',
    boxShadow: `0 4px 14px ${color}40`,
  }),
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  },
}));

const Notes = () => {
  const { notes, getNotes, updateFilters, filters, isLoading } = useNotesStore();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const handleSearch = (e) => {
    e.preventDefault();
    updateFilters({ search: searchTerm });
  };

  const handleCategoryFilter = (category) => {
    updateFilters({ category: category === filters.category ? '' : category });
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

  const categories = [
    { id: 'personal', name: 'Kişisel', icon: '👤', color: '#3b82f6' },
    { id: 'work', name: 'İş', icon: '💼', color: '#10b981' },
    { id: 'education', name: 'Eğitim', icon: '📚', color: '#8b5cf6' },
    { id: 'health', name: 'Sağlık', icon: '🏥', color: '#ef4444' },
    { id: 'finance', name: 'Finans', icon: '💰', color: '#f59e0b' },
    { id: 'travel', name: 'Seyahat', icon: '✈️', color: '#6366f1' },
    { id: 'other', name: 'Diğer', icon: '📝', color: '#6b7280' }
  ];

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
                      Notlarım
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      {notes?.length || 0} not bulundu
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Link to="/notes/create" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    color="glass"
                    size="large"
                    startIcon={<PlusIcon style={{ width: 20, height: 20 }} />}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.3)',
                      }
                    }}
                  >
                    Yeni Not
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </HeroSection>
      </motion.div>

      {/* Search and Filters */}
      <motion.div variants={itemVariants} style={{ marginTop: '32px' }}>
        <SearchCard>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Arama ve Filtreleme
            </Typography>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              <MagnifyingGlassIcon style={{ width: 24, height: 24 }} />
            </Avatar>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <form onSubmit={handleSearch}>
                <TextField
                  fullWidth
                  placeholder="Notlarda ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MagnifyingGlassIcon style={{ width: 20, height: 20, color: '#9ca3af' }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={() => setSearchTerm('')}
                          sx={{ color: '#9ca3af' }}
                        >
                          <XMarkIcon style={{ width: 16, height: 16 }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.9)',
                      },
                      '&.Mui-focused': {
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '2px solid #667eea',
                      },
                    },
                  }}
                />
              </form>
            </Grid>

            <Grid item xs={12} lg={4}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newMode) => newMode && setViewMode(newMode)}
                sx={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '& .MuiToggleButton-root': {
                    borderRadius: '12px',
                    border: 'none',
                    color: '#6b7280',
                    '&.Mui-selected': {
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      },
                    },
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.1)',
                    },
                  },
                }}
              >
                <ToggleButton value="grid">
                  <Squares2X2Icon style={{ width: 20, height: 20 }} />
                </ToggleButton>
                <ToggleButton value="list">
                  <ListBulletIcon style={{ width: 20, height: 20 }} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          {/* Category Filters */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Kategoriler
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <CategoryChip
                  key={category.id}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span style={{ fontSize: '16px' }}>{category.icon}</span>
                      <span>{category.name}</span>
                    </Box>
                  }
                  onClick={() => handleCategoryFilter(category.id)}
                  active={filters.category === category.id}
                  color={category.color}
                  sx={{
                    background: filters.category === category.id 
                      ? `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`
                      : 'rgba(255, 255, 255, 0.8)',
                    color: filters.category === category.id ? 'white' : '#374151',
                    border: `1px solid ${filters.category === category.id ? category.color : 'rgba(255, 255, 255, 0.3)'}`,
                  }}
                />
              ))}
            </Box>
          </Box>
        </SearchCard>
      </motion.div>

      {/* Notes Grid/List */}
      <motion.div variants={itemVariants} style={{ marginTop: '32px' }}>
        <Card variant="glass" elevation="medium">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mr: 2 }}>
                Tüm Notlar
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
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              {notes?.length || 0} not
            </Typography>
          </Box>

          {isLoading ? (
            <Grid container spacing={3}>
              {[...Array(6)].map((_, index) => (
                <Grid item xs={12} sm={6} lg={4} key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderRadius: '20px' }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : notes && notes.length > 0 ? (
            <Grid container spacing={3}>
              {notes.map((note, index) => (
                <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} lg={viewMode === 'grid' ? 4 : 12} key={note._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <NoteCard viewMode={viewMode}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: viewMode === 'grid' ? 'flex-start' : 'center',
                        flexDirection: viewMode === 'grid' ? 'column' : 'row'
                      }}>
                        <Avatar
                          sx={{
                            width: viewMode === 'grid' ? 48 : 40,
                            height: viewMode === 'grid' ? 48 : 40,
                            background: `linear-gradient(135deg, ${getCategoryColor(note.category)}20 0%, ${getCategoryColor(note.category)}10 100%)`,
                            mr: viewMode === 'grid' ? 0 : 2,
                            mb: viewMode === 'grid' ? 2 : 0,
                            fontSize: viewMode === 'grid' ? '20px' : '16px'
                          }}
                        >
                          {getCategoryIcon(note.category)}
                        </Avatar>
                        
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            mb: 1,
                            flexDirection: viewMode === 'grid' ? 'column' : 'row',
                            alignItems: viewMode === 'grid' ? 'flex-start' : 'center'
                          }}>
                            <Typography 
                              variant={viewMode === 'grid' ? 'h6' : 'h6'} 
                              sx={{ 
                                fontWeight: 600, 
                                flex: 1,
                                textAlign: viewMode === 'grid' ? 'center' : 'left'
                              }}
                            >
                              {note.title}
                            </Typography>
                            {note.isPinned && (
                              <Tooltip title="Sabitlenmiş">
                                <StarIcon style={{ width: 16, height: 16, color: '#f59e0b', ml: 1 }} />
                              </Tooltip>
                            )}
                          </Box>
                          
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#6b7280', 
                              mb: 2, 
                              lineHeight: 1.5,
                              textAlign: viewMode === 'grid' ? 'center' : 'left'
                            }}
                          >
                            {note.content.substring(0, viewMode === 'grid' ? 100 : 150)}...
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: viewMode === 'grid' ? 'center' : 'space-between',
                            flexDirection: viewMode === 'grid' ? 'column' : 'row',
                            gap: viewMode === 'grid' ? 1 : 0
                          }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: 1,
                              flexDirection: viewMode === 'grid' ? 'column' : 'row'
                            }}>
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
                </Grid>
              ))}
            </Grid>
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

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        component={Link}
        to="/notes/create"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            transform: 'scale(1.1)',
          },
        }}
      >
        <PlusIcon style={{ width: 24, height: 24 }} />
      </Fab>
    </motion.div>
  );
};

export default Notes; 