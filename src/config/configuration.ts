// Carregar variáveis de ambiente manualmente
import * as dotenv from 'dotenv';
dotenv.config();

export default () => ({
  // Configurações da aplicação
  app: {
    name: 'Goal Tracker API',
    version: '1.0.0',
    description: 'API para gerenciamento de objetivos pessoais',
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  // Configurações do banco de dados
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'goal_tracker_db',
    schema: 'public',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
    ssl: false,
    maxConnections: 20,
    minConnections: 5,
    idleTimeout: 30000,
    connectionTimeout: 2000,
  },

  // Configurações de autenticação
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'sua_chave_secreta_jwt_aqui_muito_segura_e_longa',
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      refreshSecret: 'sua_chave_secreta_refresh_aqui_muito_segura_e_longa',
      refreshExpiresIn: '30d',
    },
    bcrypt: {
      rounds: 12,
    },
    password: {
      minLength: 8,
    },
  },

  // Configurações de CORS
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: process.env.CORS_CREDENTIALS === 'true',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Accept,Authorization',
  },

  // Configurações de logs
  logs: {
    level: 'debug',
    format: 'combined',
    file: 'logs/app.log',
    maxSize: '10m',
    maxFiles: 5,
  },

  // Configurações de rate limiting
  rateLimit: {
    windowMs: 900000,
    maxRequests: 100,
    skipSuccessfulRequests: false,
    skipFailedRequests: false,
  },

  // Configurações de validação
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    transform: true,
  },

  // Configurações de cache
  cache: {
    ttl: 300,
    maxItems: 1000,
    redis: {
      host: 'localhost',
      port: 6379,
      password: '',
      db: 0,
    },
  },

  // Configurações de email
  email: {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    user: '',
    password: '',
    from: 'noreply@goaltracker.com',
  },

  // Configurações de upload
  upload: {
    maxSize: 5242880,
    dest: './uploads',
    allowedTypes: 'image/jpeg,image/png,image/gif,application/pdf',
  },

  // Configurações de monitoramento
  health: {
    timeout: 3000,
    interval: 30000,
  },

  // Configurações de desenvolvimento
  development: {
    debug: process.env.DEBUG === 'true',
    swagger: {
      enabled: process.env.SWAGGER_ENABLED === 'true',
      title: 'Goal Tracker API',
      description: 'API para gerenciamento de objetivos pessoais',
      version: '1.0.0',
    },
  },

  // Configurações de produção
  production: {
    compression: {
      enabled: true,
      threshold: 1024,
      level: 6,
    },
  },

  // Configurações de segurança
  security: {
    helmet: {
      enabled: true,
      contentSecurityPolicy: true,
      hidePoweredBy: true,
    },
  },

  // Configurações de testes
  test: {
    database: {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'goal_tracker_test_db',
      synchronize: true,
      logging: false,
    },
  },

  // Configurações de deploy
  deploy: {
    docker: {
      enabled: false,
      imageName: 'goal-tracker-api',
      tag: 'latest',
    },
  },

  // Configurações de integração
  integration: {
    frontendUrl: 'http://localhost:3000',
    apiPrefix: 'api',
    apiVersion: 'v1',
  },
}); 