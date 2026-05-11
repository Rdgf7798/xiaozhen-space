import { useState } from 'react';
import { Lock, Film, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { ParticleBackground } from '../components/common/ParticleBackground';

export const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError(true);
      setErrorMessage('请输入访问密码');
      return;
    }

    const success = login(password);
    
    if (success) {
      navigate('/home');
    } else {
      setError(true);
      setErrorMessage('密码错误，请重试');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-cyber-magenta/5" />
      
      <div className={`relative z-10 w-full max-w-md mx-4 ${error ? 'animate-shake' : ''}`}>
        <div className="text-center mb-8 animate-float">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-cyan to-cyber-magenta shadow-neon-cyan mb-6">
            <Film className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-audiowide text-6xl bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3 tracking-[0.3em] drop-shadow-[0_0_40px_rgba(236,72,153,0.6)] animate-pulse">
            小桢空间
          </h1>
          <p className="text-cyber-text-muted font-rajdhani text-xl">
            您的私人珍藏空间
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-cyber-card/30 backdrop-blur-md rounded-2xl p-8 border border-cyber-cyan/30 shadow-neon-cyan/20">
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-cyber-text-muted mb-2 font-rajdhani">
              访问密码
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyber-cyan" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="请输入密码"
                className={`w-full pl-12 pr-4 py-3 bg-cyber-bg/50 border rounded-lg text-white placeholder-cyber-text-muted/50 focus:outline-none transition-all font-rajdhani ${
                  error 
                    ? 'border-cyber-error shadow-[0_0_20px_rgba(255,51,102,0.5)]' 
                    : 'border-cyber-cyan/50 focus:border-cyber-cyan focus:shadow-neon-cyan'
                }`}
              />
            </div>
            
            {error && (
              <div className="flex items-center gap-2 mt-3 text-cyber-error text-sm animate-slide-up">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-cyber-cyan via-purple-500 to-cyber-magenta rounded-lg font-rajdhani font-semibold text-white shadow-lg hover:shadow-neon-cyan transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] animate-glow"
          >
            进入空间
          </button>
        </form>

        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyber-cyan/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyber-magenta/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};
