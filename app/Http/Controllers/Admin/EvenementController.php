<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Evenement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EvenementController extends Controller
{
    /**
     * Liste les événements pour le backoffice.
     */
    public function index()
    {
        $items = Evenement::orderByDesc('date_debut')->orderByDesc('created_at')->get();

        return response()->json([
            'data' => $items,
        ]);
    }

    /**
     * Crée un événement (dates, gratuité, image locale).
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
                'date_debut' => ['nullable', 'date'],
                'date_fin' => ['nullable', 'date', 'after_or_equal:date_debut'],
                'gratuit' => ['nullable', 'boolean'],
                'lieu' => ['nullable', 'string', 'max:255'],
                'image' => ['nullable', 'file', 'image', 'max:4096'],
                'meta_title' => ['nullable', 'string', 'max:255'],
                'meta_description' => ['nullable', 'string'],
                'is_flash_info' => ['nullable', 'boolean'],
            ]);

            if ($request->hasFile('image')) {
                $validated['image_path'] = $request->file('image')->store('evenements', 'public');
            }

            // Convertir is_flash_info en booléen
            if ($request->has('is_flash_info')) {
                $validated['is_flash_info'] = filter_var($request->input('is_flash_info'), FILTER_VALIDATE_BOOLEAN);
            }

            $validated['slug'] = Str::slug($validated['titre']);

            $evenement = Evenement::create($validated);

            return response()->json([
                'data' => $evenement,
                'message' => 'Événement créé avec succès',
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création de l\'événement: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de l\'événement',
            ], 500);
        }
    }

    /**
     * Met à jour un événement et son image locale.
     */
    public function update(Request $request, Evenement $evenement)
    {
        try {
            $validated = $request->validate([
                'titre' => ['sometimes', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'contenu' => ['nullable', 'string'],
                'categorie' => ['nullable', 'string', 'max:100'],
                'category_id' => ['nullable', 'exists:categories,id'],
                'status' => ['nullable', 'in:draft,published'],
                'date_debut' => ['nullable', 'date'],
                'date_fin' => ['nullable', 'date', 'after_or_equal:date_debut'],
                'gratuit' => ['nullable', 'boolean'],
                'lieu' => ['nullable', 'string', 'max:255'],
                'image' => ['nullable', 'file', 'image', 'max:4096'],
                'meta_title' => ['nullable', 'string', 'max:255'],
                'meta_description' => ['nullable', 'string'],
                'is_flash_info' => ['nullable', 'boolean'],
            ]);

            if (array_key_exists('titre', $validated)) {
                $validated['slug'] = Str::slug($validated['titre']);
            }

            // Convertir is_flash_info en booléen
            if ($request->has('is_flash_info')) {
                $validated['is_flash_info'] = filter_var($request->input('is_flash_info'), FILTER_VALIDATE_BOOLEAN);
            }

            if ($request->hasFile('image')) {
                $oldPath = $evenement->image_path;
                $isLocal = $oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/');
                if ($isLocal) {
                    Storage::disk('public')->delete($oldPath);
                }
                $validated['image_path'] = $request->file('image')->store('evenements', 'public');
            }

            $evenement->update($validated);

            return response()->json([
                'data' => $evenement->fresh(),
                'message' => 'Événement mis à jour avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour de l\'événement: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour de l\'événement',
            ], 500);
        }
    }

    /**
     * Supprime un événement et son image locale.
     */
    public function destroy(Evenement $evenement)
    {
        try {
            $oldPath = $evenement->image_path;
            $isLocal = $oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/');
            if ($isLocal) {
                Storage::disk('public')->delete($oldPath);
            }

            $evenement->delete();

            return response()->json([
                'message' => 'Événement supprimé avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression de l\'événement: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression de l\'événement',
            ], 500);
        }
    }
}
