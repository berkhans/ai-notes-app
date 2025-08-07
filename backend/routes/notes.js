const express = require('express');
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all notes for user
// @route   GET /api/notes
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      category = '',
      tags = '',
      sortBy = 'createdAt',
      sortOrder = 'desc',
      isArchived = false
    } = req.query;

    // Build query
    const query = { user: req.user._id, isArchived: isArchived === 'true' };

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Tags filter
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
      query.tags = { $in: tagArray };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const notes = await Note.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email');

    // Get total count for pagination
    const total = await Note.countDocuments(query);

    res.json({
      success: true,
      data: notes,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
      .populate('user', 'name email');

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Create new note
// @route   POST /api/notes
// @access  Private
router.post('/', protect, [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title is required and must be less than 100 characters'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content is required and must be less than 10000 characters'),
  body('category')
    .optional()
    .isIn(['personal', 'work', 'education', 'health', 'finance', 'travel', 'other'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Color must be a valid hex color')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { title, content, summary, category, tags, color, isPinned } = req.body;

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      summary,
      category: category || 'other',
      tags: tags || [],
      color: color || '#ffffff',
      isPinned: isPinned || false
    });

    const populatedNote = await Note.findById(note._id)
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      data: populatedNote
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Private
router.put('/:id', protect, [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be less than 100 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content must be less than 10000 characters'),
  body('category')
    .optional()
    .isIn(['personal', 'work', 'education', 'health', 'finance', 'travel', 'other'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('color')
    .optional()
    .matches(/^#[0-9A-F]{6}$/i)
    .withMessage('Color must be a valid hex color')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errors.array()
      });
    }

    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, content, summary, category, tags, color, isPinned, isArchived } = req.body;

    // Update fields
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (summary !== undefined) note.summary = summary;
    if (category !== undefined) note.category = category;
    if (tags !== undefined) note.tags = tags;
    if (color !== undefined) note.color = color;
    if (isPinned !== undefined) note.isPinned = isPinned;
    if (isArchived !== undefined) note.isArchived = isArchived;

    const updatedNote = await note.save();
    const populatedNote = await Note.findById(updatedNote._id)
      .populate('user', 'name email');

    res.json({
      success: true,
      data: populatedNote
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await note.remove();

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Toggle pin status
// @route   PATCH /api/notes/:id/pin
// @access  Private
router.patch('/:id/pin', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Toggle pin error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Toggle archive status
// @route   PATCH /api/notes/:id/archive
// @access  Private
router.patch('/:id/archive', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    note.isArchived = !note.isArchived;
    await note.save();

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Toggle archive error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @desc    Get note statistics
// @route   GET /api/notes/stats
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Note.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalNotes: { $sum: 1 },
          pinnedNotes: { $sum: { $cond: ['$isPinned', 1, 0] } },
          archivedNotes: { $sum: { $cond: ['$isArchived', 1, 0] } },
          categories: { $addToSet: '$category' }
        }
      }
    ]);

    const categoryStats = await Note.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        ...stats[0],
        categoryStats
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 