#!/bin/bash

# ========================================
# SCRIPT DE DEPLOY - COOLIFY
# ========================================

set -e

echo "🚀 Iniciando deploy no Coolify..."

# ========================================
# CONFIGURAÇÕES
# ========================================

# Nome da aplicação
APP_NAME="goal-tracker-api"
IMAGE_NAME="goal-tracker-api"
TAG="latest"

# ========================================
# VALIDAÇÕES
# ========================================

echo "🔍 Validando configurações..."

# Verificar se o Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando. Inicie o Docker e tente novamente."
    exit 1
fi

# Verificar se o arquivo .env existe
if [ ! -f ".env" ]; then
    echo "⚠️  Arquivo .env não encontrado. Criando arquivo básico..."
    npm run create-env
fi

# ========================================
# BUILD DA IMAGEM
# ========================================

echo "🔨 Construindo imagem Docker..."

# Build da imagem
docker build \
    --target production \
    --tag ${IMAGE_NAME}:${TAG} \
    --file Dockerfile \
    .

echo "✅ Imagem construída com sucesso!"

# ========================================
# TESTE LOCAL (OPCIONAL)
# ========================================

read -p "🧪 Deseja testar localmente antes do deploy? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧪 Testando aplicação localmente..."
    
    # Parar containers existentes
    docker-compose down 2>/dev/null || true
    
    # Iniciar com docker-compose
    docker-compose up -d
    
    # Aguardar inicialização
    echo "⏳ Aguardando inicialização..."
    sleep 30
    
    # Testar health check
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        echo "✅ Aplicação funcionando corretamente!"
    else
        echo "❌ Aplicação não está respondendo. Verifique os logs:"
        docker-compose logs api
        exit 1
    fi
    
    # Parar containers de teste
    docker-compose down
fi

# ========================================
# PREPARAÇÃO PARA COOLIFY
# ========================================

echo "📋 Preparando para deploy no Coolify..."

# Criar arquivo de configuração do Coolify
cat > coolify-deploy.yml << EOF
# ========================================
# CONFIGURAÇÃO COOLIFY - GOAL TRACKER API
# ========================================

# Informações da aplicação
application:
  name: ${APP_NAME}
  image: ${IMAGE_NAME}:${TAG}
  port: 3001

# Variáveis de ambiente (configure no painel do Coolify)
environment:
  - NODE_ENV=production
  - PORT=3001
  - DB_HOST=\${DB_HOST}
  - DB_PORT=5432
  - DB_USERNAME=\${DB_USERNAME}
  - DB_PASSWORD=\${DB_PASSWORD}
  - DB_DATABASE=\${DB_DATABASE}
  - DB_SYNCHRONIZE=false
  - DB_LOGGING=false
  - JWT_SECRET=\${JWT_SECRET}
  - JWT_EXPIRES_IN=7d
  - CORS_ORIGIN=\${CORS_ORIGIN}
  - CORS_CREDENTIALS=true
  - DEBUG=false
  - SWAGGER_ENABLED=false

# Health check
healthcheck:
  path: /health
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s

# Volumes
volumes:
  - ./logs:/app/logs
  - ./uploads:/app/uploads

# Rede
network: bridge
EOF

echo "✅ Arquivo de configuração do Coolify criado: coolify-deploy.yml"

# ========================================
# INSTRUÇÕES FINAIS
# ========================================

echo ""
echo "🎉 Deploy preparado com sucesso!"
echo ""
echo "📋 Próximos passos no Coolify:"
echo "1. Acesse o painel do Coolify"
echo "2. Crie uma nova aplicação"
echo "3. Configure as variáveis de ambiente:"
echo "   - DB_HOST (endereço do seu PostgreSQL)"
echo "   - DB_USERNAME (usuário do banco)"
echo "   - DB_PASSWORD (senha do banco)"
echo "   - DB_DATABASE (nome do banco)"
echo "   - JWT_SECRET (chave secreta JWT)"
echo "   - CORS_ORIGIN (URL do seu frontend)"
echo "4. Configure o domínio e SSL"
echo "5. Deploy!"
echo ""
echo "📁 Arquivos criados:"
echo "   - Dockerfile (imagem Docker)"
echo "   - docker-compose.yml (desenvolvimento)"
echo "   - coolify-deploy.yml (configuração Coolify)"
echo "   - .dockerignore (otimização)"
echo ""
echo "🔗 Para testar localmente:"
echo "   docker-compose up -d"
echo ""
echo "🚀 Para fazer push da imagem:"
echo "   docker tag ${IMAGE_NAME}:${TAG} seu-registro/${IMAGE_NAME}:${TAG}"
echo "   docker push seu-registro/${IMAGE_NAME}:${TAG}" 