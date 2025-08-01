#!/usr/bin/env node

/**
 * Script para validar as variáveis de ambiente
 * Uso: node scripts/validate-env.js
 */

require('dotenv').config();

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_DATABASE',
  'JWT_SECRET',
  'CORS_ORIGIN'
];

const optionalEnvVars = [
  'DB_SYNCHRONIZE',
  'DB_LOGGING',
  'JWT_EXPIRES_IN',
  'CORS_CREDENTIALS',
  'DEBUG',
  'SWAGGER_ENABLED'
];

console.log('🔍 Validando variáveis de ambiente...\n');

let hasErrors = false;

// Verificar variáveis obrigatórias
console.log('📋 Variáveis obrigatórias:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName}: NÃO DEFINIDA`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName}: ${varName.includes('PASSWORD') || varName.includes('SECRET') ? '***' : value}`);
  }
});

console.log('\n📋 Variáveis opcionais:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`⚠️  ${varName}: não definida (usando valor padrão)`);
  } else {
    console.log(`✅ ${varName}: ${value}`);
  }
});

// Validações específicas
console.log('\n🔧 Validações específicas:');

// Validar NODE_ENV
const nodeEnv = process.env.NODE_ENV;
if (nodeEnv && !['development', 'production', 'test'].includes(nodeEnv)) {
  console.log(`❌ NODE_ENV: valor inválido "${nodeEnv}". Deve ser: development, production, ou test`);
  hasErrors = true;
} else {
  console.log(`✅ NODE_ENV: ${nodeEnv}`);
}

// Validar PORT
const port = parseInt(process.env.PORT);
if (isNaN(port) || port < 1 || port > 65535) {
  console.log(`❌ PORT: valor inválido "${process.env.PORT}". Deve ser um número entre 1 e 65535`);
  hasErrors = true;
} else {
  console.log(`✅ PORT: ${port}`);
}

// Validar DB_PORT
const dbPort = parseInt(process.env.DB_PORT);
if (isNaN(dbPort) || dbPort < 1 || dbPort > 65535) {
  console.log(`❌ DB_PORT: valor inválido "${process.env.DB_PORT}". Deve ser um número entre 1 e 65535`);
  hasErrors = true;
} else {
  console.log(`✅ DB_PORT: ${dbPort}`);
}

// Validar JWT_SECRET
const jwtSecret = process.env.JWT_SECRET;
if (jwtSecret && jwtSecret.length < 32) {
  console.log(`❌ JWT_SECRET: muito curta (${jwtSecret.length} caracteres). Mínimo: 32 caracteres`);
  hasErrors = true;
} else if (jwtSecret) {
  console.log(`✅ JWT_SECRET: ${jwtSecret.length} caracteres`);
}

// Validar CORS_ORIGIN
const corsOrigin = process.env.CORS_ORIGIN;
if (corsOrigin && !corsOrigin.startsWith('http')) {
  console.log(`❌ CORS_ORIGIN: formato inválido "${corsOrigin}". Deve começar com http:// ou https://`);
  hasErrors = true;
} else if (corsOrigin) {
  console.log(`✅ CORS_ORIGIN: ${corsOrigin}`);
}

console.log('\n📊 Resumo:');
if (hasErrors) {
  console.log('❌ Configuração inválida. Corrija os erros acima.');
  process.exit(1);
} else {
  console.log('✅ Configuração válida!');
  console.log('🚀 Você pode iniciar a aplicação com: npm run start:dev');
} 