import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon,
  EnvelopeIcon,
  KeyIcon,
  Cog6ToothIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  BellIcon,
  PaintBrushIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { 
  UserIcon as UserIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  KeyIcon as KeyIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid
} from '@heroicons/react/24/solid';
import useAuthStore from '../../stores/authStore';

const Profile = () => {
  const { user, updateProfile, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    darkMode: false,
    language: 'tr'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in settings) {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      // Here you would call updateProfile(formData)
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
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

  const stats = [
    {
      title: 'Toplam Not',
      value: '24',
      description: 'Oluşturulan notlar',
      icon: SparklesIcon,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Sabitlenmiş',
      value: '5',
      description: 'Önemli notlar',
      icon: SparklesIcon,
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Arşivlenmiş',
      value: '8',
      description: 'Saklanan notlar',
      icon: SparklesIcon,
      gradient: 'from-gray-400 to-gray-600'
    }
  ];

  const menuItems = [
    {
      title: 'Hesap Ayarları',
      description: 'Profil bilgilerinizi düzenleyin',
      icon: UserIcon,
      iconSolid: UserIconSolid,
      action: () => setIsEditing(true)
    },
    {
      title: 'Bildirimler',
      description: 'Bildirim tercihlerinizi yönetin',
      icon: BellIcon,
      iconSolid: BellIcon,
      action: () => {}
    },
    {
      title: 'Güvenlik',
      description: 'Şifre ve güvenlik ayarları',
      icon: ShieldCheckIcon,
      iconSolid: ShieldCheckIcon,
      action: () => {}
    },
    {
      title: 'Görünüm',
      description: 'Tema ve görünüm ayarları',
      icon: PaintBrushIcon,
      iconSolid: PaintBrushIcon,
      action: () => {}
    }
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden"
      >
        <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12 animate-pulse animation-delay-2000"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <SparklesIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">Profil</h1>
                    <p className="text-purple-100 text-lg">
                      Hesap ayarlarınızı yönetin
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={logout}
                  className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl font-semibold border border-white/20"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                  <span>Çıkış Yap</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Info */}
      <motion.div
        variants={itemVariants}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Hesap Bilgileri
          </h2>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="flex items-start space-x-8">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
          </motion.div>

          {/* User Details */}
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-6 py-4 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 bg-white/50 backdrop-blur-sm shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-6 py-4 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 bg-white/50 backdrop-blur-sm shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mevcut Şifre
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 pr-12 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 bg-white/50 backdrop-blur-sm shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Yeni Şifre
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 bg-white/50 backdrop-blur-sm shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Şifre Tekrar
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 bg-white/50 backdrop-blur-sm shadow-sm"
                    />
                  </div>
                </motion.div>
              )}

              <div className="flex items-center space-x-4 pt-4">
                {isEditing ? (
                  <>
                    <motion.button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl font-semibold disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Kaydediliyor...</span>
                        </>
                      ) : (
                        <>
                          <CheckIcon className="h-5 w-5" />
                          <span>Kaydet</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all duration-300 font-semibold"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <XMarkIcon className="h-5 w-5" />
                      <span>İptal</span>
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Cog6ToothIcon className="h-5 w-5" />
                    <span>Düzenle</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.title}
            variants={itemVariants}
            className="group"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm font-semibold">{stat.title}</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Settings Menu */}
      <motion.div
        variants={itemVariants}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ayarlar
          </h2>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Cog6ToothIcon className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.title}
              onClick={item.action}
              className="group text-left p-6 bg-white/50 backdrop-blur-sm rounded-2xl hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-200/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors duration-200" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Quick Settings */}
        <div className="mt-8 pt-8 border-t border-gray-200/50">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Hızlı Ayarlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.label
              className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleInputChange}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <BellIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Bildirimler</p>
                  <p className="text-sm text-gray-500">Push bildirimleri al</p>
                </div>
              </div>
            </motion.label>

            <motion.label
              className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="checkbox"
                name="emailUpdates"
                checked={settings.emailUpdates}
                onChange={handleInputChange}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                  <EnvelopeIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">E-posta Güncellemeleri</p>
                  <p className="text-sm text-gray-500">Haftalık özet al</p>
                </div>
              </div>
            </motion.label>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Profile; 