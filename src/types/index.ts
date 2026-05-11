export type Category = 'movie' | 'anime' | 'documentary';

export interface Video {
  id: string;
  title: string;
  description: string;
  category: Category;
  duration: string;
  coverUrl: string;
  videoUrl: string;
  uploadTime: string;
  views: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export interface VideoState {
  videos: Video[];
  addVideo: (video: Video) => void;
  deleteVideo: (id: string) => void;
  getVideoById: (id: string) => Video | undefined;
}

export interface UploadState {
  isUploading: boolean;
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
  setIsUploading: (uploading: boolean) => void;
}
