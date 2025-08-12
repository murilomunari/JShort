import React from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <LinkIcon className="h-8 w-8 text-primary-400" />
              <h3 className="text-2xl font-bold">JShort</h3>
            </div>
            <p className="text-gray-300">
              Uma solução moderna e eficiente para encurtamento de URLs, 
              desenvolvida com Spring Boot e React.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#features" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/murilomunari/JShort" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Tecnologias</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Spring Boot 3.2.0</li>
              <li>React 18 + TypeScript</li>
              <li>PostgreSQL</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 JShort. Desenvolvido com ❤️ por Murilo Munari.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
