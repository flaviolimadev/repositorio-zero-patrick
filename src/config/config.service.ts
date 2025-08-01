import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(@Inject('CONFIG') private config: any) {}

  // Configurações da aplicação
  get app() {
    return this.config.app;
  }

  // Configurações do banco de dados
  get database() {
    return this.config.database;
  }

  // Configurações de autenticação
  get auth() {
    return this.config.auth;
  }

  // Configurações de CORS
  get cors() {
    return this.config.cors;
  }

  // Configurações de logs
  get logs() {
    return this.config.logs;
  }

  // Configurações de rate limiting
  get rateLimit() {
    return this.config.rateLimit;
  }

  // Configurações de validação
  get validation() {
    return this.config.validation;
  }

  // Configurações de cache
  get cache() {
    return this.config.cache;
  }

  // Configurações de email
  get email() {
    return this.config.email;
  }

  // Configurações de upload
  get upload() {
    return this.config.upload;
  }

  // Configurações de monitoramento
  get health() {
    return this.config.health;
  }

  // Configurações de desenvolvimento
  get development() {
    return this.config.development;
  }

  // Configurações de produção
  get production() {
    return this.config.production;
  }

  // Configurações de segurança
  get security() {
    return this.config.security;
  }

  // Configurações de testes
  get test() {
    return this.config.test;
  }

  // Configurações de deploy
  get deploy() {
    return this.config.deploy;
  }

  // Configurações de integração
  get integration() {
    return this.config.integration;
  }

  // Método para obter qualquer configuração
  get(key: string): any {
    const keys = key.split('.');
    let value = this.config;
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  }

  // Método para verificar se está em desenvolvimento
  isDevelopment(): boolean {
    return this.app.nodeEnv === 'development';
  }

  // Método para verificar se está em produção
  isProduction(): boolean {
    return this.app.nodeEnv === 'production';
  }

  // Método para verificar se está em teste
  isTest(): boolean {
    return this.app.nodeEnv === 'test';
  }
} 