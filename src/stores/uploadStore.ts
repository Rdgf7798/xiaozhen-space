import { create } from 'zustand';

interface UploadState {
  isUploading: boolean;
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
  setIsUploading: (uploading: boolean) => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  isUploading: false,
  uploadProgress: 0,
  setUploadProgress: (progress: number) => set({ uploadProgress: progress }),
  setIsUploading: (uploading: boolean) => set({ isUploading: uploading })
}));
