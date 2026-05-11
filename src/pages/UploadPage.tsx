import { useState, useRef, useCallback } from 'react';
import { Upload, X, Play, Trash2, Film } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useVideoStore } from '../stores/videoStore';
import { useUploadStore } from '../stores/uploadStore';
import { Navbar } from '../components/layout/Navbar';
import { CategoryTag } from '../components/common/CategoryTag';
import { Category, Video } from '../types';

export const UploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('movie');
  const [coverUrl, setCoverUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { videos, addVideo, deleteVideo } = useVideoStore();
  const { isUploading, uploadProgress, setUploadProgress, setIsUploading } = useUploadStore();
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!title.trim()) {
      alert('请输入视频标题');
      return;
    }

    if (!videoUrl.trim() && !selectedFile) {
      alert('请提供视频URL或选择视频文件');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    let finalVideoUrl = videoUrl;
    
    if (selectedFile) {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }
      finalVideoUrl = URL.createObjectURL(selectedFile);
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      title,
      description: description || '暂无描述',
      category,
      duration: '00:00:00',
      coverUrl: coverUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop',
      videoUrl: finalVideoUrl,
      uploadTime: new Date().toISOString(),
      views: 0
    };

    addVideo(newVideo);
    setIsUploading(false);
    setUploadProgress(0);
    setSelectedFile(null);
    setTitle('');
    setDescription('');
    setVideoUrl('');
    setCoverUrl('');
    
    navigate('/home');
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个视频吗？')) {
      deleteVideo(id);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
            上传视频
          </h1>
          <p className="text-cyber-text-muted">
            添加新的电影、动漫或纪录片到您的视频库
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
                transition-all duration-300 mb-6
                ${isDragging 
                  ? 'border-cyber-cyan bg-cyber-cyan/10 shadow-neon-cyan' 
                  : 'border-cyber-cyan/30 hover:border-cyber-cyan/60 hover:bg-cyber-card/30'
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {selectedFile ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyber-cyan/20 flex items-center justify-center mb-4">
                    <Film className="w-8 h-8 text-cyber-cyan" />
                  </div>
                  <p className="text-white font-medium">{selectedFile.name}</p>
                  <p className="text-cyber-text-muted text-sm mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="mt-4 text-cyber-error hover:text-white transition-colors"
                  >
                    移除文件
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-cyber-cyan/20 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-cyber-cyan" />
                  </div>
                  <p className="text-white font-medium mb-2">
                    拖拽视频文件到这里
                  </p>
                  <p className="text-cyber-text-muted text-sm">
                    或点击选择文件
                  </p>
                  <p className="text-cyber-text-muted/50 text-xs mt-4">
                    支持 MP4, WebM, MOV 格式
                  </p>
                </div>
              )}
            </div>

            {isUploading && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-cyber-text-muted mb-2">
                  <span>上传中...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 bg-cyber-card rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-magenta transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                  视频标题 *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="请输入视频标题"
                  className="w-full px-4 py-3 bg-cyber-card/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-cyber-text-muted/50 focus:outline-none focus:border-cyber-cyan focus:shadow-neon-cyan transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                  视频描述
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="请输入视频描述"
                  rows={3}
                  className="w-full px-4 py-3 bg-cyber-card/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-cyber-text-muted/50 focus:outline-none focus:border-cyber-cyan focus:shadow-neon-cyan transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                  视频分类
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full px-4 py-3 bg-cyber-card/50 border border-cyber-cyan/30 rounded-lg text-white focus:outline-none focus:border-cyber-cyan focus:shadow-neon-cyan transition-all"
                >
                  <option value="movie">电影</option>
                  <option value="anime">动漫</option>
                  <option value="documentary">纪录片</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                  视频URL（可选）
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="w-full px-4 py-3 bg-cyber-card/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-cyber-text-muted/50 focus:outline-none focus:border-cyber-cyan focus:shadow-neon-cyan transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyber-text-muted mb-2">
                  封面图URL（可选）
                </label>
                <input
                  type="url"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                  className="w-full px-4 py-3 bg-cyber-card/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-cyber-text-muted/50 focus:outline-none focus:border-cyber-cyan focus:shadow-neon-cyan transition-all"
                />
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full py-3 px-6 bg-gradient-to-r from-cyber-cyan to-cyber-magenta rounded-lg font-semibold text-white shadow-lg hover:shadow-neon-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? '上传中...' : '发布视频'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-orbitron text-lg font-semibold text-white mb-4">
              已上传的视频
            </h3>
            
            {videos.length === 0 ? (
              <div className="bg-cyber-card/30 rounded-xl p-12 text-center border border-cyber-cyan/20">
                <p className="text-cyber-text-muted">暂无上传的视频</p>
              </div>
            ) : (
              <div className="space-y-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex gap-4 bg-cyber-card/30 rounded-lg p-4 border border-cyber-cyan/20 hover:border-cyber-cyan/40 transition-colors"
                  >
                    <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={video.coverUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-medium text-white line-clamp-1">
                            {video.title}
                          </h4>
                          <div className="mt-1">
                            <CategoryTag category={video.category} />
                          </div>
                          <p className="text-cyber-text-muted text-xs mt-2">
                            {new Date(video.uploadTime).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => navigate(`/video/${video.id}`)}
                            className="p-2 text-cyber-cyan hover:bg-cyber-cyan/20 rounded-lg transition-colors"
                            title="查看"
                          >
                            <Play className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(video.id)}
                            className="p-2 text-cyber-error hover:bg-cyber-error/20 rounded-lg transition-colors"
                            title="删除"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
