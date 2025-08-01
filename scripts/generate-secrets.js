#!/usr/bin/env node

/**
 * Script para gerar chaves secretas seguras para o projeto
 * Uso: node scripts/generate-secrets.js
 */

const crypto = require('crypto');

console.log('🔐 Gerando chaves secretas seguras...\n');

// Gerar chave JWT
const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('JWT_SECRET:');
console.log(jwtSecret);
console.log('');

// Gerar chave de refresh JWT
const jwtRefreshSecret = crypto.randomBytes(64).toString('hex');
console.log('JWT_REFRESH_SECRET:');
console.log(jwtRefreshSecret);
console.log('');

// Gerar chave para bcrypt (opcional)
const bcryptSecret = crypto.randomBytes(32).toString('hex');
console.log('BCRYPT_SECRET (opcional):');
console.log(bcryptSecret);
console.log('');

console.log('📝 Instruções:');
console.log('1. Copie estas chaves para seu arquivo .env');
console.log('2. NUNCA commite estas chaves no Git');
console.log('3. Use chaves diferentes para cada ambiente');
console.log('4. Mantenha as chaves seguras e backup');
console.log('');

console.log('✅ Chaves geradas com sucesso!'); 