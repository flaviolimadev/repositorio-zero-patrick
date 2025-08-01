#!/bin/bash

# ========================================
# SCRIPT PARA ALTERNAR DOCKERFILES
# ========================================

set -e

echo "🔄 Alternando Dockerfile..."

# ========================================
# VERIFICAR ARGUMENTO
# ========================================

if [ "$1" = "no-healthcheck" ]; then
    echo "📋 Alternando para Dockerfile SEM health check..."
    
    # Fazer backup do Dockerfile atual
    if [ -f "Dockerfile" ]; then
        mv Dockerfile Dockerfile.with-healthcheck
        echo "✅ Dockerfile atual salvo como Dockerfile.with-healthcheck"
    fi
    
    # Usar Dockerfile sem health check
    if [ -f "Dockerfile.no-healthcheck" ]; then
        mv Dockerfile.no-healthcheck Dockerfile
        echo "✅ Dockerfile sem health check ativado"
    else
        echo "❌ Dockerfile.no-healthcheck não encontrado!"
        exit 1
    fi
    
elif [ "$1" = "with-healthcheck" ]; then
    echo "📋 Alternando para Dockerfile COM health check..."
    
    # Fazer backup do Dockerfile atual
    if [ -f "Dockerfile" ]; then
        mv Dockerfile Dockerfile.no-healthcheck
        echo "✅ Dockerfile atual salvo como Dockerfile.no-healthcheck"
    fi
    
    # Usar Dockerfile com health check
    if [ -f "Dockerfile.with-healthcheck" ]; then
        mv Dockerfile.with-healthcheck Dockerfile
        echo "✅ Dockerfile com health check ativado"
    else
        echo "❌ Dockerfile.with-healthcheck não encontrado!"
        exit 1
    fi
    
else
    echo "❌ Uso incorreto!"
    echo ""
    echo "Uso:"
    echo "  $0 no-healthcheck    # Usar Dockerfile sem health check"
    echo "  $0 with-healthcheck  # Usar Dockerfile com health check"
    echo ""
    echo "Exemplo:"
    echo "  $0 no-healthcheck"
    exit 1
fi

# ========================================
# VERIFICAR RESULTADO
# ========================================

echo ""
echo "🔍 Verificando Dockerfile atual..."

if [ -f "Dockerfile" ]; then
    echo "✅ Dockerfile encontrado"
    
    # Verificar se tem health check
    if grep -q "HEALTHCHECK" Dockerfile; then
        echo "📋 Dockerfile COM health check"
    else
        echo "📋 Dockerfile SEM health check"
    fi
else
    echo "❌ Dockerfile não encontrado!"
    exit 1
fi

# ========================================
# INSTRUÇÕES
# ========================================

echo ""
echo "🎯 Próximos passos:"
echo "1. Teste localmente: npm run docker:test"
echo "2. Commit das alterações:"
echo "   git add ."
echo "   git commit -m \"Switch to Dockerfile $1\""
echo "3. Push para o repositório:"
echo "   git push"
echo "4. Deploy no Coolify"
echo ""
echo "💡 Dica: Se o health check continuar falhando no Coolify,"
echo "   desabilite-o nas configurações da aplicação." 