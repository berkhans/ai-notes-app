const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [10000, 'Content cannot be more than 10000 characters']
  },
  summary: {
    type: String,
    maxlength: [500, 'Summary cannot be more than 500 characters']
  },
  category: {
    type: String,
    enum: ['personal', 'work', 'education', 'health', 'finance', 'travel', 'other'],
    default: 'other'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot be more than 20 characters']
  }],
  isPinned: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  aiGenerated: {
    summary: {
      type: Boolean,
      default: false
    },
    category: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Boolean,
      default: false
    }
  },
  color: {
    type: String,
    default: '#ffffff',
    match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better search performance
noteSchema.index({ user: 1, createdAt: -1 });
noteSchema.index({ user: 1, title: 'text', content: 'text' });
noteSchema.index({ user: 1, category: 1 });
noteSchema.index({ user: 1, tags: 1 });

// Virtual for formatted date
noteSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for reading time (approximate)
noteSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(' ').length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
});

// Pre-save middleware to clean tags
noteSchema.pre('save', function(next) {
  if (this.tags) {
    this.tags = this.tags
      .filter(tag => tag.trim().length > 0)
      .map(tag => tag.trim().toLowerCase())
      .filter((tag, index, arr) => arr.indexOf(tag) === index); // Remove duplicates
  }
  next();
});

module.exports = mongoose.model('Note', noteSchema); 