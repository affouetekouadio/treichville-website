<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Adjoint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * Contrôleur pour gérer les adjoints au maire dans le panel admin
 */
class AdjointController extends Controller
{
    /**
     * Liste des adjoints
     */
    public function index()
    {
        $adjoints = Adjoint::ordered()->get()->map(function ($adjoint) {
            return [
                'id' => $adjoint->id,
                'nom' => $adjoint->nom,
                'role' => $adjoint->role,
                'photo' => $adjoint->photo,
                'photo_url' => $adjoint->photo_url,
                'focus' => $adjoint->focus,
                'icon' => $adjoint->icon,
                'ordre' => $adjoint->ordre,
                'actif' => $adjoint->actif,
                'created_at' => $adjoint->created_at,
            ];
        });

        return response()->json($adjoints);
    }

    /**
     * Créer un adjoint
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'role' => 'required|string|max:255',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'focus' => 'nullable|string|max:255',
                'icon' => 'nullable|string|max:100',
                'ordre' => 'nullable|integer',
                'actif' => 'nullable',
            ]);

            // Convertir actif en booléen
            if (isset($validated['actif'])) {
                $validated['actif'] = filter_var($validated['actif'], FILTER_VALIDATE_BOOLEAN);
            }

            // Gérer l'upload de la photo
            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('adjoints', $filename, 'public');
                $validated['photo'] = $path;
            }

            $adjoint = Adjoint::create($validated);

            return response()->json([
                'message' => 'Adjoint créé avec succès',
                'adjoint' => [
                    'id' => $adjoint->id,
                    'nom' => $adjoint->nom,
                    'role' => $adjoint->role,
                    'photo' => $adjoint->photo,
                    'photo_url' => $adjoint->photo_url,
                    'focus' => $adjoint->focus,
                    'icon' => $adjoint->icon,
                    'ordre' => $adjoint->ordre,
                    'actif' => $adjoint->actif,
                ],
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Données invalides',
                'errors' => $e->validator->errors()
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Erreur création adjoint: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la création de l\'adjoint'
            ], 500);
        }
    }

    /**
     * Mettre à jour un adjoint
     */
    public function update(Request $request, Adjoint $adjoint)
    {
        try {
            $validated = $request->validate([
                'nom' => 'required|string|max:255',
                'role' => 'required|string|max:255',
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:4096',
                'focus' => 'nullable|string|max:255',
                'icon' => 'nullable|string|max:100',
                'ordre' => 'nullable|integer',
                'actif' => 'nullable',
            ]);

            // Convertir actif en booléen
            if (isset($validated['actif'])) {
                $validated['actif'] = filter_var($validated['actif'], FILTER_VALIDATE_BOOLEAN);
            }

            // Gérer l'upload de la photo
            if ($request->hasFile('photo')) {
                // Supprimer l'ancienne photo si elle existe
                if ($adjoint->photo && Storage::disk('public')->exists($adjoint->photo)) {
                    Storage::disk('public')->delete($adjoint->photo);
                }

                $image = $request->file('photo');
                $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs('adjoints', $filename, 'public');
                $validated['photo'] = $path;
            }

            $adjoint->update($validated);

            return response()->json([
                'message' => 'Adjoint mis à jour avec succès',
                'adjoint' => [
                    'id' => $adjoint->id,
                    'nom' => $adjoint->nom,
                    'role' => $adjoint->role,
                    'photo' => $adjoint->photo,
                    'photo_url' => $adjoint->photo_url,
                    'focus' => $adjoint->focus,
                    'icon' => $adjoint->icon,
                    'ordre' => $adjoint->ordre,
                    'actif' => $adjoint->actif,
                ],
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Données invalides',
                'errors' => $e->validator->errors()
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Erreur mise à jour adjoint: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'adjoint'
            ], 500);
        }
    }

    /**
     * Supprimer un adjoint
     */
    public function destroy(Adjoint $adjoint)
    {
        try {
            // Supprimer la photo si elle existe
            if ($adjoint->photo && Storage::disk('public')->exists($adjoint->photo)) {
                Storage::disk('public')->delete($adjoint->photo);
            }

            $adjoint->delete();

            return response()->json([
                'message' => 'Adjoint supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Erreur suppression adjoint: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la suppression de l\'adjoint'
            ], 500);
        }
    }

    /**
     * Mettre à jour l'ordre des adjoints
     */
    public function updateOrder(Request $request)
    {
        try {
            $validated = $request->validate([
                'orders' => 'required|array',
                'orders.*.id' => 'required|exists:adjoints,id',
                'orders.*.ordre' => 'required|integer|min:0',
            ]);

            foreach ($validated['orders'] as $order) {
                Adjoint::where('id', $order['id'])
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
            \Log::error('Erreur mise à jour ordre adjoints: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la mise à jour de l\'ordre'
            ], 500);
        }
    }
}
