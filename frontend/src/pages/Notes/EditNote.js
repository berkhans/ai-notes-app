import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FiSave, 
  FiZap, 
  FiTag, 
  FiStar, 
  FiX,
  FiLoader
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import useNotesStore from '../../stores/notesStore';
import aiService from '../../services/aiService';

const EditNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentNote, getNote, updateNote, isLoading } = useNotesStore();
  const [isSaving, setIsSaving] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm();

  const content = watch('content', '');

  useEffect(() => {
    if (id) {
      getNote(id);
    }
  }, [id, getNote]);

  useEffect(() => {
    if (currentNote) {
      setValue('title', currentNote.title);
      setValue('content', currentNote.content);
      setValue('summary', currentNote.summary || '');
      setValue('category', currentNote.category);
      setValue('tags', currentNote.tags?.join(', ') || '');
      setValue('color', currentNote.color);
      setValue('isPinned', currentNote.isPinned);
    }
  }, [currentNote, setValue]);

  const handleAiProcess = async () => {
    if (!content || content.length < 10) {
      toast.error('AI işlemi için en az 10 karakter gerekli');
      return;
    }

    setIsAiProcessing(true);
    try {
      const result = await aiService.processNote(content);
      
      if (result.success) {
        setValue('summary', result.data.summary);
        setValue('category', result.data.category);
        setValue('tags', result.data.tags.join(', '));
        
        toast.success('AI işlemi tamamlandı!');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAiProcessing(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const noteData = {
        title: data.title,
        content: data.content,
        summary: data.summary,
        category: data.category || 'other',
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        color: data.color || '#ffffff',
        isPinned: data.isPinned || false
      };

      await updateNote(id, noteData);
      toast.success('Not başarıyla güncellendi!');
      navigate(`/notes/${id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const categories = [
    { value: 'personal', label: 'Kişisel', icon: '👤' },
    { value: 'work', label: 'İş', icon: '💼' },
    { value: 'education', label: 'Eğitim', icon: '📚' },
    { value: 'health', label: 'Sağlık', icon: '🏥' },
    { value: 'finance', label: 'Finans', icon: '💰' },
    { value: 'travel', label: 'Seyahat', icon: '✈️' },
    { value: 'other', label: 'Diğer', icon: '📝' }
  ];

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Not yükleniyor...</p>
      </div>
    );
  }

  if (!currentNote) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Not Bulunamadı</h3>
        <p className="text-gray-600 mb-6">Düzenlenecek not bulunamadı</p>
        <button
          onClick={() => navigate('/notes')}
          className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <FiX size={16} />
          <span>Notlara Dön</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notu Düzenle</h1>
          <p className="text-gray-600">Notunuzu güncelleyin ve AI ile iyileştirin</p>
        </div>
        
        <button
          onClick={() => navigate(`/notes/${id}`)}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiX size={24} />
        </button>
      </motion.div>

      {/* AI Processing Button */}
      {content.length > 10 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-4 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold mb-1">🤖 AI Asistan</h3>
              <p className="text-purple-100 text-sm">
                Notunuzu AI ile yeniden özetleyin, kategorize edin ve etiketleyin
              </p>
            </div>
            <button
              onClick={handleAiProcess}
              disabled={isAiProcessing}
              className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-200 disabled:opacity-50"
            >
              {isAiProcessing ? (
                <>
                  <FiLoader className="animate-spin" size={16} />
                  <span>İşleniyor...</span>
                </>
              ) : (
                <>
                  <FiZap size={16} />
                  <span>AI ile Güncelle</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Başlık *
          </label>
          <input
            type="text"
            id="title"
            {...register('title', {
              required: 'Başlık gereklidir',
              maxLength: {
                value: 100,
                message: 'Başlık en fazla 100 karakter olabilir'
              }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            placeholder="Not başlığını girin..."
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            İçerik *
          </label>
          <textarea
            id="content"
            rows={8}
            {...register('content', {
              required: 'İçerik gereklidir',
              minLength: {
                value: 10,
                message: 'İçerik en az 10 karakter olmalıdır'
              },
              maxLength: {
                value: 10000,
                message: 'İçerik en fazla 10000 karakter olabilir'
              }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
            placeholder="Notunuzu buraya yazın..."
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
          )}
          <div className="text-xs text-gray-500 mt-1">
            {content.length}/10000 karakter
          </div>
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
            Özet
          </label>
          <textarea
            id="summary"
            rows={3}
            {...register('summary', {
              maxLength: {
                value: 500,
                message: 'Özet en fazla 500 karakter olabilir'
              }
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors resize-none"
            placeholder="Notunuzun kısa özeti..."
          />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>
          )}
        </div>

        {/* Category and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              id="category"
              {...register('category')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              <FiTag className="inline mr-1" size={14} />
              Etiketler
            </label>
            <input
              type="text"
              id="tags"
              {...register('tags')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              placeholder="etiket1, etiket2, etiket3"
            />
            <p className="text-xs text-gray-500 mt-1">
              Etiketleri virgülle ayırın
            </p>
          </div>
        </div>

        {/* Color and Pin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Color */}
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
              Renk
            </label>
            <input
              type="color"
              id="color"
              {...register('color')}
              className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          {/* Pin */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isPinned"
              {...register('isPinned')}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="isPinned" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FiStar size={16} />
              <span>Sabitle</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate(`/notes/${id}`)}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <FiLoader className="animate-spin" size={18} />
                <span>Güncelleniyor...</span>
              </>
            ) : (
              <>
                <FiSave size={18} />
                <span>Değişiklikleri Kaydet</span>
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default EditNote; 