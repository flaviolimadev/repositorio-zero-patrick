import { Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

@Injectable()
export class ExampleService {
  constructor(private configService: ConfigService) {}

  // Exemplo de uso das configurações
  getDatabaseConfig() {
    return {
      host: this.configService.database.host,
      port: this.configService.database.port,
      username: this.configService.database.username,
      password: this.configService.database.password,
      database: this.configService.database.database,
    };
  }

  // Exemplo de uso das configurações de autenticação
  getAuthConfig() {
    return {
      jwtSecret: this.configService.auth.jwt.secret,
      jwtExpiresIn: this.configService.auth.jwt.expiresIn,
      bcryptRounds: this.configService.auth.bcrypt.rounds,
    };
  }

  // Exemplo de verificação de ambiente
  isDevelopmentMode() {
    return this.configService.isDevelopment();
  }

  // Exemplo de uso direto de uma configuração
  getCustomConfig() {
    return this.configService.get('app.name');
  }

  // Exemplo de configuração de CORS
  getCorsConfig() {
    return {
      origin: this.configService.cors.origin,
      credentials: this.configService.cors.credentials,
      methods: this.configService.cors.methods.split(','),
      allowedHeaders: this.configService.cors.allowedHeaders.split(','),
    };
  }

  // Exemplo de configuração de logs
  getLogConfig() {
    return {
      level: this.configService.logs.level,
      format: this.configService.logs.format,
      file: this.configService.logs.file,
    };
  }

  // Exemplo de configuração de rate limiting
  getRateLimitConfig() {
    return {
      windowMs: this.configService.rateLimit.windowMs,
      maxRequests: this.configService.rateLimit.maxRequests,
    };
  }
} 