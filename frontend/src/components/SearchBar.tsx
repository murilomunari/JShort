import React from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Buscar URLs..." 
}) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur-sm border-2 border-slate-200 
                   rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 
                   transition-all duration-300 shadow-md hover:shadow-lg placeholder-slate-400 
                   text-slate-700 text-lg"
        placeholder={placeholder}
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 
                     transition-colors duration-200 group-hover:scale-110"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
      
      {/* Decorative glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-indigo-400/0 
                      opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default SearchBar;
