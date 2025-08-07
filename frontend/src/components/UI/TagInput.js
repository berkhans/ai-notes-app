import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus } from 'react-icons/fi';

const TagInput = ({ 
  tags = [], 
  onTagsChange, 
  placeholder = "Add tags...",
  maxTags = 10,
  showLabel = true,
  label = 'Tags'
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim().toLowerCase();
    
    if (trimmedValue && !tags.includes(trimmedValue) && tags.length < maxTags) {
      const newTags = [...tags, trimmedValue];
      onTagsChange(newTags);
      setInputValue('');
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    onTagsChange(newTags);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (inputValue.trim()) {
      addTag();
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="w-full">
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className={`relative border border-gray-200 rounded-lg p-2 transition-all duration-200 ${
        isFocused ? 'border-blue-500 ring-2 ring-blue-200' : 'hover:border-gray-300'
      }`}>
        <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
          {/* Tags */}
          <AnimatePresence>
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
              >
                <span>{tag}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeTag(index)}
                  className="ml-1 text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <FiX className="w-3 h-3" />
                </motion.button>
              </motion.span>
            ))}
          </AnimatePresence>

          {/* Input */}
          <div className="flex-1 min-w-[120px]">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder={tags.length === 0 ? placeholder : ''}
              className="w-full outline-none text-sm bg-transparent"
              disabled={tags.length >= maxTags}
            />
          </div>
        </div>

        {/* Add Button */}
        {inputValue.trim() && !tags.includes(inputValue.trim().toLowerCase()) && tags.length < maxTags && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={addTag}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Helper Text */}
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-gray-500">
          Press Enter or comma to add tags
        </p>
        <p className="text-xs text-gray-500">
          {tags.length}/{maxTags}
        </p>
      </div>

      {/* Suggestions */}
      {isFocused && inputValue && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto"
        >
          {tags
            .filter(tag => tag.includes(inputValue.toLowerCase()) && tag !== inputValue.toLowerCase())
            .map((tag, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputValue(tag);
                  inputRef.current?.focus();
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors"
              >
                {tag}
              </button>
            ))}
        </motion.div>
      )}
    </div>
  );
};

export default TagInput; 