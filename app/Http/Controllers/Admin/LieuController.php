<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lieu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Contrôleur pour gérer les lieux (parcs et piscines) dans le panel admin
 */
class LieuController extends Controller
{
    /**
     * Liste des lieux
     */
    public function index()
    {
        $lieux = Lieu::ordered()->get()->map(function ($lieu) {
            return [
                'id' => $lieu->id,
                'type' => $lieu->type,
                'nom' => $lieu->nom,
                'description' => $lieu->description,
                'image' => $lieu->image,
                'image_url' => $lieu->image_url,
                'horaires' => $lieu->horaires,
                'acces' => $lieu->acces,
                'equipements' => $lieu->equipements,
                'ordre' => $lieu->ordre,
                'actif' => $lieu->actif,
                'is_flash_info' => $lieu->is_flash_info,
                'created_at' => $lieu->created_at,
            ];
        });

        return response()->json($lieux);
    }

    /**
     * Créer un lieu
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'type' => 'required|string|in:Parc,Piscine',
                'nom' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'horaires' => 'nullable|string|max:255',
                'acces' => 'required|string|in:Gratuit,Payant',
                'equipements' => 'nullable|array',
                'equipements.*' => 'string|max:255',
                'ordre' => 'nullable|integer',
                'actif' => 'nullable',
                'is_flash_info' => 'nullable',
            ]);

            // Convertir actif en booléen
            if (isset($validated['actif'])) {
                $validated['actif'] = filter_var($validated['actif'], FILTER_VALIDATE_BOOLEAN);
            }

            // Convertir is_flash_info en booléen
            if ($request->has('is_flash_info')) {
                $validated['is_flash_info'] = filter_var($request->input('is_flash_info'), FILTER_VALIDATE_BOOLEAN);
            }

            // Gérer l'upload de l'image
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('lieux', $filename, 'public');
                $validated['image'] = $path;
            }

            $lieu = Lieu::create($validated);

            return response()->json([
                'message' => 'Lieu créé avec succès',
                'lieu' => [
                    'id' => $lieu->id,
                    'type' => $lieu->type,
                    'nom' => $lieu->nom,
                    'description' => $lieu->description,
                    'image' => $lieu->image,
                    'image_url' => $lieu->image_url,
                    'horaires' => $lieu->horaires,
                    'acces' => $lieu->acces,
                    'equipements' => $lieu->equipements,
                    'ordre' => $lieu->ordre,
                    'actif' => $lieu->actif,
                    'is_flash_info' => $lieu->is_flash_info,
                ],
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Données invalides',
                'errors' => $e->validator->errors()
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Erreur création lieu: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la création du lieu'
            ], 500);
        }
    }

    /**
     * Mettre à jour un lieu
     */
    public function update(Request $request, Lieu $lieu)
    {
        try {
            $validated = $request->validate([
                'type' => 'required|string|in:Parc,Piscine',
                'nom' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'horaires' => 'nullable|string|max:255',
                'acces' => 'required|string|in:Gratuit,Payant',
                'equipements' => 'nullable|array',
                'equipements.*' => 'string|max:255',
                'ordre' => 'nullable|integer',
                'actif' => 'nullable',
                'is_flash_info' => 'nullable',
            ]);

            // Convertir actif en booléen
            if (isset($validated['actif'])) {
                $validated['actif'] = filter_var($validated['actif'], FILTER_VALIDATE_BOOLEAN);
            }

            // Convertir is_flash_info en booléen
            if ($request->has('is_flash_info')) {
                $validated['is_flash_info'] = filter_var($request->input('is_flash_info'), FILTER_VALIDATE_BOOLEAN);
            }

            // Gérer l'upload de l'image
            if ($request->hasFile('image')) {
                // Supprimer l'ancienne image si elle existe
                if ($lieu->image && !str_starts_with($lieu->image, 'http') && Storage::disk('public')->exists($lieu->image)) {
                    Storage::disk('public')->delete($lieu->image);
                }

                $image = $request->file('image');
                $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('lieux', $filename, 'public');
                $validated['image'] = $path;
            }

            $lieu->update($validated);

            return response()->json([
                'message' => 'Lieu mis à jour avec succès',
                'lieu' => [
                    'id' => $lieu->id,
                    'type' => $lieu->type,
                    'nom' => $lieu->nom,
                    'description' => $lieu->description,
                    'image' => $lieu->image,
                    'image_url' => $lieu->image_url,
                    'horaires' => $lieu->horaires,
                    'acces' => $lieu->acces,
                    'equipements' => $lieu->equipements,
                    'ordre' => $lieu->ordre,
                    'actif' => $lieu->actif,
                    'is_flash_info' => $lieu->is_flash_info,
                ],
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Données invalides',
                'errors' => $e->validator->errors()
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Erreur mise à jour lieu: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la mise à jour du lieu'
            ], 500);
        }
    }

    /**
     * Supprimer un lieu
     */
    public function destroy(Lieu $lieu)
    {
        try {
            // Supprimer l'image si elle existe
            if ($lieu->image && !str_starts_with($lieu->image, 'http') && Storage::disk('public')->exists($lieu->image)) {
                Storage::disk('public')->delete($lieu->image);
            }

            $lieu->delete();

            return response()->json([
                'message' => 'Lieu supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Erreur suppression lieu: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la suppression du lieu'
            ], 500);
        }
    }

    /**
     * Mettre à jour l'ordre des lieux
     */
    public function updateOrder(Request $request)
    {
        try {
            $validated = $request->validate([
                'orders' => 'required|array',
                'orders.*.id' => 'required|exists:lieux,id',
                'orders.*.ordre' => 'required|integer|min:0',
            ]);

            foreach ($validated['orders'] as $order) {
                Lieu::where('id', $order['id'])
                    ->update(['ordre' => $order['ordre']]);
            }

            return response()->json([
                'message' => 'Ordre mis à jour avec succès'
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Données invalides',
                'errors' => $e->validator->errors()
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Erreur mise à jour ordre lieux: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'ordre'
            ], 500);
        }
    }
}
