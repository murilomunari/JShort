import React, { useState } from 'react';
import { urlService } from '../services/api';
import { Url } from '../types';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState<Url | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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

    try {
      const result = await urlService.shortenUrl({ originalUrl: url });
      setShortenedUrl(result);
      setUrl('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (shortenedUrl) {
      const shortUrl = urlService.redirectToOriginal(shortenedUrl.shortCode);
      try {
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar para a área de transferência:', err);
      }
    }
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          JShort
        </h1>
        <p className="text-xl text-gray-600">
          Encurte suas URLs de forma rápida e segura
        </p>
      </div>

      <div className="card mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              URL para encurtar
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemplo.com/url-muito-longa"
              className="input-field"
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Encurtando...' : 'Encurtar URL'}
          </button>
        </form>
      </div>

      {shortenedUrl && (
        <div className="card">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            URL Encurtada com Sucesso! 🎉
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Original
              </label>
              <div className="bg-gray-50 p-3 rounded-lg break-all text-sm text-gray-600">
                {shortenedUrl.originalUrl}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Encurtada
              </label>
              <div className="flex items-center space-x-2">
                <div className="bg-primary-50 p-3 rounded-lg flex-1">
                  <a
                    href={urlService.redirectToOriginal(shortenedUrl.shortCode)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium break-all"
                  >
                    {urlService.redirectToOriginal(shortenedUrl.shortCode)}
                  </a>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="btn-secondary p-3"
                  title="Copiar URL"
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <ClipboardDocumentIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {shortenedUrl.shortCode}
                </div>
                <div className="text-sm text-gray-500">Código Curto</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {shortenedUrl.accessCount}
                </div>
                <div className="text-sm text-gray-500">Acessos</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  {formatDate(shortenedUrl.creationDate)}
                </div>
                <div className="text-sm text-gray-500">Criado em</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
