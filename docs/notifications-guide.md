# Guide d'utilisation du système de notifications

Ce guide explique comment utiliser le système de notifications et de modals de confirmation dans l'application.

## 📢 Système de Notifications (Toasts)

### Import et utilisation

```tsx
import { useNotification } from '@/contexts/NotificationContext';

function MonComposant() {
  const { addNotification } = useNotification();

  const handleSuccess = () => {
    addNotification('success', 'Opération réussie !');
  };

  const handleError = () => {
    addNotification('error', 'Une erreur est survenue');
  };

  const handleWarning = () => {
    addNotification('warning', 'Attention, vérifiez vos données');
  };

  const handleInfo = () => {
    addNotification('info', 'Information importante', 8000); // 8 secondes
  };
}
```

### Types de notifications disponibles

- `success` : Opération réussie (vert)
- `error` : Erreur (rouge)
- `warning` : Avertissement (orange)
- `info` : Information (bleu)

### Paramètres

```tsx
addNotification(
  type: 'success' | 'error' | 'warning' | 'info',
  message: string,
  duration?: number // Durée en ms, défaut: 5000
);
```

## 🔔 Modal de Confirmation

### Import et utilisation

```tsx
import ConfirmDialog from '@/components/ConfirmDialog';
import { useState } from 'react';

function MonComposant() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Votre logique de suppression
      await deleteItem();
      addNotification('success', 'Élément supprimé');
    } catch (error) {
      addNotification('error', 'Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setConfirmOpen(true)}>
        Supprimer
      </button>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer cet élément ?"
        message="Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        type="danger"
        loading={loading}
      />
    </>
  );
}
```

### Props du ConfirmDialog

| Prop | Type | Description | Défaut |
|------|------|-------------|--------|
| `open` | `boolean` | État d'ouverture du modal | - |
| `onClose` | `() => void` | Callback de fermeture | - |
| `onConfirm` | `() => void` | Callback de confirmation | - |
| `title` | `string` | Titre du modal | "Confirmer l'action" |
| `message` | `string \| ReactNode` | Message ou contenu | "Êtes-vous sûr..." |
| `confirmText` | `string` | Texte du bouton de confirmation | "Confirmer" |
| `cancelText` | `string` | Texte du bouton d'annulation | "Annuler" |
| `type` | `'danger' \| 'warning' \| 'info'` | Type visuel | "warning" |
| `loading` | `boolean` | État de chargement | false |

### Types de modal

- `danger` : Rouge (suppression, action destructrice)
- `warning` : Orange (avertissement)
- `info` : Bleu (information)

## 📋 Exemple complet : Page CRUD

```tsx
import { useState, useEffect } from 'react';
import { useNotification } from '@/contexts/NotificationContext';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Trash2, Edit } from 'lucide-react';

function AdminPage() {
  const { addNotification } = useNotification();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);

  // Chargement des données
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const res = await fetch('/admin/api/items');
      const json = await res.json();
      setItems(json.data || []);
    } catch (error) {
      addNotification('error', 'Impossible de charger les données');
    } finally {
      setLoading(false);
    }
  };

  // Création/Modification
  const handleSubmit = async (formData) => {
    try {
      const res = await fetch('/admin/api/items', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erreur de sauvegarde');
      }

      const json = await res.json();
      addNotification('success', json.message || 'Élément créé avec succès');

      await loadItems();
    } catch (error) {
      addNotification('error', error.message);
    }
  };

  // Suppression
  const handleDeleteClick = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.id) return;

    setDeleting(true);
    try {
      const res = await fetch(`/admin/api/items/${deleteConfirm.id}`, {
        method: 'DELETE',
        headers: {
          'X-CSRF-TOKEN': csrf,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Erreur de suppression');
      }

      const json = await res.json();
      addNotification('success', json.message || 'Élément supprimé');

      await loadItems();
      setDeleteConfirm({ open: false, id: null });
    } catch (error) {
      addNotification('error', error.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Votre UI */}
      {items.map(item => (
        <div key={item.id}>
          <button onClick={() => handleDeleteClick(item.id)}>
            <Trash2 />
          </button>
        </div>
      ))}

      {/* Modal de confirmation */}
      <ConfirmDialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, id: null })}
        onConfirm={handleDeleteConfirm}
        title="Supprimer cet élément ?"
        message="Cette action est irréversible."
        type="danger"
        loading={deleting}
      />
    </div>
  );
}
```

## 💡 Bonnes pratiques

### 1. Gestion des erreurs

Toujours extraire le message d'erreur du backend :

```tsx
try {
  const res = await fetch(url, options);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Erreur par défaut');
  }

  const json = await res.json();
  addNotification('success', json.message);
} catch (error) {
  addNotification('error', error instanceof Error ? error.message : 'Une erreur est survenue');
}
```

### 2. État de chargement

Utiliser l'état `loading` pour désactiver les boutons pendant les opérations :

```tsx
<button onClick={handleAction} disabled={loading}>
  {loading ? 'Chargement...' : 'Action'}
</button>
```

### 3. Confirmation pour actions destructrices

Toujours utiliser un modal de confirmation pour :
- Suppressions
- Actions irréversibles
- Modifications importantes

### 4. Messages clairs

Utilisez des messages descriptifs et en français :

```tsx
// ✅ Bon
addNotification('success', 'Article publié avec succès');
addNotification('error', 'Impossible de télécharger l\'image');

// ❌ Éviter
addNotification('success', 'Done');
addNotification('error', 'Error');
```

## 🎨 Personnalisation

### Durée d'affichage

```tsx
// Notification persistante (ne disparaît pas automatiquement)
addNotification('info', 'Message important', 0);

// Notification courte
addNotification('success', 'Sauvegardé', 2000);

// Notification longue
addNotification('warning', 'Message détaillé...', 10000);
```

### Message avec contenu riche

Pour le modal de confirmation, vous pouvez passer du JSX :

```tsx
<ConfirmDialog
  message={
    <div>
      <p>Vous êtes sur le point de supprimer :</p>
      <ul className="list-disc pl-4 mt-2">
        <li>3 articles</li>
        <li>12 commentaires</li>
        <li>5 images</li>
      </ul>
    </div>
  }
/>
```

## 🔧 Configuration Backend

Assurez-vous que vos contrôleurs retournent les messages appropriés :

```php
// Succès
return response()->json([
    'data' => $item,
    'message' => 'Élément créé avec succès',
], 201);

// Erreur
return response()->json([
    'message' => 'Une erreur est survenue',
    'error' => $e->getMessage(),
], 500);
```

## 📱 Responsive

Les notifications et modals sont automatiquement responsive et s'adaptent aux petits écrans.

## 🎭 Animations

Les composants utilisent Framer Motion pour des animations fluides :
- Entrée/sortie des notifications
- Ouverture/fermeture des modals
- Transitions fluides

Pas besoin de configuration supplémentaire, tout est géré automatiquement !
