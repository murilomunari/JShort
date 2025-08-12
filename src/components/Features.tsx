import React from 'react';
import { 
  BoltIcon, 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const Features: React.FC = () => {
  const features = [
    {
      icon: BoltIcon,
      title: 'Encurtamento Rápido',
      description: 'Encurte suas URLs em segundos com nossa API otimizada.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Seguro e Confiável',
      description: 'Suas URLs são processadas de forma segura e confidencial.'
    },
    {
      icon: ChartBarIcon,
      title: 'Estatísticas em Tempo Real',
      description: 'Acompanhe o número de acessos às suas URLs encurtadas.'
    },
    {
      icon: ClockIcon,
      title: 'Expiração Configurável',
      description: 'Suas URLs têm data de expiração para maior controle.'
    }
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Por que escolher o JShort?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma solução completa e moderna para encurtamento de URLs, 
            desenvolvida com as melhores tecnologias disponíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
