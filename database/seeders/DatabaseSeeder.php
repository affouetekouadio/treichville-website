<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Actualite;
use App\Models\Evenement;
use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'admin@treichville.ci'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        $categories = [
            ['name' => 'Institutionnel', 'type' => 'actualite'],
            ['name' => 'Culture', 'type' => 'actualite'],
            ['name' => 'Sport', 'type' => 'evenement'],
            ['name' => 'Événement', 'type' => 'evenement'],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => Str::slug($category['name']), 'type' => $category['type']],
                $category
            );
        }

        $categorieActu = Category::where('type', 'actualite')->first();
        $categorieEvent = Category::where('type', 'evenement')->first();

        $actualites = [
            [
                'titre' => "3e réunion du Conseil municipal",
                'description' => "Cohésion sociale, adoption des procès-verbaux et budgets 2025/2026 présidés par le Maire Amichia.",
                'categorie' => "Institutionnel",
                'category_id' => $categorieActu?->id,
                'image_path' => "/images/actualites/actualite-2.jpg",
                'published_at' => now()->subDays(4),
                'status' => 'published',
            ],
            [
                'titre' => "Rentrée pastorale et anniversaire du Maire",
                'description' => "Messe d'action de grâce et 21e anniversaire de la chorale Saint François d'Assise, en présence du Maire Amichia.",
                'categorie' => "Institutionnel",
                'category_id' => $categorieActu?->id,
                'image_path' => "/images/actualites/actualite-3.jpg",
                'published_at' => now()->subDays(6),
                'status' => 'published',
            ],
            [
                'titre' => "Éducation : kits scolaires et prix d'excellence",
                'description' => "L'ONG Agir pour Treichville offre des kits scolaires et lance un prix d'excellence pour soutenir les élèves.",
                'categorie' => "Éducation",
                'category_id' => $categorieActu?->id,
                'image_path' => "/images/actualites/education.jpg",
                'published_at' => now()->subDays(30),
                'status' => 'published',
            ],
        ];

        foreach ($actualites as $actualite) {
            Actualite::firstOrCreate(
                ['slug' => Str::slug($actualite['titre'])],
                $actualite
            );
        }

        $evenements = [
            [
                'titre' => "Festival des saveurs de Treichville",
                'description' => "Découverte de la gastronomie locale, concerts live et animations familiales.",
                'categorie' => "Culture",
                'category_id' => $categorieEvent?->id,
                'image_path' => "/images/festival-des-saveurs.png",
                'date_debut' => now()->addDays(20),
                'date_fin' => now()->addDays(20)->addHours(8),
                'lieu' => "Esplanade de la mairie",
                'gratuit' => true,
                'status' => 'published',
            ],
            [
                'titre' => "Course lagunaire solidaire",
                'description' => "Parcours 5 km et 10 km le long des berges pour soutenir les associations locales.",
                'categorie' => "Sport",
                'category_id' => $categorieEvent?->id,
                'image_path' => "/images/course-lagunaire-solidaire.jpg",
                'date_debut' => now()->addDays(34),
                'date_fin' => now()->addDays(34)->addHours(4),
                'lieu' => "Berges lagunaires",
                'gratuit' => true,
                'status' => 'published',
            ],
            [
                'titre' => "Nuit de la culture urbaine",
                'description' => "Scènes ouvertes, graffiti et danse urbaine avec les artistes de la commune.",
                'categorie' => "Événement",
                'category_id' => $categorieEvent?->id,
                'image_path' => "/images/nuit-culture-urbaine.jpg",
                'date_debut' => now()->addDays(45),
                'date_fin' => now()->addDays(45)->addHours(6),
                'lieu' => "Centre culturel de Treichville",
                'gratuit' => false,
                'status' => 'published',
            ],
        ];

        foreach ($evenements as $evenement) {
            Evenement::firstOrCreate(
                ['slug' => Str::slug($evenement['titre'])],
                $evenement
            );
        }
    }
}
