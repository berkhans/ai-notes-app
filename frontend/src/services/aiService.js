import api from './api';

const aiService = {
  // Generate summary
  summarize: async (content) => {
    try {
      const response = await api.post('/ai/summarize', { content });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Özet oluşturulurken bir hata oluştu');
    }
  },

  // Categorize content
  categorize: async (content) => {
    try {
      const response = await api.post('/ai/categorize', { content });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Kategorilendirme yapılırken bir hata oluştu');
    }
  },

  // Generate tags
  generateTags: async (content) => {
    try {
      const response = await api.post('/ai/tags', { content });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Etiketler oluşturulurken bir hata oluştu');
    }
  },

  // Process note with AI (summary, category, tags)
  processNote: async (content) => {
    try {
      const response = await api.post('/ai/process', { content });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'AI işlemi sırasında bir hata oluştu');
    }
  },

  // Get AI service status
  getStatus: async () => {
    try {
      const response = await api.get('/ai/status');
      return response.data;
    } catch (error) {
      console.error('AI status error:', error);
      return { success: false, data: { available: false } };
    }
  }
};

export default aiService; 