# Résolution des problèmes d'affichage d'images

## Problème : Les images des slides ne s'affichent pas dans le panel d'admin

### Vérifications effectuées ✅

1. **Lien symbolique créé**
   ```bash
   php artisan storage:link
   ```
   Vérifie que `public/storage` pointe vers `storage/app/public`

2. **Images présentes**
   ```bash
   ls -la storage/app/public/slides/
   ```

3. **URL générée correctement**
   Le modèle Slide génère automatiquement `image_url` via l'accesseur `getImageUrlAttribute()`

4. **Image accessible via HTTP**
   ```bash
   curl -I http://localhost:8000/storage/slides/nom-fichier.jpg
   ```
   Devrait retourner `200 OK`

### Comment déboguer dans le navigateur

1. **Ouvrir la console développeur** (F12)
2. **Aller sur** `/admin/slides`
3. **Vérifier les logs** :
   ```
   Slides loaded: [...]
   ```
4. **Vérifier l'onglet Network/Réseau** pour voir si les images sont chargées

### Causes courantes et solutions

#### 1. Serveur Laravel sur un port différent

**Problème** : L'URL générée est `http://localhost:8000/...` mais le serveur tourne sur un autre port.

**Solution** : Mettre à jour `.env`
```env
APP_URL=http://localhost:VOTRE_PORT
```

Puis redémarrer le serveur :
```bash
php artisan config:clear
php artisan serve
```

#### 2. Utilisation de Vite en dev mode

**Problème** : Vite tourne sur `localhost:5173` et Laravel sur `localhost:8000`, causant des problèmes CORS.

**Solution 1** : Utiliser le build de production
```bash
npm run build
```

**Solution 2** : Configurer Vite pour le développement (déjà fait)
Les URLs sont automatiquement gérées par Inertia.

#### 3. Permissions de fichiers

**Problème** : Les images ne sont pas lisibles par le serveur web.

**Solution** :
```bash
chmod -R 755 storage/app/public/slides/
```

#### 4. Le lien symbolique est cassé

**Problème** : Le lien `public/storage` ne fonctionne pas correctement.

**Solution** :
```bash
# Supprimer l'ancien lien
rm public/storage

# Recréer le lien
php artisan storage:link
```

#### 5. Cache du navigateur

**Problème** : Anciennes versions en cache.

**Solution** :
- Vider le cache du navigateur (Ctrl+Shift+Delete)
- Ou ouvrir en mode privé/incognito

### Vérification rapide

Exécutez ce script pour tout vérifier :

```bash
#!/bin/bash

echo "=== Vérification des images ==="
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
    count=$(ls -1 storage/app/public/slides/*.jpg 2>/dev/null | wc -l)
    echo "✅ Dossier slides existe ($count images)"
else
    echo "❌ Dossier slides manquant"
fi
echo ""

echo "3. Vérification de l'APP_URL..."
grep "^APP_URL" .env || echo "❌ APP_URL non définie"
echo ""

echo "4. Test d'accès HTTP..."
first_image=$(ls storage/app/public/slides/*.jpg 2>/dev/null | head -n 1)
if [ -n "$first_image" ]; then
    filename=$(basename "$first_image")
    app_url=$(grep "^APP_URL" .env | cut -d '=' -f2)
    url="$app_url/storage/slides/$filename"
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    if [ "$status" = "200" ]; then
        echo "✅ Image accessible ($status)"
    else
        echo "❌ Image inaccessible ($status)"
    fi
    echo "   URL testée: $url"
else
    echo "⚠️  Aucune image à tester"
fi
```

Enregistrez ce script dans `scripts/check-images.sh` et exécutez :
```bash
chmod +x scripts/check-images.sh
./scripts/check-images.sh
```

### Dernière solution : Vérification manuelle

Si tout le reste échoue, testez manuellement :

1. **Trouvez une image dans** `storage/app/public/slides/`
2. **Copiez son nom** (ex: `abc123.jpg`)
3. **Construisez l'URL** : `http://localhost:8000/storage/slides/abc123.jpg`
4. **Ouvrez dans le navigateur** - l'image devrait s'afficher
5. **Si oui** : Le problème est dans le frontend React
6. **Si non** : Le problème est dans la configuration Laravel

### Configuration recommandée pour le développement

**fichier `.env`** :
```env
APP_URL=http://localhost:8000
ASSET_URL=
FILESYSTEM_DISK=public
```

**Commandes à exécuter** :
```bash
# Créer le lien symbolique
php artisan storage:link

# Nettoyer le cache
php artisan config:clear
php artisan cache:clear

# Recompiler les assets
npm run build

# Redémarrer le serveur
php artisan serve
```

### Logs de débogage ajoutés

Le code frontend a été modifié pour inclure :

1. **Console.log** lors du chargement des slides
   ```tsx
   console.log('Slides loaded:', json.data);
   ```

2. **Gestion d'erreur** sur les images
   ```tsx
   onError={(e) => {
     console.error('Image failed to load:', item.image_url);
     // Affiche "Erreur" à la place de l'image
   }}
   ```

Regardez la console du navigateur pour voir ces messages.

## Support

Si le problème persiste après avoir essayé toutes ces solutions :

1. **Capturez** :
   - Screenshot de la console navigateur (onglet Console)
   - Screenshot de l'onglet Network montrant la requête de l'image
   - Résultat de `./scripts/check-images.sh`

2. **Vérifiez** :
   - Quel navigateur utilisez-vous ?
   - Sur quel port tourne le serveur Laravel ?
   - Y a-t-il des messages d'erreur CORS ?

3. **Testez** en mode incognito pour éliminer les problèmes de cache
