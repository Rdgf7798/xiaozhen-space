import { create } from 'zustand';
import { Video } from '../types';
import { videoAPI } from '../utils/api';

interface VideoState {
  videos: Video[];
  loading: boolean;
  error: string | null;
  fetchVideos: () => Promise<void>;
  addVideo: (video: Video) => void;
  deleteVideo: (id: string) => Promise<void>;
  getVideoById: (id: string) => Video | undefined;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  loading: false,
  error: null,

  fetchVideos: async () => {
    set({ loading: true, error: null });
    try {
      const videos = await videoAPI.getVideos();
      set({ videos, loading: false });
    } catch (error) {
      set({ error: '获取视频列表失败', loading: false });
    }
  },

  addVideo: (video: Video) => {
    set((state) => ({
      videos: [...state.videos, video]
    }));
  },

  deleteVideo: async (id: string) => {
    const success = await videoAPI.deleteVideo(id);
    if (success) {
      set((state) => ({
        videos: state.videos.filter(v => v.id !== id)
      }));
    }
  },

  getVideoById: (id: string) => {
    return get().videos.find(v => v.id === id);
  }
}));
