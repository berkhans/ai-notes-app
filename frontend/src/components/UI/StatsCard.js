import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'increase', 
  icon: Icon,
  color = 'blue',
  isLoading = false
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      iconBg: 'bg-green-100'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      iconBg: 'bg-purple-100'
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
      iconBg: 'bg-orange-100'
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-200',
      iconBg: 'bg-red-100'
    }
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`p-6 rounded-xl border ${colors.border} ${colors.bg} hover:shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          
          {isLoading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900 mb-2">
              {value}
            </p>
          )}

          {change && (
            <div className="flex items-center gap-1">
              {changeType === 'increase' ? (
                <FiTrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <FiTrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            </div>
          )}
        </div>

        {Icon && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`w-12 h-12 rounded-lg ${colors.iconBg} flex items-center justify-center`}
          >
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard; 