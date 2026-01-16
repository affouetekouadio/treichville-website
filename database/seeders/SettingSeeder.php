<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // Général
            [
                'key' => 'site_name',
                'value' => 'Mairie de Treichville',
                'type' => 'text',
                'group' => 'general',
                'description' => 'Nom du site',
            ],
            [
                'key' => 'site_description',
                'value' => 'Site officiel de la commune de Treichville',
                'type' => 'text',
                'group' => 'general',
                'description' => 'Description du site',
            ],
            [
                'key' => 'site_keywords',
                'value' => 'treichville, mairie, commune, abidjan, côte d\'ivoire',
                'type' => 'text',
                'group' => 'general',
                'description' => 'Mots-clés SEO',
            ],

            // Apparence
            [
                'key' => 'logo',
                'value' => '',
                'type' => 'image',
                'group' => 'appearance',
                'description' => 'Logo du site',
            ],
            [
                'key' => 'favicon',
                'value' => '',
                'type' => 'image',
                'group' => 'appearance',
                'description' => 'Favicon du site',
            ],
            [
                'key' => 'primary_color',
                'value' => '#03800a',
                'type' => 'text',
                'group' => 'appearance',
                'description' => 'Couleur primaire',
            ],

            // Contact
            [
                'key' => 'contact_email',
                'value' => 'contact@treichville.ci',
                'type' => 'text',
                'group' => 'contact',
                'description' => 'Email de contact',
            ],
            [
                'key' => 'contact_phone',
                'value' => '+225 XX XX XX XX XX',
                'type' => 'text',
                'group' => 'contact',
                'description' => 'Téléphone de contact',
            ],
            [
                'key' => 'contact_fax',
                'value' => '',
                'type' => 'text',
                'group' => 'contact',
                'description' => 'Fax',
            ],
            [
                'key' => 'contact_address',
                'value' => 'Boulevard VGE, Treichville, Abidjan, Côte d\'Ivoire',
                'type' => 'text',
                'group' => 'contact',
                'description' => 'Adresse physique',
            ],
            [
                'key' => 'contact_map_url',
                'value' => '',
                'type' => 'text',
                'group' => 'contact',
                'description' => 'URL de la carte Google Maps',
            ],

            // Horaires d'ouverture (JSON pour flexibilité)
            [
                'key' => 'opening_hours',
                'value' => json_encode([
                    'monday' => ['open' => '07:30', 'close' => '16:30', 'closed' => false],
                    'tuesday' => ['open' => '07:30', 'close' => '16:30', 'closed' => false],
                    'wednesday' => ['open' => '07:30', 'close' => '16:30', 'closed' => false],
                    'thursday' => ['open' => '07:30', 'close' => '16:30', 'closed' => false],
                    'friday' => ['open' => '07:30', 'close' => '16:30', 'closed' => false],
                    'saturday' => ['open' => '', 'close' => '', 'closed' => true],
                    'sunday' => ['open' => '', 'close' => '', 'closed' => true],
                ]),
                'type' => 'json',
                'group' => 'contact',
                'description' => 'Horaires d\'ouverture par jour',
            ],

            // Réseaux sociaux
            [
                'key' => 'social_facebook',
                'value' => '',
                'type' => 'text',
                'group' => 'social',
                'description' => 'URL Facebook',
            ],
            [
                'key' => 'social_twitter',
                'value' => '',
                'type' => 'text',
                'group' => 'social',
                'description' => 'URL Twitter/X',
            ],
            [
                'key' => 'social_instagram',
                'value' => '',
                'type' => 'text',
                'group' => 'social',
                'description' => 'URL Instagram',
            ],
            [
                'key' => 'social_linkedin',
                'value' => '',
                'type' => 'text',
                'group' => 'social',
                'description' => 'URL LinkedIn',
            ],
            [
                'key' => 'social_youtube',
                'value' => '',
                'type' => 'text',
                'group' => 'social',
                'description' => 'URL YouTube',
            ],
            [
                'key' => 'social_whatsapp',
                'value' => '',
                'type' => 'text',
                'group' => 'social',
                'description' => 'Numéro WhatsApp',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
