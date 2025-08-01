#!/bin/bash

# ========================================
# SCRIPT DE TESTE DO BUILD DOCKER
# ========================================

set -e

echo "🧪 Testando build Docker localmente..."

# ========================================
# CONFIGURAÇÕES
# ========================================

IMAGE_NAME="goal-tracker-api-test"
TAG="test"

# ========================================
# VALIDAÇÕES
# ========================================

echo "🔍 Validando arquivos necessários..."

# Verificar se o Dockerfile existe
if [ ! -f "Dockerfile" ]; then
    echo "❌ Dockerfile não encontrado!"
    exit 1
fi

# Verificar se o package.json existe
if [ ! -f "package.json" ]; then
    echo "❌ package.json não encontrado!"
    exit 1
fi

# Verificar se o arquivo ENV-SETUP.md existe
if [ ! -f "ENV-SETUP.md" ]; then
    echo "❌ ENV-SETUP.md não encontrado!"
    exit 1
fi

# Verificar se o arquivo env.example existe
if [ ! -f "env.example" ]; then
    echo "❌ env.example não encontrado!"
    exit 1
fi

echo "✅ Todos os arquivos necessários encontrados!"

# ========================================
# LIMPEZA
# ========================================

echo "🧹 Limpando builds anteriores..."

# Remover imagem de teste anterior
docker rmi ${IMAGE_NAME}:${TAG} 2>/dev/null || true

# ========================================
# BUILD
# ========================================

echo "🔨 Iniciando build da imagem..."

# Build da imagem
docker build \
    --target production \
    --tag ${IMAGE_NAME}:${TAG} \
    --file Dockerfile \
    .

echo "✅ Build concluído com sucesso!"

# ========================================
# TESTE DA IMAGEM
# ========================================

echo "🧪 Testando imagem criada..."

# Verificar se a imagem foi criada
if docker images | grep -q "${IMAGE_NAME}.*${TAG}"; then
    echo "✅ Imagem criada com sucesso!"
else
    echo "❌ Falha ao criar imagem!"
    exit 1
fi

# Testar se a aplicação inicia corretamente
echo "🚀 Testando inicialização da aplicação..."

# Executar container em background
CONTAINER_ID=$(docker run -d \
    --name goal-tracker-test \
    --env NODE_ENV=production \
    --env PORT=3001 \
    --env DB_HOST=localhost \
    --env DB_PORT=5432 \
    --env DB_USERNAME=test \
    --env DB_PASSWORD=test \
    --env DB_DATABASE=test \
    --env JWT_SECRET=test_secret \
    --env CORS_ORIGIN=http://localhost:3000 \
    ${IMAGE_NAME}:${TAG})

echo "⏳ Aguardando inicialização..."
sleep 10

# Verificar se o container está rodando
if docker ps | grep -q "goal-tracker-test"; then
    echo "✅ Container iniciado com sucesso!"
else
    echo "❌ Falha ao iniciar container!"
    docker logs goal-tracker-test
    docker rm -f goal-tracker-test 2>/dev/null || true
    exit 1
fi

# ========================================
# LIMPEZA FINAL
# ========================================

echo "🧹 Limpando recursos de teste..."

# Parar e remover container de teste
docker rm -f goal-tracker-test 2>/dev/null || true

# Remover imagem de teste
docker rmi ${IMAGE_NAME}:${TAG} 2>/dev/null || true

# ========================================
# RESULTADO
# ========================================

echo ""
echo "🎉 Teste concluído com sucesso!"
echo ""
echo "✅ Dockerfile está funcionando corretamente"
echo "✅ Build da imagem foi bem-sucedido"
echo "✅ Aplicação inicia sem erros"
echo ""
echo "🚀 Agora você pode fazer deploy no Coolify!"
echo ""
echo "📋 Próximos passos:"
echo "1. Faça commit das alterações"
echo "2. Push para o repositório"
echo "3. Configure as variáveis no Coolify"
echo "4. Deploy!" 