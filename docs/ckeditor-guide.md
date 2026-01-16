# Guide CKEditor avec Upload d'Images

Ce guide explique comment utiliser le composant RichTextEditor amélioré avec support d'upload d'images.

## Corrections apportées

### 1. Problème de double affichage (CORRIGÉ)

**Problème**: Deux instances de CKEditor s'affichaient lors de l'ouverture du formulaire d'actualité.

**Solution**:
- Ajout d'un flag `isInitialized` pour éviter les doubles initialisations
- Amélioration du nettoyage avec `mounted` flag
- Dépendances vides dans le useEffect principal pour n'initialiser qu'une seule fois
- Destruction correcte de l'instance lors du démontage

### 2. Upload d'images dans CKEditor (AJOUTÉ)

**Nouveau**: Support complet de l'upload d'images directement depuis l'éditeur.

## Fonctionnalités

### Upload d'images
- Glisser-déposer d'images dans l'éditeur
- Bouton "imageUpload" dans la barre d'outils
- Validation automatique:
  - Taille max: 4 Mo
  - Formats acceptés: JPEG, PNG, GIF, WebP
- Messages d'erreur clairs en cas de problème

### Toolbar enrichie
La barre d'outils CKEditor inclut désormais:
- **Formatage**: Titres (heading), Gras, Italique
- **Listes**: Puces, Numérotation
- **Liens**: Insertion de liens
- **Images**: Upload et insertion d'images
- **Tableaux**: Création et édition de tableaux
- **Citations**: Blocs de citation
- **Médias**: Intégration de médias (YouTube, etc.)
- **Undo/Redo**: Annuler/Refaire

## Utilisation

### Dans un formulaire

```tsx
import RichTextEditor from '@/components/Admin/RichTextEditor';

function MonFormulaire() {
  const [contenu, setContenu] = useState('');

  return (
    <div>
      <label>Contenu</label>
      <RichTextEditor
        value={contenu}
        onChange={(val) => setContenu(val)}
        placeholder="Saisir le contenu complet"
      />
    </div>
  );
}
```

### Upload d'images

Pour uploader une image dans l'éditeur:

1. **Via le bouton**: Cliquez sur l'icône d'image dans la barre d'outils
2. **Via glisser-déposer**: Glissez une image directement dans l'éditeur
3. **Via copier-coller**: Copiez une image et collez-la dans l'éditeur

L'image est automatiquement uploadée sur le serveur et insérée dans le contenu.

## Architecture technique

### Frontend

**Fichier**: [resources/js/components/Admin/RichTextEditor.tsx](../resources/js/components/Admin/RichTextEditor.tsx)

**Composants clés**:

```typescript
// Adaptateur d'upload personnalisé
class CustomUploadAdapter {
  async upload() {
    const file = await this.loader.file;

    // Validation
    if (file.size > 4 * 1024 * 1024) {
      throw new Error('Image trop volumineuse (max 4 Mo)');
    }

    // Upload vers le serveur
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/admin/api/upload-editor-image', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return { default: data.url };
  }
}
```

**Configuration CKEditor**:

```typescript
const editor = await ClassicEditor.create(element, {
  extraPlugins: [CustomUploadAdapterPlugin],
  toolbar: {
    items: [
      'heading', '|',
      'bold', 'italic', 'link',
      'bulletedList', 'numberedList', '|',
      'outdent', 'indent', '|',
      'imageUpload', 'blockQuote', 'insertTable',
      'mediaEmbed', 'undo', 'redo',
    ],
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
    ],
  },
});
```

### Backend

**Contrôleur**: [app/Http/Controllers/Admin/EditorImageController.php](../app/Http/Controllers/Admin/EditorImageController.php)

```php
public function upload(Request $request)
{
    // Validation
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
    ]);

    // Génération d'un nom unique
    $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();

    // Stockage dans public/storage/editor-images
    $path = $image->storeAs('editor-images', $filename, 'public');

    // Retour de l'URL publique
    $url = Storage::disk('public')->url($path);

    return response()->json(['url' => $url]);
}
```

**Route**: [routes/web.php](../routes/web.php)

```php
Route::post('/api/upload-editor-image', [EditorImageController::class, 'upload'])
    ->name('api.upload-editor-image');
```

## Gestion d'erreurs

### Erreurs de validation

L'upload d'image valide automatiquement:
- **Taille**: Maximum 4 Mo
- **Type**: Doit être une image (JPEG, PNG, GIF, WebP)

Messages d'erreur:
- `"L'image est trop volumineuse (max 4 Mo)"` - Fichier > 4 Mo
- `"Le fichier doit être une image"` - Type de fichier invalide
- `"Erreur lors de l'upload"` - Erreur serveur

### Fallback textarea

Si CKEditor ne peut pas se charger (problème réseau, erreur de script), le composant bascule automatiquement sur une simple textarea:

```tsx
if (failed) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={8}
    />
  );
}
```

## Stockage des images

### Emplacement
Les images uploadées depuis CKEditor sont stockées dans:
```
storage/app/public/editor-images/
```

Accessible publiquement via:
```
public/storage/editor-images/
```

### URL des images
Format de l'URL générée:
```
/storage/editor-images/[nom-aleatoire-20-caracteres].[extension]
```

Exemple:
```
/storage/editor-images/aBcDeFgHiJkLmNoPqRsT.jpg
```

## Bonnes pratiques

### 1. Optimiser les images avant upload
Bien que la limite soit de 4 Mo, il est recommandé de:
- Compresser les images avant upload
- Utiliser des dimensions raisonnables (max 1920px de largeur)
- Préférer JPEG pour les photos, PNG pour les graphiques

### 2. Nettoyage des images non utilisées
Pensez à créer une tâche cron pour supprimer les images orphelines:
```php
// Exemple de commande artisan
php artisan editor:cleanup-images
```

### 3. Sécurité
- Les images sont validées côté serveur (type MIME, taille)
- Noms de fichiers aléatoires pour éviter les conflits
- Stockage dans un dossier dédié

## Dépannage

### L'éditeur ne se charge pas
1. Vérifier la console du navigateur pour les erreurs
2. Vérifier que le CDN CKEditor est accessible
3. Le composant basculera automatiquement sur une textarea

### Les images ne s'uploadent pas
1. Vérifier que le symbolic link existe:
   ```bash
   php artisan storage:link
   ```
2. Vérifier les permissions du dossier storage:
   ```bash
   chmod -R 775 storage/app/public
   ```
3. Vérifier que la route `/admin/api/upload-editor-image` est accessible

### Erreur "Image trop volumineuse"
- Vérifier que l'image fait moins de 4 Mo
- Compresser l'image avant upload

### Deux éditeurs s'affichent
Ce problème a été corrigé. Si vous le rencontrez encore:
1. Vider le cache du navigateur
2. Recompiler les assets: `npm run build`

## Ressources

- [CKEditor 5 Documentation](https://ckeditor.com/docs/ckeditor5/latest/)
- [CKEditor Image Upload](https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html)
- [Laravel File Storage](https://laravel.com/docs/filesystem)

## Exemple complet

Voir l'implémentation dans:
- [resources/js/Pages/Backend/Actualites/Index.tsx](../resources/js/Pages/Backend/Actualites/Index.tsx) - Utilisation dans le formulaire d'actualités
- [resources/js/components/Admin/RichTextEditor.tsx](../resources/js/components/Admin/RichTextEditor.tsx) - Composant complet
