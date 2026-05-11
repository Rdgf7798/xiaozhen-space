import { useState, useMemo } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { VideoGrid } from '../components/video/VideoGrid';
import { useVideoStore } from '../stores/videoStore';
import { Category } from '../types';

const categories: { label: string; value: Category | 'all' }[] = [
  { label: '全部', value: 'all' },
  { label: '电影', value: 'movie' },
  { label: '动漫', value: 'anime' },
  { label: '纪录片', value: 'documentary' },
];

export const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { videos } = useVideoStore();

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [videos, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-cyber-bg">
      <Navbar onSearch={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-orbitron text-3xl font-bold text-white mb-2">
            我的视频库
          </h1>
          <p className="text-cyber-text-muted">
            共 {videos.length} 部珍藏内容
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`
                px-5 py-2 rounded-full font-medium transition-all duration-300
                ${
                  selectedCategory === cat.value
                    ? 'bg-gradient-to-r from-cyber-cyan to-cyber-magenta text-white shadow-neon-cyan'
                    : 'bg-cyber-card/50 text-cyber-text-muted hover:text-white hover:bg-cyber-card border border-cyber-cyan/20 hover:border-cyber-cyan/50'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {searchQuery && (
          <div className="mb-6 text-cyber-text-muted">
            搜索 "{searchQuery}"，找到 {filteredVideos.length} 个结果
          </div>
        )}

        <VideoGrid videos={filteredVideos} />
      </div>

      <footer className="border-t border-cyber-cyan/20 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-cyber-text-muted text-sm">
          <p>© 2026 小桢空间 - 影链空间</p>
        </div>
      </footer>
    </div>
  );
};
