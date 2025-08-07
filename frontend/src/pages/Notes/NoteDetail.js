import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiEdit, 
  FiTrash2, 
  FiStar, 
  FiArchive, 
  FiArrowLeft,
  FiClock,
  FiTag,
  FiZap
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import useNotesStore from '../../stores/notesStore';

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentNote, getNote, deleteNote, togglePin, toggleArchive, isLoading } = useNotesStore();

  useEffect(() => {
    if (id) {
      getNote(id);
    }
  }, [id, getNote]);

  const handleDelete = async () => {
    if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      try {
        await deleteNote(id);
        toast.success('Not başarıyla silindi');
        navigate('/notes');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleTogglePin = async () => {
    try {
      await togglePin(id);
      toast.success(currentNote?.isPinned ? 'Not sabitleme kaldırıldı' : 'Not sabitlendi');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleToggleArchive = async () => {
    try {
      await toggleArchive(id);
      toast.success(currentNote?.isArchived ? 'Not arşivden çıkarıldı' : 'Not arşivlendi');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      personal: 'bg-blue-100 text-blue-800',
      work: 'bg-green-100 text-green-800',
      education: 'bg-purple-100 text-purple-800',
      health: 'bg-red-100 text-red-800',
      finance: 'bg-yellow-100 text-yellow-800',
      travel: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800'
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
        <p className="text-gray-600 mb-6">Aradığınız not mevcut değil</p>
        <Link
          to="/notes"
          className="inline-flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <FiArrowLeft size={16} />
          <span>Notlara Dön</span>
        </Link>
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
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/notes')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{currentNote.title}</h1>
            <p className="text-gray-600">
              {new Date(currentNote.createdAt).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleTogglePin}
            className={`p-2 rounded-lg transition-colors ${
              currentNote.isPinned 
                ? 'bg-yellow-100 text-yellow-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={currentNote.isPinned ? 'Sabitlemeyi kaldır' : 'Sabitle'}
          >
            <FiStar size={20} />
          </button>
          
          <button
            onClick={handleToggleArchive}
            className={`p-2 rounded-lg transition-colors ${
              currentNote.isArchived 
                ? 'bg-gray-100 text-gray-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={currentNote.isArchived ? 'Arşivden çıkar' : 'Arşivle'}
          >
            <FiArchive size={20} />
          </button>
          
          <Link
            to={`/notes/${id}/edit`}
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            title="Düzenle"
          >
            <FiEdit size={20} />
          </Link>
          
          <button
            onClick={handleDelete}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            title="Sil"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </motion.div>

      {/* Note Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        style={{ borderLeft: `4px solid ${currentNote.color}` }}
      >
        {/* Note Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{getCategoryIcon(currentNote.category)}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentNote.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className={`px-3 py-1 rounded-full font-medium ${getCategoryColor(currentNote.category)}`}>
                    {currentNote.category}
                  </span>
                  <span className="flex items-center">
                    <FiClock size={14} className="mr-1" />
                    {currentNote.readingTime} dk okuma
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              {currentNote.isPinned && (
                <FiStar className="text-yellow-500" size={20} />
              )}
              {currentNote.isArchived && (
                <FiArchive className="text-gray-500" size={20} />
              )}
            </div>
          </div>

          {/* Tags */}
          {currentNote.tags && currentNote.tags.length > 0 && (
            <div className="flex items-center space-x-2">
              <FiTag size={16} className="text-gray-500" />
              <div className="flex flex-wrap gap-2">
                {currentNote.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Note Content */}
        <div className="p-6">
          {/* Summary */}
          {currentNote.summary && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-center space-x-2 mb-2">
                <FiZap size={16} className="text-purple-600" />
                <h3 className="font-semibold text-purple-900">AI Özeti</h3>
              </div>
              <p className="text-gray-700">{currentNote.summary}</p>
            </div>
          )}

          {/* Content */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {currentNote.content}
            </div>
          </div>
        </div>

        {/* Note Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>
                Oluşturulma: {new Date(currentNote.createdAt).toLocaleDateString('tr-TR')}
              </span>
              {currentNote.updatedAt !== currentNote.createdAt && (
                <span>
                  Güncellenme: {new Date(currentNote.updatedAt).toLocaleDateString('tr-TR')}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {currentNote.aiGenerated?.summary && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                  AI Özeti
                </span>
              )}
              {currentNote.aiGenerated?.category && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                  AI Kategori
                </span>
              )}
              {currentNote.aiGenerated?.tags && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  AI Etiketler
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NoteDetail; 