<?php

namespace Database\Seeders;

use App\Models\Adjoint;
use App\Models\Direction;
use Illuminate\Database\Seeder;

class AdjointsAndDirectionsSeeder extends Seeder
{
    public function run(): void
    {
        $adjoints = [
            [
                'nom' => 'Agovi Jérôme AHISSI',
                'role' => '1er Adjoint',
                'focus' => 'Chargé de l’Administration, de l’Etat civil, de l’éducation et de la culture',
                'ordre' => 1,
            ],
            [
                'nom' => 'Mory CAMARA',
                'role' => '2ème Adjoint',
                'focus' => 'Chargé du Transport et du Commerce',
                'ordre' => 2,
            ],
            [
                'nom' => 'Moloko Arthur André DALLYS',
                'role' => '3ème Adjoint',
                'focus' => 'Chargé des Infrastructures économiques et des travaux, de la Sécurité et de l’Environnement',
                'ordre' => 3,
            ],
            [
                'nom' => 'Sébastien Konan KOLLIABO',
                'role' => '4ème Adjoint',
                'focus' => 'Chargé de la Communication, des NTIC, des Sports et loisirs',
                'ordre' => 4,
            ],
            [
                'nom' => 'Issa Tanou FADIGA',
                'role' => '5ème Adjoint',
                'focus' => 'Chargé de la Jeunesse, de l’Insertion des Jeunes et des partenariats public-privé',
                'ordre' => 5,
            ],
            [
                'nom' => 'Nelly Karen Bantah HOBBAH',
                'role' => '6ème Adjoint',
                'focus' => 'Chargée de la Promotion du genre, de l’enfance et des Affaires sociales',
                'ordre' => 6,
            ],
        ];

        foreach ($adjoints as $adjoint) {
            Adjoint::updateOrCreate(
                ['nom' => $adjoint['nom'], 'role' => $adjoint['role']],
                [
                    'focus' => $adjoint['focus'],
                    'icon' => 'Users',
                    'ordre' => $adjoint['ordre'],
                    'actif' => true,
                ]
            );
        }

        $directions = [
            [
                'nom' => 'Secrétaire Général',
                'responsable' => 'Jean Mathieu GNANZOU',
                'short_description' => 'Coordination générale des services municipaux.',
                'icon' => 'Briefcase',
                'ordre' => 1,
            ],
            [
                'nom' => 'Secrétaire Général Adjoint',
                'responsable' => 'Lopez Henri DJIDJI',
                'short_description' => 'Appui administratif et suivi des dossiers transversaux.',
                'icon' => 'FileText',
                'ordre' => 2,
            ],
            [
                'nom' => 'Direction des Affaires Économiques et Financières',
                'responsable' => 'Oumar SANOGO',
                'short_description' => 'Pilotage budgétaire, finances et ressources.',
                'icon' => 'Coins',
                'ordre' => 3,
            ],
            [
                'nom' => 'Direction des Affaires Administratives et de la Formation',
                'responsable' => 'Mohamed Aboubakar Sidikh CISSE',
                'short_description' => 'Gestion administrative et développement des compétences.',
                'icon' => 'Briefcase',
                'ordre' => 4,
            ],
            [
                'nom' => 'Direction des Services Techniques et de l’Environnement',
                'responsable' => 'Kouadio Médard MESSAN',
                'short_description' => 'Suivi des infrastructures et de l’environnement.',
                'icon' => 'Sprout',
                'ordre' => 5,
            ],
            [
                'nom' => 'Direction du Cabinet',
                'responsable' => 'Gatien ANOMA',
                'short_description' => 'Coordination du cabinet et des appuis stratégiques.',
                'icon' => 'Calendar',
                'ordre' => 6,
            ],
            [
                'nom' => 'Direction des Services Sociaux, Culturels et de Promotion Humaine',
                'responsable' => 'Konan Adjoua Pauline KOUASSI',
                'short_description' => 'Actions sociales, culture et promotion humaine.',
                'icon' => 'Heart',
                'ordre' => 7,
            ],
            [
                'nom' => 'Direction de la Sécurité Incendie et d’Assistance à Personnes',
                'responsable' => 'Bakou Edith Jocelyne NIANGORAN épse GBA',
                'short_description' => 'Sécurité incendie et assistance aux personnes.',
                'icon' => 'PhoneCall',
                'ordre' => 8,
            ],
        ];

        foreach ($directions as $direction) {
            Direction::updateOrCreate(
                ['nom' => $direction['nom']],
                [
                    'responsable' => $direction['responsable'],
                    'short_description' => $direction['short_description'] ?? null,
                    'icon' => $direction['icon'] ?? null,
                    'ordre' => $direction['ordre'],
                    'actif' => true,
                ]
            );
        }
    }
}
