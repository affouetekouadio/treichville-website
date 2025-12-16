<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slide;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

/**
 * Contrôleur pour la gestion des slides du carrousel de la page d'accueil
 */
class SlideController extends Controller
{
    /**
     * Liste les slides pour le backoffice (ordonnés par ordre d'affichage)
     */
    public function index()
    {
        $items = Slide::orderBy('ordre', 'asc')
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'data' => $items,
        ]);
    }

    /**
     * Crée un slide (gestion d'une image uploadée locale)
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => ['nullable', 'string', 'max:255'],
                'subtitle' => ['nullable', 'string', 'max:255'],
                'highlight' => ['nullable', 'string', 'max:255'],
                'description' => ['nullable', 'string', 'max:500'],
                'image' => ['required', 'file', 'image', 'max:4096'],
                'cta_text' => ['nullable', 'string', 'max:100'],
                'cta_link' => ['nullable', 'string', 'max:255'],
                'ordre' => ['nullable', 'integer', 'min:0'],
                'actif' => ['nullable', 'boolean'],
            ]);

            // Gestion du fichier image stocké localement (disk public)
            if ($request->hasFile('image')) {
                $validated['image_path'] = $request->file('image')->store('slides', 'public');
            }

            $slide = Slide::create($validated);

            return response()->json([
                'data' => $slide,
                'message' => 'Slide créé avec succès',
            ], 201)->with('success', 'Slide créé avec succès');
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création du slide: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du slide',
            ], 500)->with('error', 'Une erreur est survenue lors de la création du slide');
        }
    }

    /**
     * Met à jour un slide et remplace l'image locale si fournie
     */
    public function update(Request $request, Slide $slide)
    {
        try {
            $validated = $request->validate([
                'title' => ['nullable', 'string', 'max:255'],
                'subtitle' => ['nullable', 'string', 'max:255'],
                'highlight' => ['nullable', 'string', 'max:255'],
                'description' => ['nullable', 'string', 'max:500'],
                'image' => ['nullable', 'file', 'image', 'max:4096'],
                'cta_text' => ['nullable', 'string', 'max:100'],
                'cta_link' => ['nullable', 'string', 'max:255'],
                'ordre' => ['nullable', 'integer', 'min:0'],
                'actif' => ['nullable', 'boolean'],
            ]);

            // Remplacement d'image (on supprime l'ancienne si elle est locale)
            if ($request->hasFile('image')) {
                $oldPath = $slide->image_path;
                $isLocal = $oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/');
                if ($isLocal) {
                    Storage::disk('public')->delete($oldPath);
                }
                $validated['image_path'] = $request->file('image')->store('slides', 'public');
            }

            $slide->update($validated);

            return response()->json([
                'data' => $slide->fresh(),
                'message' => 'Slide mis à jour avec succès',
            ])->with('success', 'Slide mis à jour avec succès');
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour du slide: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du slide',
            ], 500)->with('error', 'Une erreur est survenue lors de la mise à jour du slide');
        }
    }

    /**
     * Supprime un slide ainsi que son image locale
     */
    public function destroy(Slide $slide)
    {
        try {
            $oldPath = $slide->image_path;
            $isLocal = $oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/');
            if ($isLocal) {
                Storage::disk('public')->delete($oldPath);
            }

            $slide->delete();

            return response()->json([
                'message' => 'Slide supprimé avec succès',
            ])->with('success', 'Slide supprimé avec succès');
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression du slide: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression du slide',
            ], 500)->with('error', 'Une erreur est survenue lors de la suppression du slide');
        }
    }
}
