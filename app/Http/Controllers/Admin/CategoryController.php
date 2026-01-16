<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Liste les catégories, avec filtrage par type optionnel (actualite/evenement/patrimoine).
     */
    public function index(Request $request)
    {
        $query = Category::query()->orderBy('name');

        if ($request->filled('type')) {
            $query->where('type', $request->string('type'));
        }

        return response()->json([
            'data' => $query->get(),
        ]);
    }

    /**
     * Création d'une catégorie.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'type' => ['required', 'in:actualite,evenement,patrimoine'],
            ]);

            $validated['slug'] = Str::slug($validated['name']);

            $category = Category::create($validated);

            return response()->json([
                'data' => $category,
                'message' => 'Catégorie créée avec succès',
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création de la catégorie: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de la catégorie',
            ], 500);
        }
    }

    /**
     * Mise à jour d'une catégorie.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $validated = $request->validate([
                'name' => ['sometimes', 'string', 'max:255'],
                'type' => ['sometimes', 'in:actualite,evenement,patrimoine'],
            ]);

            if (isset($validated['name'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            $category->update($validated);

            return response()->json([
                'data' => $category->fresh(),
                'message' => 'Catégorie mise à jour avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour de la catégorie: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour de la catégorie',
            ], 500);
        }
    }

    /**
     * Suppression d'une catégorie si elle n'est pas liée.
     */
    public function destroy(Category $category)
    {
        try {
            // Vérification : on refuse la suppression s'il y a des contenus liés
            if ($category->actualites()->exists() || $category->evenements()->exists() || $category->patrimoines()->exists()) {
                return response()->json([
                    'message' => 'Impossible de supprimer cette catégorie car elle est liée à des contenus',
                ], 422);
            }

            $category->delete();

            return response()->json([
                'message' => 'Catégorie supprimée avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression de la catégorie: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression de la catégorie',
            ], 500);
        }
    }
}
