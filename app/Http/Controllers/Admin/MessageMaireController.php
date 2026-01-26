<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MessageMaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MessageMaireController extends Controller
{
    public function index()
    {
        $messages = MessageMaire::orderByDesc('created_at')->get()->map(function ($message) {
            return [
                'id' => $message->id,
                'photo' => $message->photo,
                'photo_url' => $message->photo_url,
                'image_fond' => $message->image_fond,
                'image_fond_url' => $message->image_fond_url,
                'titre_vision' => $message->titre_vision,
                'salutation' => $message->salutation,
                'contenu_message' => $message->contenu_message,
                'texte_conclusion' => $message->texte_conclusion,
                'nom_maire' => $message->nom_maire,
                'titre_maire' => $message->titre_maire,
                'citation' => $message->citation,
                'actif' => $message->actif,
                'created_at' => $message->created_at,
            ];
        });

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'image_fond' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'titre_vision' => 'required|string|max:255',
                'salutation' => 'required|string|max:255',
                'contenu_message' => 'required|string',
                'texte_conclusion' => 'nullable|string',
                'nom_maire' => 'required|string|max:255',
                'titre_maire' => 'required|string|max:255',
                'citation' => 'nullable|string|max:500',
                'actif' => 'nullable',
            ]);

            if (isset($validated['actif'])) {
                $validated['actif'] = filter_var($validated['actif'], FILTER_VALIDATE_BOOLEAN);
            }

            if ($request->hasFile('photo')) {
                $image = $request->file('photo');
                $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $validated['photo'] = $image->storeAs('messages-maire', $filename, 'public');
            }

            if ($request->hasFile('image_fond')) {
                $image = $request->file('image_fond');
                $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $validated['image_fond'] = $image->storeAs('messages-maire', $filename, 'public');
            }

            if (!empty($validated['actif'])) {
                MessageMaire::where('actif', true)->update(['actif' => false]);
            }

            $message = MessageMaire::create($validated);

            return response()->json([
                'message' => 'Message du maire créé avec succès',
                'data' => $message->toFrontendArray(),
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Données invalides',
                'errors' => $e->validator->errors(),
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Erreur création message maire: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la création du message',
            ], 500);
        }
    }

    public function update(Request $request, MessageMaire $messageMaire)
    {
        try {
            $validated = $request->validate([
                'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'image_fond' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240',
                'titre_vision' => 'required|string|max:255',
                'salutation' => 'required|string|max:255',
                'contenu_message' => 'required|string',
                'texte_conclusion' => 'nullable|string',
                'nom_maire' => 'required|string|max:255',
                'titre_maire' => 'required|string|max:255',
                'citation' => 'nullable|string|max:500',
                'actif' => 'nullable',
            ]);

            if (isset($validated['actif'])) {
                $validated['actif'] = filter_var($validated['actif'], FILTER_VALIDATE_BOOLEAN);
            }

            if ($request->hasFile('photo')) {
                if ($messageMaire->photo && Storage::disk('public')->exists($messageMaire->photo)) {
                    Storage::disk('public')->delete($messageMaire->photo);
                }
                $image = $request->file('photo');
                $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $validated['photo'] = $image->storeAs('messages-maire', $filename, 'public');
            }

            if ($request->hasFile('image_fond')) {
                if ($messageMaire->image_fond && Storage::disk('public')->exists($messageMaire->image_fond)) {
                    Storage::disk('public')->delete($messageMaire->image_fond);
                }
                $image = $request->file('image_fond');
                $filename = Str::random(20) . '.' . $image->getClientOriginalExtension();
                $validated['image_fond'] = $image->storeAs('messages-maire', $filename, 'public');
            }

            if (!empty($validated['actif'])) {
                MessageMaire::where('actif', true)
                    ->where('id', '!=', $messageMaire->id)
                    ->update(['actif' => false]);
            }

            $messageMaire->update($validated);

            return response()->json([
                'message' => 'Message du maire mis à jour avec succès',
                'data' => $messageMaire->fresh()->toFrontendArray(),
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Données invalides',
                'errors' => $e->validator->errors(),
            ], 422);

        } catch (\Exception $e) {
            \Log::error('Erreur mise à jour message maire: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la mise à jour du message',
            ], 500);
        }
    }

    public function destroy(MessageMaire $messageMaire)
    {
        try {
            if ($messageMaire->photo && Storage::disk('public')->exists($messageMaire->photo)) {
                Storage::disk('public')->delete($messageMaire->photo);
            }
            if ($messageMaire->image_fond && Storage::disk('public')->exists($messageMaire->image_fond)) {
                Storage::disk('public')->delete($messageMaire->image_fond);
            }

            $messageMaire->delete();

            return response()->json([
                'message' => 'Message du maire supprimé avec succès',
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Erreur suppression message maire: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors de la suppression du message',
            ], 500);
        }
    }

    public function toggleActif(MessageMaire $messageMaire)
    {
        try {
            if (!$messageMaire->actif) {
                MessageMaire::where('actif', true)->update(['actif' => false]);
            }

            $messageMaire->update(['actif' => !$messageMaire->actif]);

            return response()->json([
                'message' => $messageMaire->actif
                    ? 'Message activé avec succès'
                    : 'Message désactivé avec succès',
                'actif' => $messageMaire->actif,
            ]);

        } catch (\Exception $e) {
            \Log::error('Erreur toggle actif message maire: ' . $e->getMessage());

            return response()->json([
                'message' => 'Erreur lors du changement de statut',
            ], 500);
        }
    }
}
