import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  FiClock, 
  FiTag, 
  FiPin, 
  FiArchive, 
  FiEdit3, 
  FiTrash2,
  FiEye
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onEdit, onDelete, onTogglePin, onToggleArchive }) => {
  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
      style={{
        borderLeft: note.color ? `4px solid ${note.color}` : '4px solid #3b82f6'
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {note.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FiClock className="w-4 h-4" />
                <span>{formatDate(note.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                <span>{getReadingTime(note.content)}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 ml-4">
            {note.isPinned && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onTogglePin(note._id)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Unpin note"
              >
                <FiPin className="w-4 h-4" />
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTogglePin(note._id)}
              className={`p-2 rounded-lg transition-colors ${
                note.isPinned 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
              }`}
              title={note.isPinned ? "Unpin note" : "Pin note"}
            >
              <FiPin className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="text-gray-600 line-clamp-3">
            {truncateText(note.content)}
          </p>
        </div>

        {/* Summary */}
        {note.summary && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">AI Summary:</p>
            <p className="text-sm text-blue-700 mt-1">{note.summary}</p>
          </div>
        )}

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1 mb-2">
              <FiTag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {note.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {note.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                  +{note.tags.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Category */}
        {note.category && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
              {note.category}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Link
              to={`/notes/${note._id}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FiEye className="w-4 h-4" />
              View
            </Link>
            
            <button
              onClick={() => onEdit(note._id)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <FiEdit3 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleArchive(note._id)}
              className={`p-2 rounded-lg transition-colors ${
                note.isArchived 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-gray-400 hover:text-orange-600 hover:bg-orange-50'
              }`}
              title={note.isArchived ? "Unarchive note" : "Archive note"}
            >
              <FiArchive className="w-4 h-4" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(note._id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete note"
            >
              <FiTrash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard; 