#!/bin/bash

echo "=== Vérification des images des slides ==="
echo ""

echo "1. Vérification du lien symbolique..."
if [ -L "public/storage" ]; then
    echo "✅ Lien symbolique existe"
    ls -la public/storage | head -n 1
else
    echo "❌ Lien symbolique manquant"
    echo "   Exécutez: php artisan storage:link"
fi
echo ""

echo "2. Vérification du dossier slides..."
if [ -d "storage/app/public/slides" ]; then
    count=$(find storage/app/public/slides -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) 2>/dev/null | wc -l | tr -d ' ')
    echo "✅ Dossier slides existe ($count images)"
    if [ "$count" -gt 0 ]; then
        echo ""
        echo "   Images trouvées:"
        find storage/app/public/slides -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) -exec basename {} \; | head -n 5
    fi
else
    echo "❌ Dossier slides manquant"
    echo "   Le dossier sera créé automatiquement lors du premier upload"
fi
echo ""

echo "3. Vérification de l'APP_URL..."
if [ -f ".env" ]; then
    app_url=$(grep "^APP_URL" .env | cut -d '=' -f2)
    if [ -n "$app_url" ]; then
        echo "✅ APP_URL définie: $app_url"
    else
        echo "❌ APP_URL non définie dans .env"
    fi
else
    echo "❌ Fichier .env introuvable"
fi
echo ""

echo "4. Test d'accès HTTP..."
first_image=$(find storage/app/public/slides -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) 2>/dev/null | head -n 1)
if [ -n "$first_image" ]; then
    filename=$(basename "$first_image")
    app_url=$(grep "^APP_URL" .env | cut -d '=' -f2)
    url="$app_url/storage/slides/$filename"

    echo "   Test de l'URL: $url"
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)

    if [ "$status" = "200" ]; then
        echo "✅ Image accessible (HTTP $status)"
    else
        echo "❌ Image inaccessible (HTTP $status)"
        echo ""
        echo "   Causes possibles:"
        echo "   - Le serveur Laravel n'est pas démarré"
        echo "   - Le serveur tourne sur un port différent"
        echo "   - Problème de permissions sur les fichiers"
    fi
else
    echo "⚠️  Aucune image à tester - uploadez une image via l'admin"
fi
echo ""

echo "5. Vérification des permissions..."
if [ -d "storage/app/public/slides" ]; then
    perms=$(stat -f "%OLp" storage/app/public/slides 2>/dev/null || stat -c "%a" storage/app/public/slides 2>/dev/null)
    if [ "$perms" = "755" ] || [ "$perms" = "775" ]; then
        echo "✅ Permissions correctes ($perms)"
    else
        echo "⚠️  Permissions: $perms (recommandé: 755)"
        echo "   Exécutez: chmod -R 755 storage/app/public/slides/"
    fi
else
    echo "⏭️  Dossier slides pas encore créé"
fi
echo ""

echo "=== Résumé ==="
echo ""
echo "Pour tester manuellement, visitez:"
if [ -n "$app_url" ] && [ -n "$filename" ]; then
    echo "  $app_url/storage/slides/$filename"
fi
echo ""
echo "Pour déboguer dans le navigateur:"
echo "  1. Allez sur $app_url/admin/slides"
echo "  2. Ouvrez la console (F12)"
echo "  3. Vérifiez les logs et l'onglet Network"
echo ""
