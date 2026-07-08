import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AppConfig {
  apiBaseUrl: string;
  timeout?: number;
  environment?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: AppConfig | null = null;

  constructor(private httpClient: HttpClient) {}

  /**
   * Load configuration from environment.json file (generated at Docker build time)
   * Falls back to defaults if file not found
   */
  async loadConfig(): Promise<AppConfig> {
    if (this.config) {
      return this.config;
    }

    try {
      this.config = await this.httpClient
        .get<AppConfig>('/assets/config/environment.json')
        .toPromise() as AppConfig;
    } catch (error) {
      console.warn('Failed to load environment.json, using defaults:', error);
      this.config = this.getDefaultConfig();
    }

    return this.config;
  }

  /**
   * Get the API base URL (e.g., /api, https://api.example.com)
   */
  getApiBaseUrl(): string {
    if (!this.config) {
      console.warn('Config not loaded, returning default API base URL');
      return this.getDefaultConfig().apiBaseUrl;
    }
    return this.config.apiBaseUrl;
  }

  /**
   * Get the timeout value in milliseconds
   */
  getTimeout(): number {
    if (!this.config) {
      return this.getDefaultConfig().timeout || 30000;
    }
    return this.config.timeout || 30000;
  }

  /**
   * Get the environment type
   */
  getEnvironment(): string {
    if (!this.config) {
      return this.getDefaultConfig().environment || 'development';
    }
    return this.config.environment || 'development';
  }

  /**
   * Check if running in production
   */
  isProduction(): boolean {
    return this.getEnvironment() === 'production';
  }

  /**
   * Get full configuration object
   */
  getConfig(): AppConfig {
    if (!this.config) {
      return this.getDefaultConfig();
    }
    return this.config;
  }

  /**
   * Default configuration (fallback if environment.json not available)
   */
  private getDefaultConfig(): AppConfig {
    return {
      apiBaseUrl: '/api',
      timeout: 30000,
      environment: 'development'
    };
  }
}
