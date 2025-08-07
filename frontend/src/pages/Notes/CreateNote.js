import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon,
  SparklesIcon,
  DocumentTextIcon,
  TagIcon,
  ArchiveBoxIcon,
  StarIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
  LightBulbIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { 
  PlusIcon as PlusIconSolid,
  SparklesIcon as SparklesIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  TagIcon as TagIconSolid,
  ArchiveBoxIcon as ArchiveBoxIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';
import useNotesStore from '../../stores/notesStore';
import useAuthStore from '../../stores/authStore';

const CreateNote = () => {
  const navigate = useNavigate();
  const { createNote } = useNotesStore();
  const { user } = useAuthStore();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'personal',
    tags: [],
    isPinned: false,
    isArchived: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const categories = [
    { id: 'personal', name: 'Kişisel', icon: '👤', color: 'from-blue-500 to-purple-600' },
    { id: 'work', name: 'İş', icon: '💼', color: 'from-green-500 to-emerald-600' },
    { id: 'education', name: 'Eğitim', icon: '📚', color: 'from-purple-500 to-indigo-600' },
    { id: 'health', name: 'Sağlık', icon: '🏥', color: 'from-red-500 to-pink-600' },
    { id: 'finance', name: 'Finans', icon: '💰', color: 'from-yellow-500 to-orange-600' },
    { id: 'travel', name: 'Seyahat', icon: '✈️', color: 'from-indigo-500 to-blue-600' },
    { id: 'other', name: 'Diğer', icon: '📝', color: 'from-gray-500 to-gray-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await createNote(formData);
      navigate('/notes');
    } catch (error) {
      console.error('Error creating note:', error);
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
                    <h1 className="text-4xl font-bold">Yeni Not Oluştur</h1>
                    <p className="text-purple-100 text-lg">
                      AI destekli not alma deneyimi
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
                  onClick={() => navigate('/notes')}
                  className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl font-semibold border border-white/20"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span>Geri Dön</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        variants={itemVariants}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200/50"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Not Detayları
          </h2>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <DocumentTextIcon className="h-6 w-6 text-white" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Başlık
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Not başlığını girin..."
              className="w-full px-6 py-4 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 bg-white/50 backdrop-blur-sm shadow-sm text-lg font-medium"
              required
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              İçerik
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Not içeriğinizi buraya yazın..."
              rows={12}
              className="w-full px-6 py-4 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 bg-white/50 backdrop-blur-sm shadow-sm resize-none text-base leading-relaxed"
              required
            />
          </motion.div>

          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Kategori
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                  className={`p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    formData.category === category.id
                      ? `bg-gradient-to-br ${category.color} text-white border-transparent shadow-lg`
                      : 'bg-white/50 backdrop-blur-sm text-gray-700 border-gray-200/50 hover:bg-white/80'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center space-y-2">
                    <span className="text-2xl">{category.icon}</span>
                    <p className="font-semibold text-sm">{category.name}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Etiketler
            </label>
            <div className="space-y-4">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInput}
                placeholder="Etiket eklemek için yazın ve Enter'a basın..."
                className="w-full px-6 py-4 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 bg-white/50 backdrop-blur-sm shadow-sm"
              />
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-xl border border-purple-200"
                    >
                      <TagIcon className="h-4 w-4" />
                      <span className="font-medium text-sm">{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-purple-500 hover:text-purple-700 transition-colors duration-200"
                      >
                        ×
                      </button>
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Seçenekler
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.label
                className="flex items-center space-x-4 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:bg-white/80 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="checkbox"
                  name="isPinned"
                  checked={formData.isPinned}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <StarIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sabitle</p>
                    <p className="text-sm text-gray-500">Önemli not olarak işaretle</p>
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
                  name="isArchived"
                  checked={formData.isArchived}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center">
                    <ArchiveBoxIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Arşivle</p>
                    <p className="text-sm text-gray-500">Arşivlenmiş not olarak kaydet</p>
                  </div>
                </div>
              </motion.label>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-between pt-6"
          >
            <button
              type="button"
              onClick={() => navigate('/notes')}
              className="flex items-center space-x-3 px-6 py-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all duration-300 font-semibold"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>İptal</span>
            </button>

            <button
              type="submit"
              disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Oluşturuluyor...</span>
                </>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-5 w-5" />
                  <span>Notu Oluştur</span>
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreateNote; 