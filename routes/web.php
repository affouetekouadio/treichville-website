<?php

use App\Http\Controllers\Admin\ActualiteController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\EvenementController;
use App\Http\Controllers\Admin\MediaFileController;
use App\Models\Actualite;
use App\Models\Evenement;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$fallbackActualites = [
    [
        'id' => 1,
        'titre' => "3e réunion du Conseil municipal",
        'description' => "Cohésion sociale, adoption des procès-verbaux et budgets 2025/2026 présidés par le Maire Amichia.",
        'categorie' => "Institutionnel",
        'image_url' => "/images/actualites/actualite-2.jpg",
        'date_publication' => "2025-10-06",
    ],
    // [
    //     'id' => 2,
    //     'titre' => "Nettoyage citoyen des berges lagunaires",
    //     'description' => "Appel aux bénévoles pour une opération propreté ce week-end.",
    //     'categorie' => "Environnement",
    //     'image_url' => "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=80",
    //     'date_publication' => "2024-08-12",
    // ],
    [
        'id' => 3,
        'titre' => "Rentrée pastorale et anniversaire du Maire",
        'description' => "Messe d'action de grâce et 21e anniversaire de la chorale Saint François d'Assise, en présence du Maire Amichia.",
        'categorie' => "Institutionnel",
        'image_url' => "/images/actualites/actualite-3.jpg",
        'date_publication' => "2025-10-05",
    ],
    [
        'id' => 4,
        'titre' => "Éducation : kits scolaires et prix d'excellence",
        'description' => "L'ONG Agir pour Treichville offre des kits scolaires et lance un prix d'excellence pour soutenir les élèves.",
        'categorie' => "Éducation",
        'image_url' => "/images/actualites/education.jpg",
        'date_publication' => "2024-09-01",
    ],
];

$fallbackEvenements = [
    [
        'id' => 1,
        'titre' => "Festival des saveurs de Treichville",
        'description' => "Découverte de la gastronomie locale, concerts live et animations familiales.",
        'categorie' => "Culture",
        // 'image_url' => "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
        'image_url' => "/images/festival-des-saveurs.png",
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
        'image_url' => "/images/course-lagunaire-solidaire.jpg",
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
        // 'image_url' => "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
        'image_url' => "/images/nuit-culture-urbaine.jpg",
        'date_debut' => "2026-09-20T18:00:00Z",
        'date_fin' => "2026-09-21T00:00:00Z",
        'lieu' => "Centre culturel de Treichville",
        'gratuit' => false,
    ],
    // [
    //     'id' => 4,
    //     'titre' => "Forum des associations",
    //     'description' => "Rencontre des associations locales, ateliers participatifs et débats citoyens.",
    //     'categorie' => "Citoyen",
    //     'image_url' => "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    //     'date_debut' => "2026-10-04T09:00:00Z",
    //     'date_fin' => "2026-10-04T16:00:00Z",
    //     'lieu' => "Maison des jeunes",
    //     'gratuit' => true,
    // ],
];

$radioUrl = 'https://radio.treichville.ci';

$loadActualites = function () use ($fallbackActualites) {
    $items = Actualite::published()->latest('published_at')->get()->map->toFrontendArray();

    return $items->isNotEmpty() ? $items : collect($fallbackActualites);
};

$loadEvenements = function () use ($fallbackEvenements) {
    $items = Evenement::published()->orderBy('date_debut')->get()->map->toFrontendArray();

    return $items->isNotEmpty() ? $items : collect($fallbackEvenements);
};

Route::get('/', function () use ($loadActualites, $loadEvenements) {
    return Inertia::render('Frontend/Home', [
        'services' => [],
        'homeActualites' => $loadActualites()->take(3)->values(),
        'homeEvenements' => $loadEvenements()->take(3)->values(),
    ]);
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('Frontend/Contact');
})->name('contact');

Route::post('/contact', [App\Http\Controllers\Frontend\ContactController::class, 'store'])->name('contact.store');

Route::get('/actualites', function () use ($loadActualites) {
    return Inertia::render('Frontend/Actualites/Index', [
        'actualites' => $loadActualites(),
    ]);
})->name('actualites.index');

Route::get('/evenements', function () use ($loadEvenements) {
    return Inertia::render('Frontend/Evenements/Index', [
        'evenements' => $loadEvenements(),
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

Route::get('/communication', function () {
    return Inertia::render('Frontend/Communication/Index');
})->name('communication');

Route::get('/communication/journal', function () {
    return Inertia::render('Frontend/Communication/Journal');
})->name('communication.journal');

Route::get('/communication/radio', function () use ($radioUrl) {
    return redirect()->away($radioUrl);
})->name('communication.radio');

Route::get('/communication/video', function () {
    return Inertia::render('Frontend/Communication/Video');
})->name('communication.video');

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
        return redirect()->to('/admin/dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Backend/Dashboard/Index');
        })->name('dashboard');

        // Pages Inertia (admin UI)
        Route::get('/actualites', function () {
            return Inertia::render('Backend/Actualites/Index');
        })->name('actualites.index');

        Route::get('/evenements', function () {
            return Inertia::render('Backend/Evenements/Index');
        })->name('evenements.index');

        Route::get('/media', function () {
            return Inertia::render('Backend/Media/Index');
        })->name('media.index');

        Route::get('/categories', function () {
            return Inertia::render('Backend/Categories/Index');
        })->name('categories.index');

        // API CRUD backoffice
        Route::get('/api/actualites', [ActualiteController::class, 'index'])->name('api.actualites.index');
        Route::post('/api/actualites', [ActualiteController::class, 'store'])->name('api.actualites.store');
        Route::put('/api/actualites/{actualite}', [ActualiteController::class, 'update'])->name('api.actualites.update');
        Route::delete('/api/actualites/{actualite}', [ActualiteController::class, 'destroy'])->name('api.actualites.destroy');

        Route::get('/api/evenements', [EvenementController::class, 'index'])->name('api.evenements.index');
        Route::post('/api/evenements', [EvenementController::class, 'store'])->name('api.evenements.store');
        Route::put('/api/evenements/{evenement}', [EvenementController::class, 'update'])->name('api.evenements.update');
        Route::delete('/api/evenements/{evenement}', [EvenementController::class, 'destroy'])->name('api.evenements.destroy');

        Route::get('/api/media', [MediaFileController::class, 'index'])->name('api.media.index');
        Route::post('/api/media', [MediaFileController::class, 'store'])->name('api.media.store');
        Route::delete('/api/media/{mediaFile}', [MediaFileController::class, 'destroy'])->name('api.media.destroy');

        Route::get('/api/categories', [CategoryController::class, 'index'])->name('api.categories.index');
        Route::post('/api/categories', [CategoryController::class, 'store'])->name('api.categories.store');
        Route::put('/api/categories/{category}', [CategoryController::class, 'update'])->name('api.categories.update');
        Route::delete('/api/categories/{category}', [CategoryController::class, 'destroy'])->name('api.categories.destroy');
    });

require __DIR__.'/settings.php';
