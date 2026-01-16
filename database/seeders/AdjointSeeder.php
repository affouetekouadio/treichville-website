<?php

namespace Database\Seeders;

use App\Models\Adjoint;
use Illuminate\Database\Seeder;

class AdjointSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adjoints = [
            [
                'nom' => 'Adjoint 1',
                'role' => '4ème adjoint',
                'photo' => 'personnes/1.jpg',
                'focus' => 'Vie citoyenne & proximité',
                'icon' => 'Users',
                'ordre' => 1,
                'actif' => true,
            ],
            [
                'nom' => 'Adjoint 2',
                'role' => '3ème adjoint',
                'photo' => 'personnes/2.jpg',
                'focus' => 'Culture & patrimoine',
                'icon' => 'Landmark',
                'ordre' => 2,
                'actif' => true,
            ],
            [
                'nom' => 'Adjoint 3',
                'role' => '2ème adjoint',
                'photo' => 'personnes/3.jpg',
                'focus' => 'Urbanisme & cadre de vie',
                'icon' => 'MapPin',
                'ordre' => 3,
                'actif' => true,
            ],
            [
                'nom' => 'Adjoint 4',
                'role' => '5ème adjoint',
                'photo' => 'personnes/4.jpg',
                'focus' => 'Jeunesse & sports',
                'icon' => 'Award',
                'ordre' => 4,
                'actif' => true,
            ],
        ];

        foreach ($adjoints as $adjoint) {
            Adjoint::updateOrCreate(
                ['nom' => $adjoint['nom']],
                $adjoint
            );
        }
    }
}
