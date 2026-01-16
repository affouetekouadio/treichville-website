<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

/**
 * Contrôleur pour la gestion des paramètres du site
 */
class SettingController extends Controller
{
    /**
     * Liste tous les paramètres groupés
     */
    public function index()
    {
        $settings = Setting::all()->groupBy('group')->map(function ($groupSettings) {
            return $groupSettings->map(function ($setting) {
                return [
                    'id' => $setting->id,
                    'key' => $setting->key,
                    'value' => $setting->value,
                    'decoded_value' => $setting->decoded_value,
                    'type' => $setting->type,
                    'group' => $setting->group,
                    'description' => $setting->description,
                ];
            })->keyBy('key');
        });

        return response()->json([
            'data' => $settings,
        ]);
    }

    /**
     * Met à jour plusieurs paramètres en une seule requête
     */
    public function updateBatch(Request $request)
    {
        try {
            $validated = $request->validate([
                'settings' => 'required|array',
                'settings.*.key' => 'required|string',
                'settings.*.value' => 'nullable',
                'settings.*.type' => 'nullable|string',
            ]);

            foreach ($validated['settings'] as $settingData) {
                $setting = Setting::where('key', $settingData['key'])->first();

                if (!$setting) {
                    continue;
                }

                // Gestion des fichiers image
                if ($setting->type === 'image' && $request->hasFile("images.{$settingData['key']}")) {
                    $file = $request->file("images.{$settingData['key']}");

                    // Supprimer l'ancienne image si elle existe
                    if ($setting->value && !str_starts_with($setting->value, 'http')) {
                        Storage::disk('public')->delete($setting->value);
                    }

                    // Sauvegarder la nouvelle image
                    $path = $file->store('settings', 'public');
                    $setting->value = $path;
                } else {
                    // Mise à jour de la valeur normale
                    $setting->value = $settingData['value'] ?? '';
                }

                $setting->save();
            }

            Setting::clearCache();

            return response()->json([
                'message' => 'Paramètres mis à jour avec succès',
                'data' => Setting::getAllGrouped(),
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour des paramètres: '.$e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Met à jour un seul paramètre
     */
    public function update(Request $request, Setting $setting)
    {
        try {
            $validated = $request->validate([
                'value' => 'nullable',
            ]);

            // Gestion des fichiers image
            if ($setting->type === 'image' && $request->hasFile('image')) {
                // Supprimer l'ancienne image
                if ($setting->value && !str_starts_with($setting->value, 'http')) {
                    Storage::disk('public')->delete($setting->value);
                }

                // Sauvegarder la nouvelle image
                $path = $request->file('image')->store('settings', 'public');
                $setting->value = $path;
            } else {
                $setting->value = $validated['value'] ?? '';
            }

            $setting->save();

            return response()->json([
                'message' => 'Paramètre mis à jour avec succès',
                'data' => [
                    'id' => $setting->id,
                    'key' => $setting->key,
                    'value' => $setting->value,
                    'decoded_value' => $setting->decoded_value,
                    'type' => $setting->type,
                    'group' => $setting->group,
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour du paramètre: '.$e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Récupère les paramètres pour le frontend (sans authentification)
     */
    public function public()
    {
        $settings = Setting::getAllCached();

        // Filtrer les paramètres publics uniquement
        $publicKeys = [
            'site_name',
            'site_description',
            'logo',
            'favicon',
            'contact_email',
            'contact_phone',
            'contact_address',
            'opening_hours',
            'social_facebook',
            'social_twitter',
            'social_instagram',
            'social_linkedin',
            'social_youtube',
        ];

        $publicSettings = array_filter(
            $settings,
            fn ($key) => in_array($key, $publicKeys),
            ARRAY_FILTER_USE_KEY
        );

        return response()->json([
            'data' => $publicSettings,
        ]);
    }
}
