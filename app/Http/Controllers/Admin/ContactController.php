<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;

/**
 * Contrôleur pour gérer les messages de contact dans le panel admin
 */
class ContactController extends Controller
{
    /**
     * Basculer le statut traité/non traité d'un message
     *
     * @param Request $request
     * @param Contact $contact
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleStatus(Request $request, Contact $contact)
    {
        try {
            $request->validate([
                'traite' => 'required|boolean',
            ]);

            $contact->traite = $request->traite;
            $contact->save();

            return response()->json([
                'message' => $request->traite
                    ? 'Message marqué comme traité'
                    : 'Message marqué comme non traité',
                'contact' => $contact,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Données invalides',
                'errors' => $e->validator->errors()
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Erreur toggle status contact: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la mise à jour du statut'
            ], 500);
        }
    }

    /**
     * Supprimer un message de contact
     *
     * @param Contact $contact
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Contact $contact)
    {
        try {
            $contact->delete();

            return response()->json([
                'message' => 'Message supprimé avec succès'
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Erreur suppression contact: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la suppression du message'
            ], 500);
        }
    }
}
