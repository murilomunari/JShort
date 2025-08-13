import axios from 'axios';
import { Url, UrlDTO, ApiResponse } from '../types';
import { config } from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const urlService = {
  // Encurtar uma URL
  shortenUrl: async (urlData: UrlDTO): Promise<Url> => {
    try {
      const response = await api.post<Url>('/url/encurtar', urlData);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erro ao encurtar URL');
    }
  },

  // Buscar URL original por código curto
  getOriginalUrl: async (shortCode: string): Promise<string> => {
    try {
      const response = await api.get(`/url/${shortCode}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('URL não encontrada');
    }
  },

  // Redirecionar para URL original
  redirectToOriginal: (shortCode: string): string => {
    return `${config.API_BASE_URL}/url/${shortCode}`;
  },
};

export default api;
