import { Video } from '../../types';
import { VideoCard } from './VideoCard';

interface VideoGridProps {
  videos: Video[];
}

export const VideoGrid = ({ videos }: VideoGridProps) => {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-6xl mb-4">🎬</div>
        <p className="font-orbitron text-xl text-cyber-text-muted">
          暂无视频内容
        </p>
        <p className="text-cyber-text-muted/70 mt-2">
          点击上方「上传视频」添加您的第一个视频
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <VideoCard key={video.id} video={video} index={index} />
      ))}
    </div>
  );
};
