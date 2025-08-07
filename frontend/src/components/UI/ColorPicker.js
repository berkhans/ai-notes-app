import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiPalette } from 'react-icons/fi';

const ColorPicker = ({ 
  selectedColor, 
  onColorChange, 
  colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // yellow
    '#ef4444', // red
    '#8b5cf6', // purple
    '#f97316', // orange
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#ec4899', // pink
    '#6b7280', // gray
  ],
  showLabel = true,
  label = 'Color'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getColorName = (color) => {
    const colorMap = {
      '#3b82f6': 'Blue',
      '#10b981': 'Green',
      '#f59e0b': 'Yellow',
      '#ef4444': 'Red',
      '#8b5cf6': 'Purple',
      '#f97316': 'Orange',
      '#06b6d4': 'Cyan',
      '#84cc16': 'Lime',
      '#ec4899': 'Pink',
      '#6b7280': 'Gray'
    };
    return colorMap[color] || 'Custom';
  };

  return (
    <div className="relative">
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-3">
        {/* Selected Color Display */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div 
            className="w-6 h-6 rounded-full border-2 border-gray-200"
            style={{ backgroundColor: selectedColor || '#3b82f6' }}
          />
          <span className="text-sm text-gray-700">
            {getColorName(selectedColor || '#3b82f6')}
          </span>
          <FiPalette className="w-4 h-4 text-gray-400" />
        </motion.button>

        {/* Color Palette */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
            >
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      onColorChange(color);
                      setIsOpen(false);
                    }}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color 
                        ? 'border-gray-400 scale-110' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    title={getColorName(color)}
                  >
                    {selectedColor === color && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <FiCheck className="w-4 h-4 text-white drop-shadow-sm" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              
              {/* Custom Color Input */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={selectedColor || '#3b82f6'}
                    onChange={(e) => onColorChange(e.target.value)}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                  />
                  <span className="text-xs text-gray-500">Custom</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay to close when clicking outside */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ColorPicker; 