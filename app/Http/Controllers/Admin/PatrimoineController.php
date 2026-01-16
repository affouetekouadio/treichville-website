<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patrimoine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Contrôleur pour la gestion des patrimoines (monuments et lieux patrimoniaux)
 */
class PatrimoineController extends Controller
{
    /**
     * Liste les patrimoines pour le backoffice
     */
    public function index()
    {
        $items = Patrimoine::orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'data' => $items,
        ]);
    }

    /**
     * Crée un patrimoine (slug auto, gestion d'une image uploadée locale)
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
                'lieu' => ['nullable', 'string', 'max:255'],
                'status' => ['nullable', 'in:draft,published'],
                'published_at' => ['nullable', 'date'],
                'image' => ['nullable', 'file', 'image', 'max:4096'],
                'meta_title' => ['nullable', 'string', 'max:255'],
                'meta_description' => ['nullable', 'string'],
            ]);

            // Gestion du fichier image stocké localement (disk public)
            if ($request->hasFile('image')) {
                $validated['image_path'] = $request->file('image')->store('patrimoines', 'public');
            }

            $validated['slug'] = Str::slug($validated['titre']);

            $patrimoine = Patrimoine::create($validated);

            return response()->json([
                'data' => $patrimoine,
                'message' => 'Patrimoine créé avec succès',
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création du patrimoine: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du patrimoine',
            ], 500);
        }
    }

    /**
     * Met à jour un patrimoine et remplace l'image locale si fournie
     */
    public function update(Request $request, Patrimoine $patrimoine)
    {
        try {
            $validated = $request->validate([
                'titre' => ['sometimes', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'contenu' => ['nullable', 'string'],
                'categorie' => ['nullable', 'string', 'max:100'],
                'category_id' => ['nullable', 'exists:categories,id'],
                'lieu' => ['nullable', 'string', 'max:255'],
                'status' => ['nullable', 'in:draft,published'],
                'published_at' => ['nullable', 'date'],
                'image' => ['nullable', 'file', 'image', 'max:4096'],
                'meta_title' => ['nullable', 'string', 'max:255'],
                'meta_description' => ['nullable', 'string'],
            ]);

            if (array_key_exists('titre', $validated)) {
                $validated['slug'] = Str::slug($validated['titre']);
            }

            // Remplacement d'image (on supprime l'ancienne si elle est locale)
            if ($request->hasFile('image')) {
                $oldPath = $patrimoine->image_path;
                $isLocal = $oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/');
                if ($isLocal) {
                    Storage::disk('public')->delete($oldPath);
                }
                $validated['image_path'] = $request->file('image')->store('patrimoines', 'public');
            }

            $patrimoine->update($validated);

            return response()->json([
                'data' => $patrimoine->fresh(),
                'message' => 'Patrimoine mis à jour avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour du patrimoine: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du patrimoine',
            ], 500);
        }
    }

    /**
     * Supprime un patrimoine ainsi que son image locale
     */
    public function destroy(Patrimoine $patrimoine)
    {
        try {
            $oldPath = $patrimoine->image_path;
            $isLocal = $oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/');
            if ($isLocal) {
                Storage::disk('public')->delete($oldPath);
            }

            $patrimoine->delete();

            return response()->json([
                'message' => 'Patrimoine supprimé avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression du patrimoine: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression du patrimoine',
            ], 500);
        }
    }
}
