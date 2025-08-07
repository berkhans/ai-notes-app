import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiPlus, FiSearch } from 'react-icons/fi';

const EmptyState = ({ 
  type = 'notes',
  title,
  description,
  actionText,
  onAction,
  showAction = true
}) => {
  const getDefaultContent = () => {
    switch (type) {
      case 'notes':
        return {
          icon: FiFileText,
          title: 'No notes yet',
          description: 'Create your first note to get started with AI-powered note-taking.',
          actionText: 'Create Note',
          actionIcon: FiPlus
        };
      case 'search':
        return {
          icon: FiSearch,
          title: 'No results found',
          description: 'Try adjusting your search terms or filters to find what you\'re looking for.',
          actionText: 'Clear Search',
          actionIcon: FiSearch
        };
      case 'archived':
        return {
          icon: FiFileText,
          title: 'No archived notes',
          description: 'Notes you archive will appear here for easy access.',
          actionText: 'View All Notes',
          actionIcon: FiFileText
        };
      case 'pinned':
        return {
          icon: FiFileText,
          title: 'No pinned notes',
          description: 'Pin important notes to keep them at the top of your list.',
          actionText: 'View All Notes',
          actionIcon: FiFileText
        };
      default:
        return {
          icon: FiFileText,
          title: 'No data available',
          description: 'There\'s nothing to display at the moment.',
          actionText: 'Refresh',
          actionIcon: FiFileText
        };
    }
  };

  const content = getDefaultContent();
  const IconComponent = content.icon;
  const ActionIconComponent = content.actionIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6"
      >
        <IconComponent className="w-10 h-10 text-gray-400" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-gray-900 mb-2"
      >
        {title || content.title}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 max-w-md mb-8"
      >
        {description || content.description}
      </motion.p>

      {showAction && onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <ActionIconComponent className="w-4 h-4" />
          {actionText || content.actionText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState; 