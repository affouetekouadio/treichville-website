<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Contrôleur pour gérer les uploads d'images dans CKEditor
 */
class EditorImageController extends Controller
{
    /**
     * Upload une image depuis CKEditor
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:4096', // Max 4MB
            ]);

            if (!$request->hasFile('image')) {
                return response()->json([
                    'error' => 'Aucune image fournie'
                ], 400);
            }

            $image = $request->file('image');

            // Générer un nom unique pour l'image
            $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();

            // Stocker l'image dans le dossier public/storage/editor-images
            $path = $image->storeAs('editor-images', $filename, 'public');

            // Générer l'URL publique
            $url = Storage::disk('public')->url($path);

            return response()->json([
                'url' => $url,
                'message' => 'Image uploadée avec succès'
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Fichier invalide',
                'message' => $e->validator->errors()->first()
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Erreur upload image CKEditor: ' . $e->getMessage());

            return response()->json([
                'error' => 'Erreur lors de l\'upload',
                'message' => 'Une erreur est survenue lors de l\'upload de l\'image'
            ], 500);
        }
    }
}
