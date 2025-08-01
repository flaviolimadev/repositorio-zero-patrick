#!/usr/bin/env node

/**
 * Script para criar arquivo .env básico
 * Uso: node scripts/create-env.js
 */

const fs = require('fs');
const path = require('path');

const envContent = `# ========================================
# CONFIGURAÇÕES ESSENCIAIS - GOAL TRACKER API
# ========================================

# Configurações básicas da aplicação
NODE_ENV=development
PORT=3001

# ========================================
# CONFIGURAÇÕES DO BANCO DE DADOS
# ========================================

# PostgreSQL - Configurações principais
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE=goal_tracker_db

# TypeORM - Configurações básicas
DB_SYNCHRONIZE=true
DB_LOGGING=true

# ========================================
# CONFIGURAÇÕES DE AUTENTICAÇÃO
# ========================================

# JWT - Configurações essenciais
JWT_SECRET=minha_chave_secreta_jwt_muito_segura_e_longa_para_teste_123456789

# ========================================
# CONFIGURAÇÕES DE CORS
# ========================================

# CORS - Configurações básicas
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true

# ========================================
# CONFIGURAÇÕES DE DESENVOLVIMENTO
# ========================================

# Desenvolvimento - Configurações para dev
DEBUG=true
SWAGGER_ENABLED=true
`;

const envPath = path.join(__dirname, '..', '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Arquivo .env criado com sucesso!');
  console.log('📁 Localização:', envPath);
  console.log('');
  console.log('🔧 Configure as seguintes variáveis:');
  console.log('   - DB_PASSWORD: Sua senha do PostgreSQL');
  console.log('   - JWT_SECRET: Gere uma chave segura com: npm run generate-secrets');
  console.log('');
  console.log('🚀 Agora você pode executar: npm start');
} catch (error) {
  console.error('❌ Erro ao criar arquivo .env:', error.message);
  process.exit(1);
} 