import { useState } from 'react';
import { Play } from 'lucide-react';
import { Video } from '../../types';
import { CategoryTag } from '../common/CategoryTag';
import { useNavigate } from 'react-router-dom';

interface VideoCardProps {
  video: Video;
  index?: number;
}

export const VideoCard = ({ video, index = 0 }: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div
      className="group relative bg-cyber-card/50 backdrop-blur-md rounded-xl overflow-hidden border border-cyber-cyan/20 transition-all duration-500 hover:border-cyber-cyan/60 hover:shadow-neon-cyan hover:-translate-y-2 cursor-pointer animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.coverUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent" />
        
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            bg-black/50 backdrop-blur-sm transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-magenta flex items-center justify-center shadow-neon-cyan transition-transform duration-300 group-hover:scale-110">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>

        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-xs font-medium text-white">
          {video.duration}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <CategoryTag category={video.category} />
        </div>
        <h3 className="font-orbitron text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-cyber-cyan transition-colors">
          {video.title}
        </h3>
        <p className="text-cyber-text-muted text-sm line-clamp-2 mb-3">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-xs text-cyber-text-muted">
          <span>{video.views.toLocaleString()} 次观看</span>
          <span>{new Date(video.uploadTime).toLocaleDateString('zh-CN')}</span>
        </div>
      </div>
    </div>
  );
};
