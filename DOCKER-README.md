# 🐳 Docker & Coolify - Goal Tracker API

Este documento explica como fazer deploy da API usando Docker e Coolify.

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- Conta no Coolify (ou outro servidor)
- PostgreSQL configurado

## 🚀 Deploy Rápido

### 1. Preparar o Projeto

```bash
# Criar arquivo .env
npm run create-env

# Gerar chaves secretas
npm run generate-secrets

# Validar configurações
npm run validate-env
```

### 2. Build da Imagem

```bash
# Testar build localmente primeiro
npm run docker:test

# Build da imagem Docker
docker build -t goal-tracker-api:latest .

# Ou usar o script automatizado
npm run docker:deploy
```

### 3. Teste Local

```bash
# Testar com docker-compose
docker-compose up -d

# Verificar logs
docker-compose logs -f api

# Testar health check
curl http://localhost:3001/health
```

## 🌐 Deploy no Coolify

### 1. Configuração no Coolify

1. **Acesse o painel do Coolify**
2. **Crie uma nova aplicação**
3. **Configure o repositório Git**
4. **Configure as variáveis de ambiente:**

```env
# Configurações básicas
NODE_ENV=production
PORT=3001

# Banco de dados
DB_HOST=seu-postgres-host
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=goal_tracker_db
DB_SYNCHRONIZE=false
DB_LOGGING=false

# JWT
JWT_SECRET=sua_chave_secreta_jwt_muito_segura_e_longa
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://seu-dominio.com
CORS_CREDENTIALS=true

# Produção
DEBUG=false
SWAGGER_ENABLED=false
```

### 2. Configuração do Dockerfile

O Coolify usará automaticamente o `Dockerfile` na raiz do projeto.

### 3. Health Check

O endpoint `/health` será usado para verificar se a aplicação está funcionando.

## 🔧 Configurações Avançadas

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NODE_ENV` | Ambiente da aplicação | `production` |
| `PORT` | Porta da aplicação | `3001` |
| `DB_HOST` | Host do PostgreSQL | - |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `DB_USERNAME` | Usuário do banco | - |
| `DB_PASSWORD` | Senha do banco | - |
| `DB_DATABASE` | Nome do banco | - |
| `JWT_SECRET` | Chave secreta JWT | - |
| `CORS_ORIGIN` | URL do frontend | - |

### Volumes

A aplicação usa os seguintes volumes:

- `./logs:/app/logs` - Logs da aplicação
- `./uploads:/app/uploads` - Arquivos enviados

### Portas

- **3001** - API da aplicação

## 🐳 Comandos Docker Úteis

### Build

```bash
# Build da imagem
docker build -t goal-tracker-api:latest .

# Build com tag específica
docker build -t goal-tracker-api:v1.0.0 .

# Build para produção
docker build --target production -t goal-tracker-api:prod .
```

### Execução

```bash
# Executar container
docker run -p 3001:3001 --env-file .env goal-tracker-api:latest

# Executar em background
docker run -d -p 3001:3001 --env-file .env --name goal-tracker-api goal-tracker-api:latest

# Executar com docker-compose
docker-compose up -d
```

### Logs e Debug

```bash
# Ver logs
docker logs goal-tracker-api

# Ver logs em tempo real
docker logs -f goal-tracker-api

# Executar com shell interativo
docker run -it --rm goal-tracker-api:latest sh

# Inspecionar container
docker inspect goal-tracker-api
```

## 🔍 Troubleshooting

### Problemas Comuns

#### Erro: "ENV-SETUP.md: not found"

Se você encontrar este erro no Coolify:

```bash
ERROR: failed to solve: failed to compute cache key: failed to calculate checksum of ref: "/ENV-SETUP.md": not found
```

**Solução:**
1. Verifique se o arquivo `ENV-SETUP.md` existe na raiz do projeto
2. Execute o teste local: `npm run docker:test`
3. Se o teste passar, o problema pode ser cache do Coolify
4. Tente fazer um novo commit para forçar rebuild

#### Erro: "Build failed"

Se o build falhar no Coolify:

1. **Teste localmente primeiro:**
   ```bash
   npm run docker:test
   ```

2. **Verifique os logs do build:**
   - Acesse o painel do Coolify
   - Clique em "Show Debug Logs"
   - Procure por erros específicos

3. **Problemas comuns:**
   - Arquivos faltando (verifique se todos os arquivos estão commitados)
   - Dependências não instaladas
   - Erro de sintaxe no código

1. **Erro de conexão com banco:**
   ```bash
   # Verificar se o PostgreSQL está acessível
   docker exec -it goal-tracker-api nc -zv DB_HOST 5432
   ```

2. **Erro de permissão:**
   ```bash
   # Verificar permissões dos volumes
   docker exec -it goal-tracker-api ls -la /app/logs
   ```

3. **Erro de memória:**
   ```bash
   # Aumentar memória do container
   docker run -m 512m goal-tracker-api:latest
   ```

### Logs de Debug

```bash
# Ver logs detalhados
docker-compose logs -f api

# Ver logs do PostgreSQL
docker-compose logs -f postgres

# Ver logs do Redis
docker-compose logs -f redis
```

## 📊 Monitoramento

### Health Check

```bash
# Testar health check
curl http://localhost:3001/health

# Resposta esperada:
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

### Métricas

A aplicação expõe métricas básicas no endpoint `/health`.

## 🔒 Segurança

### Boas Práticas

1. **Nunca commite arquivos `.env`**
2. **Use chaves JWT seguras**
3. **Configure CORS adequadamente**
4. **Use HTTPS em produção**
5. **Mantenha as dependências atualizadas**

### Variáveis Sensíveis

```bash
# Gerar chave JWT segura
npm run generate-secrets

# Validar configurações
npm run validate-env
```

## 📝 Notas Importantes

- A aplicação roda como usuário não-root por segurança
- Health checks são executados a cada 30 segundos
- Logs são salvos em `/app/logs`
- Uploads são salvos em `/app/uploads`
- A aplicação reinicia automaticamente em caso de falha

## 🔗 Links Úteis

- [Docker Documentation](https://docs.docker.com/)
- [Coolify Documentation](https://coolify.io/docs)
- [NestJS Docker Guide](https://docs.nestjs.com/deployment)
- [PostgreSQL Docker](https://hub.docker.com/_/postgres) 