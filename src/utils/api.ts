import { Video } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const videoAPI = {
  async getVideos(): Promise<Video[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/videos`);
      return await response.json();
    } catch (error) {
      console.error('获取视频列表失败:', error);
      return [];
    }
  },

  async getVideo(id: string): Promise<Video | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/videos/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('获取视频详情失败:', error);
      return null;
    }
  },

  async uploadVideo(formData: FormData): Promise<{ success: boolean; video?: Video; error?: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/videos/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('上传失败:', error);
      return { success: false, error: '上传失败，请检查服务器连接' };
    }
  },

  async deleteVideo(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/videos/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('删除失败:', error);
      return false;
    }
  },

  async addView(id: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/api/videos/${id}/views`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('更新播放次数失败:', error);
    }
  },

  getVideoUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `${API_BASE_URL}${path}`;
  }
};
