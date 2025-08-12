export interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  creationDate: string;
  expirationDate: string;
  accessCount: number;
}

export interface UrlDTO {
  originalUrl: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface ShortenedUrl {
  originalUrl: string;
  shortUrl: string;
  shortCode: string;
  creationDate: string;
  expirationDate: string;
  accessCount: number;
}
