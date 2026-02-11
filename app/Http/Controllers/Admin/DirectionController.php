<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Direction;
use App\Models\DirectionContact;
use App\Support\HtmlSanitizer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

/**
 * Contrôleur pour la gestion des directions/services et leurs contacts
 */
class DirectionController extends Controller
{
    /**
     * Liste les directions avec leurs contacts
     */
    public function index()
    {
        $items = Direction::with('contacts')
            ->orderBy('ordre', 'asc')
            ->orderBy('nom', 'asc')
            ->get();

        return response()->json([
            'data' => $items->map(function (Direction $direction) {
                return [
                    'id' => $direction->id,
                    'nom' => $direction->nom,
                    'slug' => $direction->slug,
                    'description' => $direction->description,
                    'short_description' => $direction->short_description,
                    'contenu' => $direction->contenu,
                    'icon' => $direction->icon,
                    'responsable' => $direction->responsable,
                    'fonction_responsable' => $direction->fonction_responsable,
                    'photo_responsable_url' => $direction->photo_responsable_url,
                    'biographie_responsable' => $direction->biographie_responsable,
                    'reseaux_sociaux_responsable' => $direction->reseaux_sociaux_responsable,
                    'adresse' => $direction->adresse,
                    'ordre' => $direction->ordre,
                    'actif' => $direction->actif,
                    'contacts' => $direction->contacts,
                ];
            }),
        ]);
    }

    /**
     * Affiche une direction avec ses contacts
     */
    public function show(Direction $direction)
    {
        $direction->load('contacts');

        return response()->json([
            'data' => $direction,
        ]);
    }

    /**
     * Crée une direction avec ses contacts
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'nom' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'short_description' => ['nullable', 'string', 'max:255'],
                'contenu' => ['nullable', 'string'],
                'icon' => ['nullable', 'string', 'max:100'],
                'responsable' => ['nullable', 'string', 'max:255'],
                'fonction_responsable' => ['nullable', 'string', 'max:255'],
                'photo_responsable' => ['nullable', 'file', 'image', 'max:10240'],
                'biographie_responsable' => ['nullable', 'string'],
                'reseaux_sociaux_responsable' => ['nullable', 'string'],
                'adresse' => ['nullable', 'string', 'max:500'],
                'ordre' => ['nullable', 'integer', 'min:0'],
                'actif' => ['nullable', 'boolean'],
                'contacts' => ['nullable', 'array'],
                'contacts.*.type' => ['required', 'in:email,telephone,fax,whatsapp'],
                'contacts.*.valeur' => ['required', 'string', 'max:255'],
                'contacts.*.label' => ['nullable', 'string', 'max:100'],
                'contacts.*.ordre' => ['nullable', 'integer', 'min:0'],
            ]);

            DB::beginTransaction();

            // Génération du slug
            $validated['slug'] = Direction::generateUniqueSlug(Str::slug($validated['nom']));

            // Upload de la photo du responsable
            $photoPath = null;
            if ($request->hasFile('photo_responsable')) {
                $photoPath = $request->file('photo_responsable')
                    ->store('directions/responsables', 'public');
            }

            // Decode des réseaux sociaux
            $reseauxSociaux = null;
            if (!empty($validated['reseaux_sociaux_responsable'])) {
                $reseauxSociaux = json_decode($validated['reseaux_sociaux_responsable'], true);
            }

            // Création de la direction
            $direction = Direction::create([
                'nom' => $validated['nom'],
                'slug' => $validated['slug'],
                'description' => $validated['description'] ?? null,
                'short_description' => $validated['short_description'] ?? null,
                'contenu' => $validated['contenu'] ?? null,
                'icon' => $validated['icon'] ?? null,
                'responsable' => $validated['responsable'] ?? null,
                'fonction_responsable' => $validated['fonction_responsable'] ?? null,
                'photo_responsable' => $photoPath,
                'biographie_responsable' => HtmlSanitizer::clean($validated['biographie_responsable'] ?? null),
                'reseaux_sociaux_responsable' => $reseauxSociaux,
                'adresse' => $validated['adresse'] ?? null,
                'ordre' => $validated['ordre'] ?? 0,
                'actif' => $validated['actif'] ?? true,
            ]);

            // Création des contacts associés
            if (!empty($validated['contacts'])) {
                foreach ($validated['contacts'] as $contact) {
                    DirectionContact::create([
                        'direction_id' => $direction->id,
                        'type' => $contact['type'],
                        'valeur' => $contact['valeur'],
                        'label' => $contact['label'] ?? null,
                        'ordre' => $contact['ordre'] ?? 0,
                    ]);
                }
            }

            DB::commit();

            $direction->load('contacts');

            return response()->json([
                'data' => $direction,
                'message' => 'Direction créée avec succès',
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation échouée',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Erreur lors de la création de la direction: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la création de la direction',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Met à jour une direction et ses contacts
     */
    public function update(Request $request, Direction $direction)
    {
        try {
            $validated = $request->validate([
                'nom' => ['sometimes', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'short_description' => ['nullable', 'string', 'max:255'],
                'contenu' => ['nullable', 'string'],
                'icon' => ['nullable', 'string', 'max:100'],
                'responsable' => ['nullable', 'string', 'max:255'],
                'fonction_responsable' => ['nullable', 'string', 'max:255'],
                'photo_responsable' => ['nullable', 'file', 'image', 'max:10240'],
                'biographie_responsable' => ['nullable', 'string'],
                'reseaux_sociaux_responsable' => ['nullable', 'string'],
                'adresse' => ['nullable', 'string', 'max:500'],
                'ordre' => ['nullable', 'integer', 'min:0'],
                'actif' => ['nullable', 'boolean'],
                'contacts' => ['nullable', 'array'],
                'contacts.*.id' => ['nullable', 'exists:direction_contacts,id'],
                'contacts.*.type' => ['required', 'in:email,telephone,fax,whatsapp'],
                'contacts.*.valeur' => ['required', 'string', 'max:255'],
                'contacts.*.label' => ['nullable', 'string', 'max:100'],
                'contacts.*.ordre' => ['nullable', 'integer', 'min:0'],
            ]);

            DB::beginTransaction();

            // Mise à jour de la direction
            if (array_key_exists('nom', $validated)) {
                $validated['slug'] = Direction::generateUniqueSlug(Str::slug($validated['nom']), $direction->id);
            }

            // Gestion de la photo du responsable
            $photoPath = $direction->photo_responsable;
            if ($request->hasFile('photo_responsable')) {
                // Supprimer l'ancienne photo locale
                $oldPath = $direction->photo_responsable;
                if ($oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/')) {
                    Storage::disk('public')->delete($oldPath);
                }
                $photoPath = $request->file('photo_responsable')
                    ->store('directions/responsables', 'public');
            }

            // Decode des réseaux sociaux
            $reseauxSociaux = $direction->reseaux_sociaux_responsable;
            if (array_key_exists('reseaux_sociaux_responsable', $validated) && !empty($validated['reseaux_sociaux_responsable'])) {
                $reseauxSociaux = json_decode($validated['reseaux_sociaux_responsable'], true);
            }

            $direction->update([
                'nom' => $validated['nom'] ?? $direction->nom,
                'slug' => $validated['slug'] ?? $direction->slug,
                'description' => $validated['description'] ?? $direction->description,
                'short_description' => $validated['short_description'] ?? $direction->short_description,
                'contenu' => $validated['contenu'] ?? $direction->contenu,
                'icon' => $validated['icon'] ?? $direction->icon,
                'responsable' => $validated['responsable'] ?? $direction->responsable,
                'fonction_responsable' => $validated['fonction_responsable'] ?? $direction->fonction_responsable,
                'photo_responsable' => $photoPath,
                'biographie_responsable' => HtmlSanitizer::clean($validated['biographie_responsable'] ?? $direction->biographie_responsable),
                'reseaux_sociaux_responsable' => $reseauxSociaux,
                'adresse' => $validated['adresse'] ?? $direction->adresse,
                'ordre' => $validated['ordre'] ?? $direction->ordre,
                'actif' => $validated['actif'] ?? $direction->actif,
            ]);

            // Gestion des contacts
            if (array_key_exists('contacts', $validated)) {
                // Récupérer les IDs des contacts existants à conserver
                $contactIds = collect($validated['contacts'])
                    ->pluck('id')
                    ->filter()
                    ->toArray();

                // Supprimer les contacts qui ne sont plus dans la liste
                DirectionContact::where('direction_id', $direction->id)
                    ->whereNotIn('id', $contactIds)
                    ->delete();

                // Créer ou mettre à jour les contacts
                foreach ($validated['contacts'] as $contactData) {
                    if (isset($contactData['id'])) {
                        // Mise à jour d'un contact existant
                        DirectionContact::where('id', $contactData['id'])
                            ->update([
                                'type' => $contactData['type'],
                                'valeur' => $contactData['valeur'],
                                'label' => $contactData['label'] ?? null,
                                'ordre' => $contactData['ordre'] ?? 0,
                            ]);
                    } else {
                        // Création d'un nouveau contact
                        DirectionContact::create([
                            'direction_id' => $direction->id,
                            'type' => $contactData['type'],
                            'valeur' => $contactData['valeur'],
                            'label' => $contactData['label'] ?? null,
                            'ordre' => $contactData['ordre'] ?? 0,
                        ]);
                    }
                }
            }

            DB::commit();

            $direction->load('contacts');

            return response()->json([
                'data' => $direction,
                'message' => 'Direction mise à jour avec succès',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation échouée',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Erreur lors de la mise à jour de la direction: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour de la direction',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Supprime une direction et tous ses contacts
     */
    public function destroy(Direction $direction)
    {
        try {
            // Supprimer la photo locale du responsable
            $oldPath = $direction->photo_responsable;
            if ($oldPath && !str_starts_with($oldPath, 'http://') && !str_starts_with($oldPath, 'https://') && !str_starts_with($oldPath, '/')) {
                Storage::disk('public')->delete($oldPath);
            }

            // Les contacts seront supprimés automatiquement grâce à cascadeOnDelete
            $direction->delete();

            return response()->json([
                'message' => 'Direction supprimée avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression de la direction: ' . $e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression de la direction',
            ], 500);
        }
    }
}
