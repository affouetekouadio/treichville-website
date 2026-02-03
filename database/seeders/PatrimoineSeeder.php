<?php

namespace Database\Seeders;

use App\Models\Patrimoine;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PatrimoineSeeder extends Seeder
{
    /**
     * Seed the patrimoines table with initial data.
     */
    public function run(): void
    {
        $items = [
            [
                'titre' => 'Le Marché de Treichville',
                'description' => "Haut lieu du commerce et de la vie quotidienne, reflet de la diversité culturelle de la commune.",
                'image_path' => '/grand-marche-treichville.png',
                'lieu' => 'Treichville, Abidjan',
                'status' => 'published',
                'published_at' => now()->subDays(10),
            ],
            [
                'titre' => 'Palais de la culture',
                'description' => "Espace public central, lieu de rassemblement et de manifestations culturelles.",
                'image_path' => '/palais-de-la-culture.jpg',
                'lieu' => 'Treichville, Abidjan',
                'status' => 'published',
                'published_at' => now()->subDays(12),
            ],
            [
                'titre' => "Le Port Autonome d'Abidjan",
                'description' => "Pôle économique majeur, structurant la vie urbaine et commerciale de la commune.",
                'image_path' => '/port-abidjan.jpg',
                'lieu' => 'Treichville, Abidjan',
                'status' => 'published',
                'published_at' => now()->subDays(15),
            ],
        ];

        foreach ($items as $item) {
            Patrimoine::firstOrCreate(
                ['slug' => Str::slug($item['titre'])],
                $item
            );
        }
    }
}
