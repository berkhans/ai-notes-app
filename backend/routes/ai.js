const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Initialize OpenAI function
const initializeOpenAI = () => {
  try {
    const OpenAI = require('openai');
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  } catch (error) {
    console.error('OpenAI initialization error:', error);
    return null;
  }
};

// @desc    Generate summary for note content
// @route   POST /api/ai/summarize
// @access  Private
router.post('/summarize', protect, [
  body('content')
    .trim()
    .isLength({ min: 10, max: 10000 })
    .withMessage('Content must be between 10 and 10000 characters')
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

    const openai = initializeOpenAI();
    if (!openai) {
      return res.status(500).json({ 
        error: 'AI service is not available. Please check configuration.' 
      });
    }

    const { content } = req.body;

    const prompt = `
    Aşağıdaki metni Türkçe olarak kısa ve öz bir şekilde özetle. 
    Özet maksimum 200 kelime olmalı ve ana fikirleri içermeli.
    
    Metin:
    ${content}
    
    Özet:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Sen bir metin özetleme uzmanısın. Verilen metni Türkçe olarak kısa ve öz bir şekilde özetlersin."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.3
    });

    const summary = completion.choices[0].message.content.trim();

    res.json({
      success: true,
      data: {
        summary,
        originalLength: content.length,
        summaryLength: summary.length
      }
    });
  } catch (error) {
    console.error('AI summarize error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: 'AI service quota exceeded. Please try again later.' 
      });
    }
    
    res.status(500).json({ 
      error: 'AI service error. Please try again later.' 
    });
  }
});

// @desc    Categorize note content
// @route   POST /api/ai/categorize
// @access  Private
router.post('/categorize', protect, [
  body('content')
    .trim()
    .isLength({ min: 10, max: 10000 })
    .withMessage('Content must be between 10 and 10000 characters')
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

    const openai = initializeOpenAI();
    if (!openai) {
      return res.status(500).json({ 
        error: 'AI service is not available. Please check configuration.' 
      });
    }

    const { content } = req.body;

    const prompt = `
    Aşağıdaki metni analiz et ve en uygun kategoriyi belirle.
    Kategoriler: İş, Eğitim, Kişisel, Sağlık, Teknoloji, Sanat, Spor, Seyahat, Yemek, Diğer
    
    Metin:
    ${content}
    
    Sadece kategori adını döndür:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Sen bir metin kategorilendirme uzmanısın. Verilen metni en uygun kategoriye sınıflandırırsın."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 50,
      temperature: 0.3
    });

    const category = completion.choices[0].message.content.trim();

    res.json({
      success: true,
      data: {
        category,
        originalLength: content.length
      }
    });
  } catch (error) {
    console.error('AI categorize error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: 'AI service quota exceeded. Please try again later.' 
      });
    }
    
    res.status(500).json({ 
      error: 'AI service error. Please try again later.' 
    });
  }
});

// @desc    Generate tags for note content
// @route   POST /api/ai/tags
// @access  Private
router.post('/tags', protect, [
  body('content')
    .trim()
    .isLength({ min: 10, max: 10000 })
    .withMessage('Content must be between 10 and 10000 characters')
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

    const openai = initializeOpenAI();
    if (!openai) {
      return res.status(500).json({ 
        error: 'AI service is not available. Please check configuration.' 
      });
    }

    const { content } = req.body;

    const prompt = `
    Aşağıdaki metni analiz et ve en uygun 3-5 etiketi belirle.
    Etiketler virgülle ayrılmış olmalı ve Türkçe olmalı.
    
    Metin:
    ${content}
    
    Etiketler:`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Sen bir etiket oluşturma uzmanısın. Verilen metin için uygun etiketler oluşturursun."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.3
    });

    const tagsText = completion.choices[0].message.content.trim();
    const tags = tagsText.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    res.json({
      success: true,
      data: {
        tags,
        originalLength: content.length
      }
    });
  } catch (error) {
    console.error('AI tags error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: 'AI service quota exceeded. Please try again later.' 
      });
    }
    
    res.status(500).json({ 
      error: 'AI service error. Please try again later.' 
    });
  }
});

module.exports = router; 