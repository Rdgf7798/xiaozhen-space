import { Category } from '../../types';

interface CategoryTagProps {
  category: Category;
  className?: string;
}

const categoryConfig = {
  movie: {
    label: '电影',
    bgColor: 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/50',
    textColor: 'text-cyan-400'
  },
  anime: {
    label: '动漫',
    bgColor: 'bg-gradient-to-r from-magenta-500/20 to-pink-500/20',
    borderColor: 'border-magenta-500/50',
    textColor: 'text-magenta-400'
  },
  documentary: {
    label: '纪录片',
    bgColor: 'bg-gradient-to-r from-purple-500/20 to-violet-500/20',
    borderColor: 'border-purple-500/50',
    textColor: 'text-purple-400'
  }
};

export const CategoryTag = ({ category, className = '' }: CategoryTagProps) => {
  const config = categoryConfig[category];

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        border backdrop-blur-sm transition-all duration-300
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        hover:shadow-lg hover:scale-105 ${className}
      `}
    >
      {config.label}
    </span>
  );
};
