import React from 'react';
import { Url } from '../types';
import { 
  LinkIcon, 
  EyeIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface StatsProps {
  urls: Url[];
}

const Stats: React.FC<StatsProps> = ({ urls }) => {
  const totalUrls = urls.length;
  const totalAccesses = urls.reduce((sum, url) => sum + url.accessCount, 0);
  
  const now = new Date();
  const expiredUrls = urls.filter(url => new Date(url.expirationDate) < now).length;
  const expiringSoonUrls = urls.filter(url => {
    const expiry = new Date(url.expirationDate);
    const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  }).length;

  const stats = [
    {
      title: 'Total de URLs',
      value: totalUrls,
      icon: LinkIcon,
      color: 'text-gradient',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      description: 'Links criados'
    },
    {
      title: 'Total de Acessos',
      value: totalAccesses.toLocaleString(),
      icon: EyeIcon,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      description: 'Visualizações'
    },
    {
      title: 'Expirando em 7 dias',
      value: expiringSoonUrls,
      icon: ClockIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200',
      description: 'Atenção necessária'
    },
    {
      title: 'URLs Expiradas',
      value: expiredUrls,
      icon: ExclamationTriangleIcon,
      color: 'text-red-600',
      bgColor: 'bg-gradient-to-br from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      description: 'Precisam renovação'
    }
  ];

  if (totalUrls === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center space-x-2">
        <ChartBarIcon className="h-6 w-6 text-blue-600" />
        <span>Resumo das Suas URLs</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300 cursor-pointer`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`${stat.color} flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="h-8 w-8" />
            </div>
            <div className="text-3xl font-bold text-slate-800 mb-2 group-hover:scale-110 transition-transform duration-300">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-slate-700 mb-1">
              {stat.title}
            </div>
            <div className="text-xs text-slate-500">
              {stat.description}
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-current opacity-20 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-current opacity-30 rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
