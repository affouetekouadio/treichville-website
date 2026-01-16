<?php

namespace Database\Seeders;

use App\Models\Lieu;
use Illuminate\Database\Seeder;

class LieuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lieux = [
            [
                'type' => 'Parc',
                'nom' => 'Jardin Public de Treichville',
                'description' => 'Espace vert au cœur de la commune, idéal pour les promenades en famille et les activités de plein air.',
                'image' => 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800',
                'horaires' => '6h00 - 18h00',
                'acces' => 'Gratuit',
                'equipements' => ['Aires de jeux', 'Bancs', 'Espaces verts', 'Allées piétonnes'],
                'ordre' => 1,
                'actif' => true,
            ],
            [
                'type' => 'Piscine',
                'nom' => 'Piscine Municipale',
                'description' => 'Complexe aquatique moderne avec bassins pour tous les âges et tous les niveaux.',
                'image' => 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800',
                'horaires' => '8h00 - 20h00',
                'acces' => 'Payant',
                'equipements' => ['Grand bassin', 'Bassin enfants', 'Vestiaires', 'Snack-bar'],
                'ordre' => 2,
                'actif' => true,
            ],
            [
                'type' => 'Parc',
                'nom' => 'Square de la Jeunesse',
                'description' => 'Espace dédié aux jeunes avec terrains de sport et zones de détente.',
                'image' => 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800',
                'horaires' => '7h00 - 19h00',
                'acces' => 'Gratuit',
                'equipements' => ['Terrain de basket', 'Terrain de foot', 'Skate park', 'Gradins'],
                'ordre' => 3,
                'actif' => true,
            ],
            [
                'type' => 'Piscine',
                'nom' => 'Centre Aquatique du Port',
                'description' => 'Piscine olympique pour les nageurs confirmés et les compétitions.',
                'image' => 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=800',
                'horaires' => '6h00 - 21h00',
                'acces' => 'Payant',
                'equipements' => ['Bassin olympique', 'Tribunes', 'Salle de musculation', 'Sauna'],
                'ordre' => 4,
                'actif' => true,
            ],
        ];

        foreach ($lieux as $lieu) {
            Lieu::updateOrCreate(
                ['nom' => $lieu['nom']],
                $lieu
            );
        }
    }
}
