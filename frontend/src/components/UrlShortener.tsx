import React, { useState, useEffect, useMemo } from 'react';
import { urlService } from '../services/api';
import { Url } from '../types';
import Stats from './Stats';
import SearchBar from './SearchBar';
import { 
  ClipboardDocumentIcon, 
  CheckIcon, 
  LinkIcon,
  TrashIcon,
  EyeIcon,
  CalendarIcon,
  ChartBarIcon,
  FunnelIcon,
  SparklesIcon,
  RocketLaunchIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'expired' | 'expiring'>('all');

  // Simular URLs salvas (em uma aplicação real, isso viria do backend)
  useEffect(() => {
    // Carregar URLs do localStorage se existirem
    const savedUrls = localStorage.getItem('jshort-urls');
    if (savedUrls) {
      setShortenedUrls(JSON.parse(savedUrls));
    }
  }, []);

  // Filtrar URLs baseado na busca e filtros
  const filteredUrls = useMemo(() => {
    let filtered = shortenedUrls;

    // Aplicar filtro de status
    if (filterStatus !== 'all') {
      const now = new Date();
      filtered = filtered.filter(url => {
        const expiry = new Date(url.expirationDate);
        const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (filterStatus) {
          case 'active':
            return diffDays > 7;
          case 'expiring':
            return diffDays <= 7 && diffDays >= 0;
          case 'expired':
            return diffDays < 0;
          default:
            return true;
        }
      });
    }

    // Aplicar busca
    if (searchTerm) {
      filtered = filtered.filter(url => 
        url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [shortenedUrls, searchTerm, filterStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Por favor, insira uma URL válida');
      return;
    }

    // Validar formato da URL
    try {
      new URL(url);
    } catch {
      setError('Por favor, insira uma URL válida');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await urlService.shortenUrl({ originalUrl: url });
      
      // Adicionar nova URL à lista
      const newUrlList = [result, ...shortenedUrls];
      setShortenedUrls(newUrlList);
      
      // Salvar no localStorage
      localStorage.setItem('jshort-urls', JSON.stringify(newUrlList));
      
      setSuccess('URL encurtada com sucesso! 🎉');
      setUrl('');
      
      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (shortCode: string) => {
    const shortUrl = urlService.redirectToOriginal(shortCode);
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(shortCode);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar para a área de transferência:', err);
    }
  };

  const deleteUrl = (id: string) => {
    const newUrlList = shortenedUrls.filter(url => url.id !== id);
    setShortenedUrls(newUrlList);
    localStorage.setItem('jshort-urls', JSON.stringify(newUrlList));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDaysUntilExpiry = (expirationDate: string) => {
    const now = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filterOptions = [
    { value: 'all', label: 'Todas', count: shortenedUrls.length, icon: LinkIcon },
    { value: 'active', label: 'Ativas', count: shortenedUrls.filter(url => getDaysUntilExpiry(url.expirationDate) > 7).length, icon: EyeIcon },
    { value: 'expiring', label: 'Expirando', count: shortenedUrls.filter(url => {
      const days = getDaysUntilExpiry(url.expirationDate);
      return days <= 7 && days >= 0;
    }).length, icon: CalendarIcon },
    { value: 'expired', label: 'Expiradas', count: shortenedUrls.filter(url => getDaysUntilExpiry(url.expirationDate) < 0).length, icon: ChartBarIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-animation" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header Principal */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-2xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="relative">
                <LinkIcon className="h-16 w-16 text-gradient pulse-glow" />
                <SparklesIcon className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2" />
              </div>
              <h1 className="text-6xl font-bold text-gradient">JShort</h1>
            </div>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transforme URLs longas em links curtos e elegantes. 
              <span className="font-semibold text-slate-700"> Rápido, seguro e organizado.</span>
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-slate-500">
              <RocketLaunchIcon className="h-5 w-5" />
              <span className="text-sm">Encurtamento instantâneo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Seção de Encurtamento */}
        <div className="card mb-10 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">
              Encurtar Nova URL
            </h2>
            <p className="text-slate-600">
              Cole sua URL longa abaixo e obtenha um link curto em segundos
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-sm font-semibold text-slate-700 mb-3">
                <span className="flex items-center space-x-2">
                  <LinkIcon className="h-5 w-5 text-blue-600" />
                  <span>URL para encurtar</span>
                </span>
              </label>
              <div className="flex space-x-4">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://exemplo.com/url-muito-longa-que-precisa-ser-encurtada"
                  className="input-field flex-1 text-lg"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !url.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Encurtando...</span>
                    </>
                  ) : (
                    <>
                      <PlusIcon className="h-5 w-5" />
                      <span>Encurtar URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg success-glow">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700 font-medium">{success}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Seção de URLs Encurtadas */}
        <div className="card p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Suas URLs Encurtadas
              </h2>
              <p className="text-slate-600">
                Gerencie e organize todos os seus links curtos
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gradient">{shortenedUrls.length}</div>
              <div className="text-sm text-slate-500">URL{shortenedUrls.length !== 1 ? 's' : ''} criada{shortenedUrls.length !== 1 ? 's' : ''}</div>
            </div>
          </div>

          {/* Componente de Estatísticas */}
          <Stats urls={shortenedUrls} />

          {/* Filtros e Busca */}
          {shortenedUrls.length > 0 && (
            <div className="mb-8 space-y-6">
              {/* Filtros de Status */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Filtrar por Status</h3>
                <div className="flex flex-wrap gap-3">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFilterStatus(option.value as any)}
                      className={`filter-btn ${filterStatus === option.value ? 'active' : 'inactive'} flex items-center space-x-2`}
                    >
                      <option.icon className="h-4 w-4" />
                      <span>{option.label}</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">
                        {option.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Barra de Busca */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Buscar URLs</h3>
                <div className="max-w-md">
                  <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    placeholder="Buscar por URL ou código..."
                  />
                </div>
              </div>
            </div>
          )}

          {filteredUrls.length === 0 ? (
            <div className="text-center py-16">
              {shortenedUrls.length === 0 ? (
                <div className="space-y-6">
                  <div className="relative">
                    <LinkIcon className="h-24 w-24 text-slate-300 mx-auto floating-animation" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 blur-xl"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-700 mb-3">
                      Comece sua jornada de encurtamento!
                    </h3>
                    <p className="text-slate-500 text-lg max-w-md mx-auto">
                      Encurte sua primeira URL acima e veja como é fácil organizar seus links.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <FunnelIcon className="h-24 w-24 text-slate-300 mx-auto" />
                  <div>
                    <h3 className="text-2xl font-bold text-slate-700 mb-3">
                      Nenhuma URL encontrada
                    </h3>
                    <p className="text-slate-500 text-lg">
                      Tente ajustar os filtros ou a busca para encontrar o que procura.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredUrls.map((shortenedUrl) => {
                const daysUntilExpiry = getDaysUntilExpiry(shortenedUrl.expirationDate);
                const isExpired = daysUntilExpiry < 0;
                const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry >= 0;

                return (
                  <div key={shortenedUrl.id} className="url-card group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        {/* URL Original */}
                        <div className="mb-4">
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                            URL Original
                          </label>
                          <div className="text-sm text-slate-600 break-all bg-slate-50 p-3 rounded-lg border border-slate-200">
                            {shortenedUrl.originalUrl}
                          </div>
                        </div>

                        {/* URL Encurtada */}
                        <div className="mb-6">
                          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                            URL Encurtada
                          </label>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200 shadow-sm">
                              <a
                                href={urlService.redirectToOriginal(shortenedUrl.shortCode)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-800 font-semibold break-all text-sm transition-colors"
                              >
                                {urlService.redirectToOriginal(shortenedUrl.shortCode)}
                              </a>
                            </div>
                            <button
                              onClick={() => copyToClipboard(shortenedUrl.shortCode)}
                              className="btn-secondary p-3 group-hover:scale-110 transition-transform"
                              title="Copiar URL"
                            >
                              {copied === shortenedUrl.shortCode ? (
                                <CheckIcon className="h-5 w-5 text-green-600" />
                              ) : (
                                <ClipboardDocumentIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Estatísticas */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                          <div className="text-center group-hover:scale-105 transition-transform">
                            <div className="text-xl font-bold text-gradient mb-1">
                              {shortenedUrl.shortCode}
                            </div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Código</div>
                          </div>
                          <div className="text-center group-hover:scale-105 transition-transform">
                            <div className="text-xl font-bold text-slate-700 flex items-center justify-center mb-1">
                              <EyeIcon className="h-4 w-4 mr-2 text-blue-600" />
                              {shortenedUrl.accessCount}
                            </div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Acessos</div>
                          </div>
                          <div className="text-center group-hover:scale-105 transition-transform">
                            <div className="text-xl font-bold text-slate-700 flex items-center justify-center mb-1">
                              <CalendarIcon className="h-4 w-4 mr-2 text-green-600" />
                              {formatDate(shortenedUrl.creationDate)}
                            </div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Criado em</div>
                          </div>
                          <div className="text-center group-hover:scale-105 transition-transform">
                            <div className={`text-xl font-bold flex items-center justify-center mb-1 ${
                              isExpired ? 'text-red-600' : 
                              isExpiringSoon ? 'text-yellow-600' : 'text-slate-700'
                            }`}>
                              <ChartBarIcon className="h-4 w-4 mr-2" />
                              {isExpired ? 'Expirado' : 
                               isExpiringSoon ? `${daysUntilExpiry}d` : 
                               `${daysUntilExpiry}d`}
                            </div>
                            <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Expira em</div>
                          </div>
                        </div>
                      </div>

                      {/* Botão de deletar */}
                      <button
                        onClick={() => deleteUrl(shortenedUrl.id)}
                        className="ml-6 p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                        title="Deletar URL"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;
