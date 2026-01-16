# Guide d'utilisation du composant ImagePreviewModal

Ce guide explique comment utiliser le composant de prévisualisation d'images avec zoom.

## 📸 ImagePreviewModal

Composant modal pour afficher et zoomer sur des images.

### Import

```tsx
import ImagePreviewModal from '@/components/ImagePreviewModal';
import { useState } from 'react';
```

### Utilisation basique

```tsx
function MonComposant() {
  const [preview, setPreview] = useState({
    open: false,
    url: '',
    title: '',
  });

  return (
    <>
      {/* Bouton ou image cliquable */}
      <img
        src="/path/to/thumbnail.jpg"
        alt="Miniature"
        onClick={() =>
          setPreview({
            open: true,
            url: '/path/to/full-image.jpg',
            title: 'Nom de l\'image',
          })
        }
        className="cursor-pointer"
      />

      {/* Modal de prévisualisation */}
      <ImagePreviewModal
        open={preview.open}
        onClose={() => setPreview({ open: false, url: '', title: '' })}
        imageUrl={preview.url}
        title={preview.title}
      />
    </>
  );
}
```

## 🎨 Features

### 1. Zoom
- **Boutons +/- dans le header** : Zoom de 50% à 300%
- **Raccourcis clavier** : `+` ou `=` pour zoomer, `-` pour dézoomer
- **Affichage du niveau de zoom** : Pourcentage affiché en temps réel

### 2. Téléchargement
- Bouton de téléchargement dans le header
- Télécharge l'image avec le titre comme nom de fichier

### 3. Navigation clavier
- `ESC` : Fermer le modal
- `+` ou `=` : Zoomer
- `-` : Dézoomer

### 4. Interface utilisateur
- **Backdrop flouté** : Effet de profondeur
- **Header translucide** : Contrôles toujours visibles
- **Animations fluides** : Entrée/sortie avec Framer Motion
- **Responsive** : S'adapte à tous les écrans

## 📋 Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `open` | `boolean` | ✅ | État d'ouverture du modal |
| `onClose` | `() => void` | ✅ | Callback de fermeture |
| `imageUrl` | `string` | ✅ | URL de l'image à afficher |
| `title` | `string` | ❌ | Titre affiché dans le header |

## 💡 Exemples avancés

### Avec miniature interactive

```tsx
function ImageCard({ image }: { image: { url: string; title: string } }) {
  const [preview, setPreview] = useState({ open: false, url: '', title: '' });

  return (
    <>
      <div className="relative group">
        <img
          src={image.url}
          alt={image.title}
          className="w-full h-48 object-cover rounded-lg cursor-pointer transition-transform group-hover:scale-105"
          onClick={() => setPreview({ open: true, url: image.url, title: image.title })}
        />

        {/* Overlay au hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>

      <ImagePreviewModal
        open={preview.open}
        onClose={() => setPreview({ open: false, url: '', title: '' })}
        imageUrl={preview.url}
        title={preview.title}
      />
    </>
  );
}
```

### Dans un tableau (comme la page Slides)

```tsx
function SlidesList({ slides }: { slides: SlideItem[] }) {
  const [imageModal, setImageModal] = useState({
    open: false,
    url: '',
    title: '',
  });

  return (
    <>
      <table>
        <tbody>
          {slides.map((slide) => (
            <tr key={slide.id}>
              <td>
                <button
                  onClick={() =>
                    setImageModal({
                      open: true,
                      url: slide.image_url,
                      title: slide.title,
                    })
                  }
                  className="relative group cursor-pointer"
                  title="Cliquer pour agrandir"
                >
                  <img
                    src={slide.image_url}
                    alt={slide.title}
                    className="h-12 w-20 rounded object-cover group-hover:ring-2 group-hover:ring-blue-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                    <ZoomInIcon className="h-5 w-5 text-white" />
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ImagePreviewModal
        open={imageModal.open}
        onClose={() => setImageModal({ open: false, url: '', title: '' })}
        imageUrl={imageModal.url}
        title={imageModal.title}
      />
    </>
  );
}
```

### Galerie d'images

```tsx
function ImageGallery({ images }: { images: Array<{ url: string; title: string }> }) {
  const [preview, setPreview] = useState({ open: false, url: '', title: '' });

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer group"
            onClick={() => setPreview({ open: true, url: image.url, title: image.title })}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors rounded-lg flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                Cliquer pour agrandir
              </span>
            </div>
          </div>
        ))}
      </div>

      <ImagePreviewModal
        open={preview.open}
        onClose={() => setPreview({ open: false, url: '', title: '' })}
        imageUrl={preview.url}
        title={preview.title}
      />
    </>
  );
}
```

## 🎨 Personnalisation CSS

Le composant utilise Tailwind CSS. Vous pouvez personnaliser les miniatures :

```tsx
// Miniature avec border au hover
<img
  className="rounded-lg cursor-pointer transition-all hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"
/>

// Miniature avec ombre au hover
<img
  className="rounded-lg cursor-pointer transition-shadow hover:shadow-xl"
/>

// Miniature avec zoom au hover
<img
  className="rounded-lg cursor-pointer transition-transform hover:scale-105"
/>
```

## 🔧 Intégration dans votre projet

### Étape 1 : Ajouter le composant

Le composant est déjà disponible dans `resources/js/components/ImagePreviewModal.tsx`

### Étape 2 : Utiliser dans vos pages

```tsx
import ImagePreviewModal from '@/components/ImagePreviewModal';
```

### Étape 3 : Gérer l'état

```tsx
const [preview, setPreview] = useState({
  open: false,
  url: '',
  title: '',
});
```

### Étape 4 : Ajouter les événements

```tsx
// Au clic sur une image
onClick={() => setPreview({ open: true, url: imageUrl, title: imageTitle })}

// Dans le modal
<ImagePreviewModal
  open={preview.open}
  onClose={() => setPreview({ open: false, url: '', title: '' })}
  imageUrl={preview.url}
  title={preview.title}
/>
```

## 💡 Bonnes pratiques

### 1. Performances
- Utilisez des miniatures optimisées pour les listes
- Chargez l'image complète uniquement dans le modal

### 2. Accessibilité
- Ajoutez toujours un `alt` sur les miniatures
- Utilisez `title` sur les boutons cliquables
- Le modal gère automatiquement la touche `ESC`

### 3. UX
- Ajoutez un indicateur visuel au hover (ring, shadow, etc.)
- Utilisez le cursor pointer
- Affichez une icône de zoom au hover

### 4. Images responsives
```tsx
<img
  src={image.url}
  alt={image.title}
  className="h-12 w-20 sm:h-16 sm:w-24 md:h-20 md:w-32 object-cover"
/>
```

## 🐛 Résolution de problèmes

### L'image ne s'affiche pas
- Vérifiez que `imageUrl` est valide
- Vérifiez les CORS si l'image est externe
- Utilisez l'onglet Network pour voir les erreurs

### Le modal ne se ferme pas avec ESC
- Vérifiez que le modal est bien ouvert (`open={true}`)
- Assurez-vous qu'aucun autre gestionnaire d'événements n'interfère

### Le zoom ne fonctionne pas
- Le zoom est limité entre 50% et 300%
- Vérifiez la console pour d'éventuelles erreurs

## 📚 Ressources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🎯 Exemple complet : Page des Slides

Voir le fichier [Index.tsx](../resources/js/Pages/Backend/Slides/Index.tsx) pour un exemple complet d'intégration dans une page CRUD.
