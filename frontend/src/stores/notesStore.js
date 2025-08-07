import { create } from 'zustand';
import api from '../services/api';

// Mock data for development
const mockNotes = [
  {
    _id: '1',
    title: 'React Hooks Kullanımı',
    content: 'React hooks ile state yönetimi ve side effects nasıl yapılır. useState, useEffect, useContext gibi temel hooks\'ların kullanımı.',
    category: 'education',
    tags: ['react', 'javascript', 'hooks'],
    isPinned: true,
    isArchived: false,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    _id: '2',
    title: 'Proje Planlaması',
    content: 'Bu hafta yapılacak işler: 1. Frontend tasarımını tamamla 2. Backend API\'lerini test et 3. Database şemasını güncelle',
    category: 'work',
    tags: ['planlama', 'proje', 'iş'],
    isPinned: false,
    isArchived: false,
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T09:15:00Z'
  },
  {
    _id: '3',
    title: 'Alışveriş Listesi',
    content: 'Market alışverişi: Süt, ekmek, yumurta, domates, salatalık, peynir, zeytin',
    category: 'personal',
    tags: ['alışveriş', 'market'],
    isPinned: false,
    isArchived: false,
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z'
  },
  {
    _id: '4',
    title: 'Fitness Rutini',
    content: 'Günlük egzersiz programı: 30 dakika kardiyo, 20 dakika ağırlık, 10 dakika esneme',
    category: 'health',
    tags: ['fitness', 'egzersiz', 'sağlık'],
    isPinned: true,
    isArchived: false,
    createdAt: '2024-01-12T07:20:00Z',
    updatedAt: '2024-01-12T07:20:00Z'
  },
  {
    _id: '5',
    title: 'Bütçe Planlaması',
    content: 'Aylık gelir: 8000 TL, Giderler: Kira 3000 TL, Market 1500 TL, Ulaşım 500 TL, Eğlence 1000 TL',
    category: 'finance',
    tags: ['bütçe', 'finans', 'planlama'],
    isPinned: false,
    isArchived: false,
    createdAt: '2024-01-11T14:30:00Z',
    updatedAt: '2024-01-11T14:30:00Z'
  }
];

const mockStats = {
  totalNotes: 5,
  pinnedNotes: 2,
  archivedNotes: 0,
  categoryStats: [
    { _id: 'personal', count: 1 },
    { _id: 'work', count: 1 },
    { _id: 'education', count: 1 },
    { _id: 'health', count: 1 },
    { _id: 'finance', count: 1 }
  ]
};

const useNotesStore = create((set, get) => ({
  notes: mockNotes,
  currentNote: null,
  isLoading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    tags: '',
    isArchived: false
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: mockNotes.length,
    itemsPerPage: 10
  },
  stats: mockStats,

  // Get all notes
  getNotes: async (params = {}) => {
    set({ isLoading: true, error: null });
    try {
      // For development, return mock data
      setTimeout(() => {
        set({
          notes: mockNotes,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: mockNotes.length,
            itemsPerPage: 10
          },
          isLoading: false,
          error: null
        });
      }, 500);
      
      return mockNotes;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Notlar yüklenirken bir hata oluştu';
      set({
        isLoading: false,
        error: errorMessage
      });
      throw new Error(errorMessage);
    }
  },

  // Get single note
  getNote: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const note = mockNotes.find(note => note._id === id);
      if (!note) {
        throw new Error('Not bulunamadı');
      }
      
      set({
        currentNote: note,
        isLoading: false,
        error: null
      });
      
      return note;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Not yüklenirken bir hata oluştu';
      set({
        isLoading: false,
        error: errorMessage
      });
      throw new Error(errorMessage);
    }
  },

  // Create note
  createNote: async (noteData) => {
    set({ isLoading: true, error: null });
    try {
      const newNote = {
        _id: Date.now().toString(),
        ...noteData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      set(state => ({
        notes: [newNote, ...state.notes],
        isLoading: false,
        error: null
      }));
      
      return newNote;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Not oluşturulurken bir hata oluştu';
      set({
        isLoading: false,
        error: errorMessage
      });
      throw new Error(errorMessage);
    }
  },

  // Update note
  updateNote: async (id, noteData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedNote = {
        ...mockNotes.find(note => note._id === id),
        ...noteData,
        updatedAt: new Date().toISOString()
      };
      
      set(state => ({
        notes: state.notes.map(note => 
          note._id === id ? updatedNote : note
        ),
        currentNote: state.currentNote?._id === id ? updatedNote : state.currentNote,
        isLoading: false,
        error: null
      }));
      
      return updatedNote;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Not güncellenirken bir hata oluştu';
      set({
        isLoading: false,
        error: errorMessage
      });
      throw new Error(errorMessage);
    }
  },

  // Delete note
  deleteNote: async (id) => {
    set({ isLoading: true, error: null });
    try {
      set(state => ({
        notes: state.notes.filter(note => note._id !== id),
        currentNote: state.currentNote?._id === id ? null : state.currentNote,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Not silinirken bir hata oluştu';
      set({
        isLoading: false,
        error: errorMessage
      });
      throw new Error(errorMessage);
    }
  },

  // Toggle pin status
  togglePin: async (id) => {
    try {
      set(state => ({
        notes: state.notes.map(note => 
          note._id === id ? { ...note, isPinned: !note.isPinned } : note
        ),
        currentNote: state.currentNote?._id === id 
          ? { ...state.currentNote, isPinned: !state.currentNote.isPinned }
          : state.currentNote
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Pin durumu değiştirilirken bir hata oluştu';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  // Toggle archive status
  toggleArchive: async (id) => {
    try {
      set(state => ({
        notes: state.notes.map(note => 
          note._id === id ? { ...note, isArchived: !note.isArchived } : note
        ),
        currentNote: state.currentNote?._id === id 
          ? { ...state.currentNote, isArchived: !state.currentNote.isArchived }
          : state.currentNote
      }));
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Arşiv durumu değiştirilirken bir hata oluştu';
      set({ error: errorMessage });
      throw new Error(errorMessage);
    }
  },

  // Get note statistics
  getStats: async () => {
    try {
      set({ stats: mockStats });
      return mockStats;
    } catch (error) {
      console.error('Stats error:', error);
    }
  },

  // Update filters
  updateFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, currentPage: 1 }
    }));
  },

  // Clear filters
  clearFilters: () => {
    set({
      filters: {
        search: '',
        category: '',
        tags: '',
        isArchived: false
      },
      pagination: { ...get().pagination, currentPage: 1 }
    });
  },

  // Clear current note
  clearCurrentNote: () => {
    set({ currentNote: null });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  }
}));

export default useNotesStore; 