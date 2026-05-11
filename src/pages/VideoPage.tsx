import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Calendar, Play } from 'lucide-react';
import { useVideoStore } from '../stores/videoStore';
import { Navbar } from '../components/layout/Navbar';
import { CategoryTag } from '../components/common/CategoryTag';
import { VideoCard } from '../components/video/VideoCard';

export const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVideoById } = useVideoStore();

  const video = getVideoById(id || '');

  if (!video) {
    return (
      <div className="min-h-screen bg-cyber-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-orbitron text-2xl text-cyber-error mb-4">视频不存在</h2>
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-cyber-cyan hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const relatedVideos = useVideoStore.getState().videos
    .filter((v) => v.category === video.category && v.id !== video.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-cyber-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 text-cyber-text-muted hover:text-cyber-cyan transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          返回视频库
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-cyber-card/50 backdrop-blur-md rounded-xl overflow-hidden border border-cyber-cyan/20">
              <div className="aspect-video bg-black">
                <video
                  src={video.videoUrl}
                  controls
                  autoPlay={false}
                  className="w-full h-full"
                  poster={video.coverUrl}
                >
                  您的浏览器不支持视频播放
                </video>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <CategoryTag category={video.category} />
                </div>
                <h1 className="font-orbitron text-2xl font-bold text-white mb-4">
                  {video.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-cyber-text-muted text-sm mb-6">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{video.views.toLocaleString()} 次观看</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(video.uploadTime).toLocaleDateString('zh-CN')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </div>
                </div>

                <div className="border-t border-cyber-cyan/20 pt-6">
                  <h3 className="font-medium text-white mb-3">简介</h3>
                  <p className="text-cyber-text-muted leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-orbitron text-lg font-semibold text-white mb-4">
              相关推荐
            </h3>
            
            {relatedVideos.length > 0 ? (
              <div className="space-y-4">
                {relatedVideos.map((v) => (
                  <div
                    key={v.id}
                    className="flex gap-3 cursor-pointer group"
                    onClick={() => navigate(`/video/${v.id}`)}
                  >
                    <div className="relative w-40 flex-shrink-0 aspect-video rounded-lg overflow-hidden">
                      <img
                        src={v.coverUrl}
                        alt={v.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 text-white" fill="white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white text-sm line-clamp-2 group-hover:text-cyber-cyan transition-colors">
                        {v.title}
                      </h4>
                      <p className="text-cyber-text-muted text-xs mt-1">
                        {v.views.toLocaleString()} 次观看
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-cyber-text-muted text-sm">
                暂无相关推荐
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
