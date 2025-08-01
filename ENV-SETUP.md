# 🔧 Configuração de Variáveis de Ambiente - Backend

Este documento explica como configurar as variáveis de ambiente para o backend NestJS do Goal Tracker.

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL
- NestJS CLI

## 🚀 Configuração Rápida

### 1. Copiar o arquivo de exemplo

```bash
cd Backend
cp env.example .env
```

### 2. Configurar as variáveis principais

Edite o arquivo `.env` e configure pelo menos:

```env
# Configurações básicas
NODE_ENV=development
PORT=3001

# Banco de dados PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=goal_tracker_db

# JWT - IMPORTANTE: Altere esta chave!
JWT_SECRET=sua_chave_secreta_jwt_aqui_muito_segura_e_longa

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 📁 Estrutura de Arquivos

```
Backend/
├── .env                    # Variáveis de ambiente (não commitado)
├── env.example            # Exemplo de variáveis essenciais (commitado)
├── env.advanced.example   # Exemplo de variáveis avançadas (commitado)
├── src/
│   └── config/
│       ├── configuration.ts    # Configuração principal
│       ├── config.module.ts    # Módulo de configuração
│       ├── config.service.ts   # Serviço de configuração
│       ├── config.example.ts   # Exemplos de uso
│       └── index.ts            # Exportações
└── ENV-SETUP.md           # Esta documentação
```

## 🔧 Configurações por Categoria

### Configurações da Aplicação

```env
NODE_ENV=development          # development, production, test
PORT=3001                     # Porta da aplicação
```

### Configurações do Banco de Dados

```env
# PostgreSQL - Essenciais
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_DATABASE=goal_tracker_db

# TypeORM - Básicas
DB_SYNCHRONIZE=true          # Sincronizar schema automaticamente
DB_LOGGING=true              # Log de queries SQL
```

### Configurações de Autenticação

```env
# JWT - Essencial
JWT_SECRET=sua_chave_secreta_jwt_aqui_muito_segura_e_longa
JWT_EXPIRES_IN=7d            # Opcional (padrão: 7d)
```

### Configurações de CORS

```env
CORS_ORIGIN=http://localhost:3000
CORS_CREDENTIALS=true        # Opcional (padrão: true)
```

### Configurações de Desenvolvimento

```env
DEBUG=true                   # Opcional (padrão: true)
SWAGGER_ENABLED=true         # Opcional (padrão: true)
```

## 🔧 Configurações Avançadas (Opcional)

Para funcionalidades mais avançadas, você pode usar o arquivo `env.advanced.example`:

```bash
# Copiar configurações avançadas (opcional)
cp env.advanced.example .env.advanced
```

As configurações avançadas incluem:
- Pool de conexões do banco de dados
- JWT Refresh Token
- Rate Limiting
- Cache com Redis
- Configurações de email
- Upload de arquivos
- Monitoramento
- Configurações de produção

**Nota:** As configurações avançadas são opcionais e têm valores padrão definidos no código.

## 🛠️ Como Usar no Código

### 1. Importar o ConfigService

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class ExampleService {
  constructor(private configService: ConfigService) {}
}
```

### 2. Usar as configurações

```typescript
// Configurações do banco de dados
const dbConfig = this.configService.database;

// Configurações de autenticação
const authConfig = this.configService.auth;

// Configurações de CORS
const corsConfig = this.configService.cors;

// Verificar ambiente
if (this.configService.isDevelopment()) {
  console.log('Modo desenvolvimento');
}
```

### 3. Exemplo completo

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class DatabaseService {
  constructor(private configService: ConfigService) {}

  getConnectionString(): string {
    const db = this.configService.database;
    return `postgresql://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`;
  }

  shouldLogQueries(): boolean {
    return this.configService.database.logging && this.configService.isDevelopment();
  }
}
```

## 🔒 Segurança

### Variáveis Sensíveis

**NUNCA** commite estas variáveis no Git:

- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `EMAIL_PASSWORD`
- `REDIS_PASSWORD`

### Geração de Chaves Secretas

Para gerar chaves JWT seguras:

```bash
# Gerar chave JWT
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Gerar chave de refresh
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🌍 Ambientes

### Desenvolvimento

```env
NODE_ENV=development
DB_SYNCHRONIZE=true
DB_LOGGING=true
DEBUG=true
SWAGGER_ENABLED=true
```

### Produção

```env
NODE_ENV=production
DB_SYNCHRONIZE=false
DB_LOGGING=false
DEBUG=false
SWAGGER_ENABLED=false
COMPRESSION_ENABLED=true
HELMET_ENABLED=true
```

### Testes

```env
NODE_ENV=test
TEST_DB_DATABASE=goal_tracker_test_db
TEST_DB_SYNCHRONIZE=true
TEST_DB_LOGGING=false
```

## 🐳 Docker

Para usar com Docker, crie um `.env.docker`:

```env
NODE_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=goal_tracker_db
DB_SSL=false
```

## 🔍 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco:**
   - Verifique `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`
   - Certifique-se de que o PostgreSQL está rodando

2. **Erro de CORS:**
   - Verifique `CORS_ORIGIN` (deve ser a URL do frontend)
   - Certifique-se de que `CORS_CREDENTIALS=true`

3. **Erro de JWT:**
   - Verifique se `JWT_SECRET` está definido
   - Certifique-se de que a chave é longa e segura

4. **Erro de porta:**
   - Verifique se a porta `PORT` não está em uso
   - Certifique-se de que não há conflito com o frontend

### Comandos Úteis

```bash
# Verificar variáveis de ambiente
node -e "console.log(process.env.NODE_ENV)"

# Testar conexão com banco
psql -h localhost -U postgres -d goal_tracker_db

# Verificar logs
tail -f logs/app.log
```

## 📝 Notas Importantes

- O arquivo `.env` deve estar no `.gitignore`
- Sempre use `env.example` como template
- Teste as configurações antes do deploy
- Use diferentes configurações para cada ambiente
- Mantenha as chaves secretas seguras

## 🔗 Links Úteis

- [NestJS Config Module](https://docs.nestjs.com/techniques/configuration)
- [TypeORM Configuration](https://typeorm.io/#/connection-options)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/) 