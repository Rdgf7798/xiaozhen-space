import { Search, LogOut, Upload, Film, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useState } from 'react';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export const Navbar = ({ onSearch }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { logout, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-cyber-bg/80 backdrop-blur-lg border-b border-cyber-cyan/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-magenta flex items-center justify-center shadow-neon-cyan group-hover:scale-110 transition-transform">
              <Film className="w-6 h-6 text-white" />
            </div>
            <span className="font-audiowide text-xl bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              小桢空间
            </span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-text-muted" />
              <input
                type="text"
                placeholder="搜索视频..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-cyber-card/50 border border-cyber-cyan/30 rounded-lg text-white placeholder-cyber-text-muted focus:outline-none focus:border-cyber-cyan focus:shadow-neon-cyan transition-all"
              />
            </div>
          </form>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/upload"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyber-cyan/20 to-cyber-magenta/20 border border-cyber-cyan/50 rounded-lg text-cyber-cyan hover:bg-cyber-cyan/30 hover:shadow-neon-cyan transition-all"
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">上传视频</span>
              </Link>
            )}

            {!isAdmin && (
              <div className="flex items-center gap-2 px-4 py-2 bg-cyber-card/30 border border-cyber-cyan/20 rounded-lg text-cyber-text-muted">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">访客模式</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="p-2 text-cyber-text-muted hover:text-cyber-error transition-colors"
              title="退出登录"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
