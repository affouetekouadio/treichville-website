<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Actualite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ActualiteController extends Controller
{
    /**
     * Liste les actualités pour le backoffice (JSON simple pour l'UI Inertia).
     */
    public function index()
    {
        $items = Actualite::orderByDesc('est_flash_info')
            ->orderBy('ordre_affichage', 'asc')
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get()
            ->map(function ($item) {
                return array_merge($item->toArray(), [
                    'est_flash_info' => $item->est_flash_info,
                    'actif' => $item->actif,
                    'ordre_affichage' => $item->ordre_affichage,
                ]);
            });

        return response()->json([
            'data' => $items,
        ]);
    }

    /**
     * Crée une actualité (slug auto, gestion d'une image uploadée locale).
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titre' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'contenu' => ['nullable', 'string'],
                'categorie' => ['nullable', 'string', 'max:100'],
                'category_id' => ['nullable', 'exists:categories,id'],
                'status' => ['nullable', 'in:draft,published'],
                'published_at' => ['nullable', 'date'],
                'image' => ['nullable', 'file', 'image', 'max:4096'],
                'meta_title' => ['nullable', 'string', 'max:255'],
                'meta_description' => ['nullable', 'string'],
                'est_flash_info' => ['nullable', 'boolean'],
                'actif' => ['nullable', 'boolean'],
                'ordre_affichage' => ['nullable', 'integer', 'min:0'],
            ]);

            // Gestion du fichier image stocké localement (disk public).
            if ($request->hasFile('image')) {
                $validated['image_path'] = $request->file('image')->store('actualites', 'public');
            }

            $validated['slug'] = Str::slug($validated['titre']);

            $actualite = Actualite::create($validated);

            return response()->json([
                'data' => $actualite,
                'message' => 'Actualité créée avec succès',
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création de l\'actualité: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de l\'actualité',
            ], 500);
        }
    }

    /**
     * Met à jour une actualité et remplace l'image locale si fournie.
     */
    public function update(Request $request, Actualite $actualite)
    {
        try {
            $validated = $request->validate([
                'titre' => ['sometimes', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'contenu' => ['nullable', 'string'],
                'categorie' => ['nullable', 'string', 'max:100'],
                'category_id' => ['nullable', 'exists:categories,id'],
                'status' => ['nullable', 'in:draft,published'],
                'published_at' => ['nullable', 'date'],
                'image' => ['nullable', 'file', 'image', 'max:4096'],
                'meta_title' => ['nullable', 'string', 'max:255'],
                'meta_description' => ['nullable', 'string'],
                'est_flash_info' => ['nullable', 'boolean'],
                'actif' => ['nullable', 'boolean'],
                'ordre_affichage' => ['nullable', 'integer', 'min:0'],
            ]);

            if (array_key_exists('titre', $validated)) {
                $validated['slug'] = Str::slug($validated['titre']);
            }

            // Remplacement d'image (on supprime l'ancienne si elle est locale).
            if ($request->hasFile('image')) {
                $oldPath = $actualite->image_path;
                $isLocal = $oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/');
                if ($isLocal) {
                    Storage::disk('public')->delete($oldPath);
                }
                $validated['image_path'] = $request->file('image')->store('actualites', 'public');
            }

            $actualite->update($validated);

            return response()->json([
                'data' => $actualite->fresh(),
                'message' => 'Actualité mise à jour avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour de l\'actualité: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour de l\'actualité',
            ], 500);
        }
    }

    /**
     * Supprime une actualité ainsi que son image locale.
     */
    public function destroy(Actualite $actualite)
    {
        try {
            $oldPath = $actualite->image_path;
            $isLocal = $oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/');
            if ($isLocal) {
                Storage::disk('public')->delete($oldPath);
            }

            $actualite->delete();

            return response()->json([
                'message' => 'Actualité supprimée avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression de l\'actualité: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression de l\'actualité',
            ], 500);
        }
    }
}
