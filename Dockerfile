# ========================================
# DOCKERFILE - GOAL TRACKER API BACKEND
# ========================================
# Multi-stage build para otimizar tamanho e segurança

# ========================================
# STAGE 1: BUILD - Compilação da aplicação
# ========================================

FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Copiar código fonte
COPY src/ ./src/
COPY scripts/ ./scripts/

# Compilar aplicação
RUN npm run build

# ========================================
# STAGE 2: PRODUCTION - Imagem final
# ========================================

FROM node:18-alpine AS production

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json para instalar apenas dependências de produção
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production && npm cache clean --force

# Copiar arquivos compilados do stage anterior
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/scripts ./scripts

# Copiar arquivos de configuração
COPY --chown=nestjs:nodejs env.example ./
COPY --chown=nestjs:nodejs ENV-SETUP.md ./

# Criar diretórios necessários
RUN mkdir -p logs uploads && chown -R nestjs:nodejs logs uploads

# Mudar para usuário não-root
USER nestjs

# Expor porta
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Comando para iniciar a aplicação
CMD ["node", "dist/main"] 