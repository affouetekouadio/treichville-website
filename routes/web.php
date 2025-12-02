<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$homeActualites = [
    [
        'id' => 1,
        'titre' => "Réhabilitation du marché de Belleville",
        'description' => "Modernisation des infrastructures et amélioration des conditions pour les commerçants.",
        'categorie' => "Travaux",
        'image_url' => "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
        'date_publication' => "2024-08-10",
    ],
    [
        'id' => 2,
        'titre' => "Nettoyage citoyen des berges lagunaires",
        'description' => "Appel aux bénévoles pour une opération propreté ce week-end.",
        'categorie' => "Environnement",
        'image_url' => "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
        'date_publication' => "2024-08-12",
    ],
    [
        'id' => 3,
        'titre' => "Forum emploi jeunes à la mairie",
        'description' => "Rencontrez les entreprises locales et découvrez les offres de formation.",
        'categorie' => "Social",
        'image_url' => "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
        'date_publication' => "2024-08-14",
    ],
];

$homeEvenements = [
    [
        'id' => 1,
        'titre' => "Festival des saveurs de Treichville",
        'description' => "Découverte de la gastronomie locale, concerts live et animations familiales.",
        'categorie' => "Culture",
        'image_url' => "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
        'date_debut' => "2026-09-05T10:00:00Z",
        'date_fin' => "2026-09-05T18:00:00Z",
        'lieu' => "Esplanade de la mairie",
        'gratuit' => true,
    ],
    [
        'id' => 2,
        'titre' => "Course lagunaire solidaire",
        'description' => "Parcours 5 km et 10 km le long des berges pour soutenir les associations locales.",
        'categorie' => "Sport",
        'image_url' => "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1600&q=80",
        'date_debut' => "2026-09-12T07:30:00Z",
        'date_fin' => "2026-09-12T11:00:00Z",
        'lieu' => "Berges lagunaires",
        'gratuit' => true,
    ],
    [
        'id' => 3,
        'titre' => "Nuit de la culture urbaine",
        'description' => "Scènes ouvertes, graffiti et danse urbaine avec les artistes de la commune.",
        'categorie' => "Événement",
        'image_url' => "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
        'date_debut' => "2026-09-20T18:00:00Z",
        'date_fin' => "2026-09-21T00:00:00Z",
        'lieu' => "Centre culturel de Treichville",
        'gratuit' => false,
    ],
    [
        'id' => 4,
        'titre' => "Forum des associations",
        'description' => "Rencontre des associations locales, ateliers participatifs et débats citoyens.",
        'categorie' => "Citoyen",
        'image_url' => "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
        'date_debut' => "2026-10-04T09:00:00Z",
        'date_fin' => "2026-10-04T16:00:00Z",
        'lieu' => "Maison des jeunes",
        'gratuit' => true,
    ],
];

Route::get('/', function () use ($homeActualites, $homeEvenements) {
    return Inertia::render('Frontend/Home', [
        'services' => [],
        'homeActualites' => $homeActualites,
        'homeEvenements' => $homeEvenements,
    ]);
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('Frontend/Contact');
})->name('contact');

Route::get('/actualites', function () use ($homeActualites) {
    return Inertia::render('Frontend/Actualites/Index', [
        'actualites' => $homeActualites,
    ]);
})->name('actualites.index');

Route::get('/evenements', function () use ($homeEvenements) {
    return Inertia::render('Frontend/Evenements/Index', [
        'evenements' => $homeEvenements,
    ]);
})->name('evenements.index');

Route::get('/services', function () {
    return Inertia::render('Frontend/Services/Index', [
        'services' => [],
    ]);
})->name('services.index');

Route::get('/services/details', function () {
    return Inertia::render('Frontend/Services/Details');
})->name('services.details');

Route::get('/histoire', function () {
    return Inertia::render('Frontend/Histoire/Index');
})->name('histoire');

Route::get('/patrimoine', function () {
    return Inertia::render('Frontend/Patrimoine/Index');
})->name('patrimoine');

Route::get('/etat-civil', function () {
    return Inertia::render('Frontend/EtatCivil/Index');
})->name('etat-civil');

Route::get('/fiscalite-urbanisme', function () {
    return Inertia::render('Frontend/Fiscalite/Index');
})->name('fiscalite');

Route::get('/parcs-piscines', function () {
    return Inertia::render('Frontend/ParcPiscine/Index');
})->name('parcs-piscines');

Route::get('/que-faire', function () {
    return Inertia::render('Frontend/QueFaire/Index');
})->name('que-faire');

Route::get('/vie-citoyenne', function () {
    return Inertia::render('Frontend/VieCitoyenne/Index');
})->name('vie-citoyenne');

Route::get('/vie-citoyenne/message-du-maire', function () {
    return Inertia::render('Frontend/VieCitoyenne/MessageMaire');
})->name('vie-citoyenne.message-maire');

Route::get('/vie-citoyenne/conseil-municipal', function () {
    return Inertia::render('Frontend/VieCitoyenne/ConseilMunicipal');
})->name('vie-citoyenne.conseil');

Route::get('/actualites/details', function () {
    return Inertia::render('Frontend/Actualites/Details');
})->name('actualites.details');

Route::get('/evenements/details', function () {
    return Inertia::render('Frontend/Evenements/Details');
})->name('evenements.details');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
