<?php

use App\Http\Controllers\Admin\ActualiteController;
use App\Http\Controllers\Admin\AdjointController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\ContentBlockController;
use App\Http\Controllers\Admin\DirectionController;
use App\Http\Controllers\Admin\EditorImageController;
use App\Http\Controllers\Admin\EvenementController;
use App\Http\Controllers\Admin\JournalEditionController;
use App\Http\Controllers\Admin\LieuController;
use App\Http\Controllers\Admin\MediaFileController;
use App\Http\Controllers\Admin\MessageMaireController;
use App\Http\Controllers\Admin\PatrimoineController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SlideController;
use App\Models\Actualite;
use App\Models\Adjoint;
use App\Models\Category;
use App\Models\Contact;
use App\Models\ContentBlock;
use App\Models\Direction;
use App\Models\Evenement;
use App\Models\JournalEdition;
use App\Models\Lieu;
use App\Models\MediaFile;
use App\Models\MessageMaire;
use App\Models\Patrimoine;
use App\Models\Slide;
use App\Support\Listing\ListingQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

$fallbackActualites = [
    [
        'id' => 1,
        'titre' => "3e réunion du Conseil municipal",
        'slug' => Str::slug("3e réunion du Conseil municipal"),
        'description' => "Cohésion sociale, adoption des procès-verbaux et budgets 2025/2026 présidés par le Maire Amichia.",
        'contenu' => "<p>Cohésion sociale, adoption des procès-verbaux et budgets 2025/2026 présidés par le Maire Amichia.</p><p>Retour sur les décisions majeures et les prochaines étapes pour la commune.</p>",
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
        'slug' => Str::slug("Rentrée pastorale et anniversaire du Maire"),
        'description' => "Messe d'action de grâce et 21e anniversaire de la chorale Saint François d'Assise, en présence du Maire Amichia.",
        'contenu' => "<p>Messe d'action de grâce et 21e anniversaire de la chorale Saint François d'Assise, en présence du Maire Amichia.</p><p>Une cérémonie marquante pour la communauté locale.</p>",
        'categorie' => "Institutionnel",
        'image_url' => "/images/actualites/actualite-3.jpg",
        'date_publication' => "2025-10-05",
    ],
    [
        'id' => 4,
        'titre' => "Éducation : kits scolaires et prix d'excellence",
        'slug' => Str::slug("Éducation : kits scolaires et prix d'excellence"),
        'description' => "L'ONG Agir pour Treichville offre des kits scolaires et lance un prix d'excellence pour soutenir les élèves.",
        'contenu' => "<p>L'ONG Agir pour Treichville offre des kits scolaires et lance un prix d'excellence pour soutenir les élèves.</p><p>Une initiative pour encourager la réussite éducative.</p>",
        'categorie' => "Éducation",
        'image_url' => "/images/actualites/education.jpg",
        'date_publication' => "2024-09-01",
    ],
];

$fallbackEvenements = [
    [
        'id' => 1,
        'titre' => "Festival des saveurs de Treichville",
        'slug' => Str::slug("Festival des saveurs de Treichville"),
        'description' => "Découverte de la gastronomie locale, concerts live et animations familiales.",
        'contenu' => "<p>Découverte de la gastronomie locale, concerts live et animations familiales.</p><p>Un rendez-vous festif pour toute la famille.</p>",
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
        'slug' => Str::slug("Course lagunaire solidaire"),
        'description' => "Parcours 5 km et 10 km le long des berges pour soutenir les associations locales.",
        'contenu' => "<p>Parcours 5 km et 10 km le long des berges pour soutenir les associations locales.</p><p>Inscription ouverte à tous les publics.</p>",
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
        'slug' => Str::slug("Nuit de la culture urbaine"),
        'description' => "Scènes ouvertes, graffiti et danse urbaine avec les artistes de la commune.",
        'contenu' => "<p>Scènes ouvertes, graffiti et danse urbaine avec les artistes de la commune.</p><p>Une soirée vibrante au cœur de Treichville.</p>",
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

$loadSlides = function () {
    return Slide::actifs()->get()->map->toFrontendArray();
};

$fallbackJournals = [
    [
        'id' => 1,
        'title' => 'Journal municipal - Édition Juin 2024',
        'description' => '',
        'size' => '0.6 Mo - PDF',
        'url' => '/pdfs/journal-2024-06.pdf',
        'download_url' => '/pdfs/journal-2024-06.pdf',
        'cover_image' => null,
        'published_at' => '2024-06-01',
    ],
    [
        'id' => 2,
        'title' => 'Journal municipal - Édition Mars 2024',
        'description' => '',
        'size' => '0.6 Mo - PDF',
        'url' => '/pdfs/journal-2024-03.pdf',
        'download_url' => '/pdfs/journal-2024-03.pdf',
        'cover_image' => null,
        'published_at' => '2024-03-01',
    ],
    [
        'id' => 3,
        'title' => 'Journal municipal - Édition Décembre 2023',
        'description' => '',
        'size' => '0.7 Mo - PDF',
        'url' => '/pdfs/journal-2023-12.pdf',
        'download_url' => '/pdfs/journal-2023-12.pdf',
        'cover_image' => null,
        'published_at' => '2023-12-01',
    ],
];

$loadJournals = function () use ($fallbackJournals) {
    $items = JournalEdition::actifs()->get()->map->toFrontendArray();

    return $items->isNotEmpty() ? $items : collect($fallbackJournals);
};

/**
 * @param string $page
 * @return \Illuminate\Support\Collection<string, array>
 */
$loadContentBlocks = function (string $page) {
    return ContentBlock::actifs()
        ->where('page', $page)
        ->get()
        ->mapWithKeys(function (ContentBlock $block) {
            return [$block->section_key => $block->toFrontendArray()];
        });
};

Route::get('/', function () use ($loadActualites, $loadEvenements, $loadSlides, $loadContentBlocks) {
    $homeBlocks = $loadContentBlocks('home');

    // Récupérer les flash infos depuis les 3 sources
    $flashInfos = collect();

    // Flash infos des actualités
    $flashActualites = Actualite::flashInfos()->get()->map(function ($item) {
        return [
            'id' => 'actualite-' . $item->id,
            'type' => 'actualite',
            'titre' => $item->titre,
            'description' => $item->description,
            'url' => route('actualites.show', $item->slug),
        ];
    });
    $flashInfos = $flashInfos->merge($flashActualites);

    // Flash infos des événements
    $flashEvenements = Evenement::flashInfos()->get()->map(function ($item) {
        return [
            'id' => 'evenement-' . $item->id,
            'type' => 'evenement',
            'titre' => $item->titre,
            'description' => $item->description,
            'url' => route('evenements.show', $item->slug),
        ];
    });
    $flashInfos = $flashInfos->merge($flashEvenements);

    // Flash infos des lieux
    $flashLieux = Lieu::flashInfos()->get()->map(function ($item) {
        return [
            'id' => 'lieu-' . $item->id,
            'type' => 'lieu',
            'titre' => $item->nom,
            'description' => $item->description,
            'url' => route('decouvrir.index'),
        ];
    });
    $flashInfos = $flashInfos->merge($flashLieux);

    $homeDirections = Direction::actives()
        ->get()
        ->map(function (Direction $direction) {
            return [
                'id' => $direction->id,
                'nom' => $direction->nom,
                'slug' => $direction->slug,
                'short_description' => $direction->short_description ?: $direction->description,
                'icon' => $direction->icon,
                'ordre' => $direction->ordre,
            ];
        });
    $adjoints = Adjoint::actif()
        ->ordered()
        ->get()
        ->map(function (Adjoint $adjoint) {
            return [
                'id' => $adjoint->id,
                'nom' => $adjoint->nom,
                'role' => $adjoint->role,
                'photo_url' => $adjoint->photo_url,
                'ordre' => $adjoint->ordre,
            ];
        });

    return Inertia::render('Frontend/Home', [
        'services' => [],
        'homeSlides' => $loadSlides()->values(),
        'homeContent' => [
            'welcome' => $homeBlocks->get('welcome'),
            'identity' => $homeBlocks->get('identity'),
            'stats' => $homeBlocks->get('stats'),
        ],
        'homeActualites' => $loadActualites()->take(3)->values(),
        'homeEvenements' => $loadEvenements()->take(3)->values(),
        'homeDirections' => $homeDirections,
        'homeAdjoints' => $adjoints,
        'flashInfos' => $flashInfos->values(),
    ]);
})->name('home');

Route::get('/contact', function () {
    $directions = Direction::actives()
        ->with('contacts')
        ->get()
        ->map(function (Direction $direction) {
            return $direction->toFrontendArray();
        });

    return Inertia::render('Frontend/Contact', [
        'directionContacts' => $directions,
    ]);
})->name('contact');

Route::post('/contact', [App\Http\Controllers\Frontend\ContactController::class, 'store'])->name('contact.store');

Route::get('/actualites', function (Request $request) use ($loadActualites) {
    $perPage = 12;
    $search = trim((string) $request->query('search', ''));
    $category = trim((string) $request->query('category', ''));
    $hasFilters = $search !== '' || $category !== '';

    if (! $hasFilters && ! Actualite::published()->exists()) {
        $fallback = $loadActualites()->values();

        return Inertia::render('Frontend/Actualites/Index', [
            'actualites' => $fallback,
            'pagination' => [
                'page' => 1,
                'per_page' => $perPage,
                'total' => $fallback->count(),
                'last_page' => 1,
            ],
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
            'categories' => Category::query()
                ->where('type', 'actualite')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    $query = Actualite::published()->with('category')->orderByDesc('published_at');

    if ($search !== '') {
        $query->where(function ($builder) use ($search) {
            $builder->where('titre', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        });
    }

    if ($category !== '') {
        $query->where(function ($builder) use ($category) {
            $builder->where('categorie', $category)
                ->orWhereHas('category', function ($relation) use ($category) {
                    $relation->where('name', $category);
                });
        });
    }

    $paginator = $query->paginate($perPage)->withQueryString();
    $actualites = $paginator
        ->getCollection()
        ->map(fn (Actualite $actualite) => $actualite->toFrontendArray())
        ->values();

    return Inertia::render('Frontend/Actualites/Index', [
        'actualites' => $actualites,
        'pagination' => [
            'page' => $paginator->currentPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
            'last_page' => $paginator->lastPage(),
        ],
        'filters' => [
            'search' => $search,
            'category' => $category,
        ],
        'categories' => Category::query()
            ->where('type', 'actualite')
            ->orderBy('name')
            ->get(['id', 'name']),
    ]);
})->name('actualites.index');

Route::get('/evenements', function (Request $request) use ($loadEvenements) {
    $perPage = 12;
    $search = trim((string) $request->query('search', ''));
    $category = trim((string) $request->query('category', ''));
    $hasFilters = $search !== '' || $category !== '';

    if (! $hasFilters && ! Evenement::published()->exists()) {
        $fallback = $loadEvenements()->values();

        return Inertia::render('Frontend/Evenements/Index', [
            'evenements' => $fallback,
            'pagination' => [
                'page' => 1,
                'per_page' => $perPage,
                'total' => $fallback->count(),
                'last_page' => 1,
            ],
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
            'categories' => Category::query()
                ->where('type', 'evenement')
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    $query = Evenement::published()->with('category')->orderBy('date_debut');

    if ($search !== '') {
        $query->where(function ($builder) use ($search) {
            $builder->where('titre', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhere('lieu', 'like', '%' . $search . '%');
        });
    }

    if ($category !== '') {
        $query->where(function ($builder) use ($category) {
            $builder->where('categorie', $category)
                ->orWhereHas('category', function ($relation) use ($category) {
                    $relation->where('name', $category);
                });
        });
    }

    $paginator = $query->paginate($perPage)->withQueryString();
    $evenements = $paginator
        ->getCollection()
        ->map(fn (Evenement $evenement) => $evenement->toFrontendArray())
        ->values();

    return Inertia::render('Frontend/Evenements/Index', [
        'evenements' => $evenements,
        'pagination' => [
            'page' => $paginator->currentPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
            'last_page' => $paginator->lastPage(),
        ],
        'filters' => [
            'search' => $search,
            'category' => $category,
        ],
        'categories' => Category::query()
            ->where('type', 'evenement')
            ->orderBy('name')
            ->get(['id', 'name']),
    ]);
})->name('evenements.index');

Route::get('/services', function () {
    $services = Direction::actives()
        ->get()
        ->map(function (Direction $direction) {
            return [
                'id' => $direction->id,
                'nom' => $direction->nom,
                'slug' => $direction->slug,
                'description' => $direction->description,
                'short_description' => $direction->short_description ?: $direction->description,
                'icon' => $direction->icon,
                'responsable' => $direction->responsable,
                'adresse' => $direction->adresse,
                'ordre' => $direction->ordre,
            ];
        });

    return Inertia::render('Frontend/Services/Index', [
        'services' => $services,
    ]);
})->name('services.index');

Route::get('/services/{slug}', function (string $slug) {
    $direction = Direction::with('contacts')
        ->where('slug', $slug)
        ->firstOrFail();

    $autresDirections = Direction::actives()
        ->where('id', '!=', $direction->id)
        ->take(6)
        ->get()
        ->map(function (Direction $item) {
            return [
                'id' => $item->id,
                'nom' => $item->nom,
                'slug' => $item->slug,
                'short_description' => $item->short_description ?: $item->description,
                'icon' => $item->icon,
            ];
        });

    return Inertia::render('Frontend/Services/Details', [
        'direction' => $direction->toFrontendArray(),
        'autres_directions' => $autresDirections,
    ]);
})->name('services.details');

Route::get('/histoire', function () {
    return Inertia::render('Frontend/Histoire/Index');
})->name('histoire');

Route::get('/histoire/annexes', function () {
    return Inertia::render('Frontend/Histoire/Annexes');
})->name('histoire.annexes');

Route::get('/patrimoine', function () {
    $items = Patrimoine::published()
        ->orderByDesc('published_at')
        ->orderByDesc('created_at')
        ->get()
        ->map(fn (Patrimoine $patrimoine) => $patrimoine->toFrontendArray());

    $fallback = collect([
        [
            'id' => 1,
            'titre' => "Le Marché de Treichville",
            'description' => "Haut lieu du commerce et de la vie quotidienne, reflet de la diversité culturelle de la commune.",
            'image_url' => "/grand-marche-treichville.png",
            'lieu' => "Treichville, Abidjan",
        ],
        [
            'id' => 2,
            'titre' => "Palais de la culture",
            'description' => "Espace public central, lieu de rassemblement et de manifestations culturelles.",
            'image_url' => "/palais-de-la-culture.jpg",
            'lieu' => "Treichville, Abidjan",
        ],
        [
            'id' => 3,
            'titre' => "Le Port Autonome d'Abidjan",
            'description' => "Pôle économique majeur, structurant la vie urbaine et commerciale de la commune.",
            'image_url' => "/port-abidjan.jpg",
            'lieu' => "Treichville, Abidjan",
        ],
    ]);

    return Inertia::render('Frontend/Patrimoine/Index', [
        'patrimoines' => $items->isNotEmpty() ? $items : $fallback,
    ]);
})->name('patrimoine');

Route::get('/etat-civil', function () {
    return Inertia::render('Frontend/EtatCivil/Index');
})->name('etat-civil');

Route::get('/fiscalite-urbanisme', function () {
    return Inertia::render('Frontend/Fiscalite/Index');
})->name('fiscalite');

Route::get('/endroits-a-decouvrir', function () {
    $lieux = Lieu::actif()
        ->ordered()
        ->get()
        ->map(function (Lieu $lieu) {
            return [
                'id' => $lieu->id,
                'type' => $lieu->type,
                'nom' => $lieu->nom,
                'description' => $lieu->description,
                'image_url' => $lieu->image_url,
                'horaires' => $lieu->horaires,
                'acces' => $lieu->acces,
                'equipements' => $lieu->equipements,
                'ordre' => $lieu->ordre,
                'actif' => $lieu->actif,
            ];
        });

    return Inertia::render('Frontend/ParcPiscine/Index', [
        'lieux' => $lieux,
    ]);
})->name('endroits-decouvrir');

Route::get('/parcs-piscines', function () {
    return redirect('/endroits-a-decouvrir');
});

Route::get('/communication', function () {
    return Inertia::render('Frontend/Communication/Index');
})->name('communication');

Route::get('/communication/journal', function (Request $request) use ($loadJournals) {
    $perPage = 12;
    $search = trim((string) $request->query('search', ''));
    $year = (string) $request->query('year', '');
    $month = (string) $request->query('month', '');
    if ($year !== '' && ! preg_match('/^\d{4}$/', $year)) {
        $year = '';
    }

    if ($month !== '' && ! preg_match('/^(0[1-9]|1[0-2])$/', $month)) {
        $month = '';
    }

    $hasFilters = $search !== '' || $year !== '' || $month !== '';

    if (! $hasFilters && ! JournalEdition::actifs()->exists()) {
        $fallback = $loadJournals()->values();

        return Inertia::render('Frontend/Communication/Journal', [
            'editions' => $fallback,
            'pagination' => [
                'page' => 1,
                'per_page' => $perPage,
                'total' => $fallback->count(),
                'last_page' => 1,
            ],
            'filters' => [
                'search' => $search,
                'year' => $year,
                'month' => $month,
            ],
            'available_years' => $fallback
                ->pluck('published_at')
                ->filter()
                ->map(fn (string $date) => substr($date, 0, 4))
                ->unique()
                ->sortDesc()
                ->values(),
        ]);
    }

    $query = JournalEdition::actifs();

    if ($search !== '') {
        $query->where(function ($builder) use ($search) {
            $builder->where('title', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%');
        });
    }

    if ($year !== '') {
        $query->whereYear('published_at', $year);
    }

    if ($month !== '') {
        $query->whereMonth('published_at', $month);
    }

    $paginator = $query->paginate($perPage)->withQueryString();
    $editions = $paginator
        ->getCollection()
        ->map(fn (JournalEdition $edition) => $edition->toFrontendArray())
        ->values();

    $availableYears = JournalEdition::actifs()
        ->whereNotNull('published_at')
        ->selectRaw('YEAR(published_at) as year')
        ->distinct()
        ->orderByDesc('year')
        ->pluck('year')
        ->map(fn ($value) => (string) $value)
        ->values();

    return Inertia::render('Frontend/Communication/Journal', [
        'editions' => $editions,
        'pagination' => [
            'page' => $paginator->currentPage(),
            'per_page' => $paginator->perPage(),
            'total' => $paginator->total(),
            'last_page' => $paginator->lastPage(),
        ],
        'filters' => [
            'search' => $search,
            'year' => $year,
            'month' => $month,
        ],
        'available_years' => $availableYears,
    ]);
})->name('communication.journal');

Route::get('/communication/journal/download/{journalEdition}', function (JournalEdition $journalEdition) {
    abort_unless($journalEdition->actif, 404);

    $path = $journalEdition->file_path;
    if (! $path) {
        abort(404);
    }

    $disk = str_starts_with($path, '/') ? null : 'public';
    $filename = ($journalEdition->title ?: 'journal') . '.pdf';

    if ($disk === null) {
        return response()->download(public_path(ltrim($path, '/')), $filename);
    }

    return response()->download(Storage::disk($disk)->path($path), $filename);
})->name('communication.journal.download');

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

Route::get('/vie-citoyenne/message-du-maire', function () use ($loadContentBlocks) {
    $blocks = $loadContentBlocks('message-maire');
    $messageMaire = MessageMaire::actif()->first();

    return Inertia::render('Frontend/VieCitoyenne/MessageMaire', [
        'messageMaire' => $messageMaire?->toFrontendArray(),
        'content' => [
            'intro' => $blocks->get('intro'),
        ],
    ]);
})->name('vie-citoyenne.message-maire');

Route::get('/vie-citoyenne/conseil-municipal', function () use ($loadContentBlocks) {
    $blocks = $loadContentBlocks('conseil-municipal');

    $adjoints = Adjoint::actif()
        ->ordered()
        ->get()
        ->map(function (Adjoint $adjoint) {
            return [
                'id' => $adjoint->id,
                'nom' => $adjoint->nom,
                'role' => $adjoint->role,
                'photo_url' => $adjoint->photo_url,
                'focus' => $adjoint->focus,
                'icon' => $adjoint->icon,
                'ordre' => $adjoint->ordre,
                'actif' => $adjoint->actif,
            ];
        });

    return Inertia::render('Frontend/VieCitoyenne/ConseilMunicipal', [
        'content' => [
            'intro' => $blocks->get('intro'),
        ],
        'adjoints' => $adjoints,
    ]);
})->name('vie-citoyenne.conseil');

Route::get('/actualites/{slug}', function (string $slug) use ($loadActualites) {
    $actualite = Actualite::published()->where('slug', $slug)->first();
    $item = $actualite?->toFrontendArray();

    if (! $item) {
        $item = $loadActualites()->firstWhere('slug', $slug);
    }

    abort_unless($item, 404);

    $related = $loadActualites()
        ->filter(fn ($actu) => ($actu['slug'] ?? null) !== $slug)
        ->take(4)
        ->values();

    return Inertia::render('Frontend/Actualites/Details', [
        'actualite' => $item,
        'autres_actualites' => $related,
    ]);
})->name('actualites.show');

Route::get('/evenements/{slug}', function (string $slug) use ($loadEvenements) {
    $evenement = Evenement::published()->where('slug', $slug)->first();
    $item = $evenement?->toFrontendArray();

    if (! $item) {
        $item = $loadEvenements()->firstWhere('slug', $slug);
    }

    abort_unless($item, 404);

    $related = $loadEvenements()
        ->filter(fn ($evt) => ($evt['slug'] ?? null) !== $slug)
        ->take(4)
        ->values();

    return Inertia::render('Frontend/Evenements/Details', [
        'evenement' => $item,
        'autres_evenements' => $related,
    ]);
})->name('evenements.show');

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
        Route::get('/actualites', function (Request $request) {
            $listing = ListingQuery::make($request, Actualite::query()->with('category:id,name'), [
                'search' => [
                    'columns' => ['titre', 'description', 'categorie'],
                ],
                'sort' => [
                    'allowed' => ['created_at', 'published_at', 'titre', 'status'],
                    'default' => ['created_at', 'desc'],
                ],
                'pagination' => [
                    'default' => 15,
                    'max' => 100,
                ],
                'export' => [
                    'filename' => 'actualites',
                    'columns' => [
                        'created_at' => 'Date creation',
                        'titre' => 'Titre',
                        'categorie' => 'Categorie',
                        'status' => 'Statut',
                        'published_at' => 'Publie le',
                    ],
                ],
            ]);

            if ($export = $listing->exportIfRequested()) {
                return $export;
            }

            $paginator = $listing->paginate();

            return Inertia::render('Backend/Actualites/Index', [
                'actualites' => $paginator->items(),
                'categories' => Category::where('type', 'actualite')
                    ->orderBy('name')
                    ->get(['id', 'name', 'type']),
                'listing' => [
                    'filters' => $listing->filters(),
                    'pagination' => $listing->paginationMeta($paginator),
                ],
            ]);
        })->name('actualites.index');

        Route::get('/actualites/{actualite}', function (Actualite $actualite) {
            $actualite->load('category:id,name');

            return Inertia::render('Backend/Actualites/Show', [
                'actualite' => [
                    'id' => $actualite->id,
                    'titre' => $actualite->titre,
                    'slug' => $actualite->slug,
                    'description' => $actualite->description,
                    'contenu' => $actualite->contenu,
                    'categorie' => $actualite->categorie,
                    'category' => $actualite->category,
                    'status' => $actualite->status,
                    'published_at' => optional($actualite->published_at)->toIso8601String(),
                    'created_at' => optional($actualite->created_at)->toIso8601String(),
                    'image_url' => $actualite->image_url,
                ],
            ]);
        })->name('actualites.show');

        Route::get('/evenements', function (Request $request) {
            $listing = ListingQuery::make($request, Evenement::query()->with('category:id,name'), [
                'search' => [
                    'columns' => ['titre', 'description', 'categorie', 'lieu'],
                ],
                'sort' => [
                    'allowed' => ['created_at', 'date_debut', 'titre', 'status', 'lieu'],
                    'default' => ['date_debut', 'desc'],
                ],
                'pagination' => [
                    'default' => 15,
                    'max' => 100,
                ],
                'export' => [
                    'filename' => 'evenements',
                    'columns' => [
                        'created_at' => 'Date creation',
                        'titre' => 'Titre',
                        'categorie' => 'Categorie',
                        'lieu' => 'Lieu',
                        'status' => 'Statut',
                        'date_debut' => 'Date debut',
                    ],
                ],
            ]);

            if ($export = $listing->exportIfRequested()) {
                return $export;
            }

            $paginator = $listing->paginate();

            return Inertia::render('Backend/Evenements/Index', [
                'evenements' => $paginator->items(),
                'categories' => Category::where('type', 'evenement')
                    ->orderBy('name')
                    ->get(['id', 'name', 'type']),
                'listing' => [
                    'filters' => $listing->filters(),
                    'pagination' => $listing->paginationMeta($paginator),
                ],
            ]);
        })->name('evenements.index');

        Route::get('/evenements/{evenement}', function (Evenement $evenement) {
            $evenement->load('category:id,name');

            return Inertia::render('Backend/Evenements/Show', [
                'evenement' => [
                    'id' => $evenement->id,
                    'titre' => $evenement->titre,
                    'slug' => $evenement->slug,
                    'description' => $evenement->description,
                    'contenu' => $evenement->contenu,
                    'categorie' => $evenement->categorie,
                    'category' => $evenement->category,
                    'status' => $evenement->status,
                    'date_debut' => optional($evenement->date_debut)->toIso8601String(),
                    'date_fin' => optional($evenement->date_fin)->toIso8601String(),
                    'lieu' => $evenement->lieu,
                    'gratuit' => $evenement->gratuit,
                    'image_url' => $evenement->image_url,
                ],
            ]);
        })->name('evenements.show');

        Route::get('/patrimoines', function (Request $request) {
            $listing = ListingQuery::make($request, Patrimoine::query(), [
                'search' => [
                    'columns' => ['titre', 'description', 'lieu'],
                ],
                'sort' => [
                    'allowed' => ['created_at', 'published_at', 'titre', 'status'],
                    'default' => ['created_at', 'desc'],
                ],
                'pagination' => [
                    'default' => 15,
                    'max' => 100,
                ],
                'export' => [
                    'filename' => 'patrimoines',
                    'columns' => [
                        'created_at' => 'Date creation',
                        'titre' => 'Titre',
                        'lieu' => 'Lieu',
                        'status' => 'Statut',
                        'published_at' => 'Publie le',
                    ],
                ],
            ]);

            if ($export = $listing->exportIfRequested()) {
                return $export;
            }

            $paginator = $listing->paginate();

            return Inertia::render('Backend/Patrimoines/Index', [
                'patrimoines' => $paginator->items(),
                'listing' => [
                    'filters' => $listing->filters(),
                    'pagination' => $listing->paginationMeta($paginator),
                ],
            ]);
        })->name('patrimoines.index');

        Route::get('/media', function (Request $request) {
            $listing = ListingQuery::make($request, MediaFile::query(), [
                'search' => [
                    'columns' => ['title', 'collection', 'file_type', 'mime_type'],
                ],
                'sort' => [
                    'allowed' => ['created_at', 'title', 'collection', 'size'],
                    'default' => ['created_at', 'desc'],
                ],
                'pagination' => [
                    'default' => 15,
                    'max' => 100,
                ],
                'export' => [
                    'filename' => 'media',
                    'columns' => [
                        'created_at' => 'Date creation',
                        'title' => 'Titre',
                        'collection' => 'Collection',
                        'file_type' => 'Type',
                        'mime_type' => 'Mime',
                        'size' => 'Taille',
                        'path' => 'Chemin',
                    ],
                ],
            ]);

            if ($export = $listing->exportIfRequested()) {
                return $export;
            }

            $paginator = $listing->paginate();

            return Inertia::render('Backend/Media/Index', [
                'media' => $paginator->items(),
                'listing' => [
                    'filters' => $listing->filters(),
                    'pagination' => $listing->paginationMeta($paginator),
                ],
            ]);
        })->name('media.index');

        Route::get('/categories', function (Request $request) {
            $listing = ListingQuery::make($request, Category::query(), [
                'search' => [
                    'columns' => ['name', 'type'],
                ],
                'sort' => [
                    'allowed' => ['created_at', 'name', 'type'],
                    'default' => ['name', 'asc'],
                ],
                'pagination' => [
                    'default' => 15,
                    'max' => 100,
                ],
                'export' => [
                    'filename' => 'categories',
                    'columns' => [
                        'created_at' => 'Date creation',
                        'name' => 'Nom',
                        'type' => 'Type',
                    ],
                ],
            ]);

            if ($export = $listing->exportIfRequested()) {
                return $export;
            }

            $paginator = $listing->paginate();

            return Inertia::render('Backend/Categories/Index', [
                'categories' => $paginator->items(),
                'listing' => [
                    'filters' => $listing->filters(),
                    'pagination' => $listing->paginationMeta($paginator),
                ],
            ]);
        })->name('categories.index');

        Route::get('/contacts', function (Request $request) {
            $listing = ListingQuery::make($request, Contact::query(), [
                'search' => [
                    'columns' => ['nom', 'email', 'telephone', 'sujet', 'message'],
                ],
                'sort' => [
                    'allowed' => ['created_at', 'nom', 'email', 'sujet', 'traite'],
                    'default' => ['created_at', 'desc'],
                ],
                'pagination' => [
                    'default' => 15,
                    'max' => 100,
                ],
                'export' => [
                    'filename' => 'contacts',
                    'columns' => [
                        'created_at' => 'Date',
                        'nom' => 'Nom',
                        'email' => 'Email',
                        'telephone' => 'Telephone',
                        'sujet' => 'Sujet',
                        'message' => 'Message',
                        'traite' => 'Traite',
                    ],
                ],
            ]);

            if ($export = $listing->exportIfRequested()) {
                return $export;
            }

            $paginator = $listing->paginate();

            return Inertia::render('Backend/Contacts/Index', [
                'contacts' => $paginator->items(),
                'listing' => [
                    'filters' => $listing->filters(),
                    'pagination' => $listing->paginationMeta($paginator),
                ],
            ]);
        })->name('contacts.index');

        Route::get('/slides', function () {
            return Inertia::render('Backend/Slides/Index');
        })->name('slides.index');

        Route::get('/journal', function (Request $request) {
            $listing = ListingQuery::make($request, JournalEdition::query(), [
                'search' => [
                    'columns' => ['title', 'description'],
                ],
                'sort' => [
                    'allowed' => ['published_at', 'title', 'created_at', 'ordre'],
                    'default' => ['published_at', 'desc'],
                ],
                'pagination' => [
                    'default' => 15,
                    'max' => 100,
                ],
                'export' => [
                    'filename' => 'journal',
                    'columns' => [
                        'published_at' => 'Date',
                        'title' => 'Titre',
                        'description' => 'Description',
                        'file_size' => 'Taille',
                    ],
                ],
            ]);

            if ($export = $listing->exportIfRequested()) {
                return $export;
            }

            $paginator = $listing->paginate();

            return Inertia::render('Backend/Journal/Index', [
                'editions' => $paginator->items(),
                'listing' => [
                    'filters' => $listing->filters(),
                    'pagination' => $listing->paginationMeta($paginator),
                ],
            ]);
        })->name('journal.index');

        Route::get('/content-blocks', function () {
            return Inertia::render('Backend/ContentBlocks/Index');
        })->name('content-blocks.index');

        Route::get('/settings', function () {
            return Inertia::render('Backend/Settings/Index');
        })->name('settings.index');

        Route::get('/adjoints', function () {
            return Inertia::render('Backend/Adjoints/Index');
        })->name('adjoints.index');

        Route::get('/messages-maire', function () {
            return Inertia::render('Backend/MessagesMaire/Index');
        })->name('messages-maire.index');

        Route::get('/directions', function (Request $request) {
            $listing = ListingQuery::make($request, Direction::query(), [
                'search' => [
                    'columns' => ['nom', 'short_description', 'description', 'responsable', 'adresse'],
                ],
                'sort' => [
                    'allowed' => ['ordre', 'created_at', 'nom'],
                    'default' => ['ordre', 'asc'],
                ],
                'pagination' => [
                    'default' => 15,
                    'max' => 100,
                ],
                'export' => [
                    'filename' => 'directions',
                    'columns' => [
                        'nom' => 'Nom',
                        'responsable' => 'Responsable',
                        'ordre' => 'Ordre',
                        'actif' => 'Actif',
                    ],
                ],
            ]);

            if ($export = $listing->exportIfRequested()) {
                return $export;
            }

            $paginator = $listing->paginate();

            $items = collect($paginator->items())->map(function (Direction $direction) {
                return [
                    'id' => $direction->id,
                    'nom' => $direction->nom,
                    'slug' => $direction->slug,
                    'description' => $direction->description,
                    'short_description' => $direction->short_description,
                    'contenu' => $direction->contenu,
                    'icon' => $direction->icon,
                    'responsable' => $direction->responsable,
                    'adresse' => $direction->adresse,
                    'ordre' => $direction->ordre,
                    'actif' => $direction->actif,
                ];
            });

            return Inertia::render('Backend/Directions/Index', [
                'directions' => $items,
                'listing' => [
                    'filters' => $listing->filters(),
                    'pagination' => $listing->paginationMeta($paginator),
                ],
            ]);
        })->name('directions.index');

        Route::get('/lieux', function (Request $request) {
            $listing = ListingQuery::make($request, Lieu::query(), [
                'search' => [
                    'columns' => ['nom', 'description', 'type', 'acces'],
                ],
                'sort' => [
                    'allowed' => ['ordre', 'created_at', 'nom', 'type'],
                    'default' => ['ordre', 'asc'],
                ],
                'pagination' => [
                    'default' => 15,
                    'max' => 100,
                ],
                'export' => [
                    'filename' => 'lieux',
                    'columns' => [
                        'nom' => 'Nom',
                        'type' => 'Type',
                        'acces' => 'Acces',
                        'ordre' => 'Ordre',
                        'actif' => 'Actif',
                    ],
                ],
            ]);

            if ($export = $listing->exportIfRequested()) {
                return $export;
            }

            $paginator = $listing->paginate();

            $items = collect($paginator->items())->map(function (Lieu $lieu) {
                return [
                    'id' => $lieu->id,
                    'type' => $lieu->type,
                    'nom' => $lieu->nom,
                    'description' => $lieu->description,
                    'image' => $lieu->image,
                    'image_url' => $lieu->image_url,
                    'horaires' => $lieu->horaires,
                    'acces' => $lieu->acces,
                    'equipements' => $lieu->equipements,
                    'ordre' => $lieu->ordre,
                    'actif' => $lieu->actif,
                    'created_at' => $lieu->created_at,
                ];
            });

            return Inertia::render('Backend/Lieux/Index', [
                'lieux' => $items,
                'listing' => [
                    'filters' => $listing->filters(),
                    'pagination' => $listing->paginationMeta($paginator),
                ],
            ]);
        })->name('lieux.index');

        // API CRUD backoffice
        Route::get('/api/actualites', [ActualiteController::class, 'index'])->name('api.actualites.index');
        Route::post('/api/actualites', [ActualiteController::class, 'store'])->name('api.actualites.store');
        Route::put('/api/actualites/{actualite}', [ActualiteController::class, 'update'])->name('api.actualites.update');
        Route::delete('/api/actualites/{actualite}', [ActualiteController::class, 'destroy'])->name('api.actualites.destroy');

        Route::get('/api/evenements', [EvenementController::class, 'index'])->name('api.evenements.index');
        Route::post('/api/evenements', [EvenementController::class, 'store'])->name('api.evenements.store');
        Route::put('/api/evenements/{evenement}', [EvenementController::class, 'update'])->name('api.evenements.update');
        Route::delete('/api/evenements/{evenement}', [EvenementController::class, 'destroy'])->name('api.evenements.destroy');

        Route::get('/api/patrimoines', [PatrimoineController::class, 'index'])->name('api.patrimoines.index');
        Route::post('/api/patrimoines', [PatrimoineController::class, 'store'])->name('api.patrimoines.store');
        Route::put('/api/patrimoines/{patrimoine}', [PatrimoineController::class, 'update'])->name('api.patrimoines.update');
        Route::delete('/api/patrimoines/{patrimoine}', [PatrimoineController::class, 'destroy'])->name('api.patrimoines.destroy');

        Route::get('/api/media', [MediaFileController::class, 'index'])->name('api.media.index');
        Route::post('/api/media', [MediaFileController::class, 'store'])->name('api.media.store');
        Route::delete('/api/media/{mediaFile}', [MediaFileController::class, 'destroy'])->name('api.media.destroy');

        Route::get('/api/categories', [CategoryController::class, 'index'])->name('api.categories.index');
        Route::post('/api/categories', [CategoryController::class, 'store'])->name('api.categories.store');
        Route::put('/api/categories/{category}', [CategoryController::class, 'update'])->name('api.categories.update');
        Route::delete('/api/categories/{category}', [CategoryController::class, 'destroy'])->name('api.categories.destroy');

        Route::get('/api/slides', [SlideController::class, 'index'])->name('api.slides.index');
        Route::post('/api/slides', [SlideController::class, 'store'])->name('api.slides.store');
        Route::put('/api/slides/{slide}', [SlideController::class, 'update'])->name('api.slides.update');
        Route::delete('/api/slides/{slide}', [SlideController::class, 'destroy'])->name('api.slides.destroy');

        Route::get('/api/directions', [DirectionController::class, 'index'])->name('api.directions.index');
        Route::post('/api/directions', [DirectionController::class, 'store'])->name('api.directions.store');
        Route::put('/api/directions/{direction}', [DirectionController::class, 'update'])->name('api.directions.update');
        Route::delete('/api/directions/{direction}', [DirectionController::class, 'destroy'])->name('api.directions.destroy');

        Route::get('/api/journal', [JournalEditionController::class, 'index'])->name('api.journal.index');
        Route::post('/api/journal', [JournalEditionController::class, 'store'])->name('api.journal.store');
        Route::put('/api/journal/{journalEdition}', [JournalEditionController::class, 'update'])->name('api.journal.update');
        Route::delete('/api/journal/{journalEdition}', [JournalEditionController::class, 'destroy'])->name('api.journal.destroy');

        Route::get('/api/content-blocks', [ContentBlockController::class, 'index'])->name('api.content-blocks.index');
        Route::post('/api/content-blocks', [ContentBlockController::class, 'store'])->name('api.content-blocks.store');
        Route::put('/api/content-blocks/{contentBlock}', [ContentBlockController::class, 'update'])->name('api.content-blocks.update');
        Route::delete('/api/content-blocks/{contentBlock}', [ContentBlockController::class, 'destroy'])->name('api.content-blocks.destroy');

        Route::get('/api/settings', [SettingController::class, 'index'])->name('api.settings.index');
        Route::post('/api/settings/batch', [SettingController::class, 'updateBatch'])->name('api.settings.batch');
        Route::put('/api/settings/{setting}', [SettingController::class, 'update'])->name('api.settings.update');

        // Upload d'images pour CKEditor
        Route::post('/api/upload-editor-image', [EditorImageController::class, 'upload'])->name('api.upload-editor-image');

        // Gestion des messages de contact
        Route::post('/api/contacts/{contact}/toggle-status', [AdminContactController::class, 'toggleStatus'])->name('api.contacts.toggle-status');
        Route::delete('/api/contacts/{contact}', [AdminContactController::class, 'destroy'])->name('api.contacts.destroy');

        // Gestion des adjoints
        Route::get('/api/adjoints', [AdjointController::class, 'index'])->name('api.adjoints.index');
        Route::post('/api/adjoints', [AdjointController::class, 'store'])->name('api.adjoints.store');
        Route::put('/api/adjoints/{adjoint}', [AdjointController::class, 'update'])->name('api.adjoints.update');
        Route::delete('/api/adjoints/{adjoint}', [AdjointController::class, 'destroy'])->name('api.adjoints.destroy');
        Route::post('/api/adjoints/update-order', [AdjointController::class, 'updateOrder'])->name('api.adjoints.update-order');

        // Gestion des messages du maire
        Route::get('/api/messages-maire', [MessageMaireController::class, 'index'])->name('api.messages-maire.index');
        Route::post('/api/messages-maire', [MessageMaireController::class, 'store'])->name('api.messages-maire.store');
        Route::put('/api/messages-maire/{messageMaire}', [MessageMaireController::class, 'update'])->name('api.messages-maire.update');
        Route::delete('/api/messages-maire/{messageMaire}', [MessageMaireController::class, 'destroy'])->name('api.messages-maire.destroy');
        Route::post('/api/messages-maire/{messageMaire}/toggle-actif', [MessageMaireController::class, 'toggleActif'])->name('api.messages-maire.toggle-actif');

        // Gestion des lieux
        Route::get('/api/lieux', [LieuController::class, 'index'])->name('api.lieux.index');
        Route::post('/api/lieux', [LieuController::class, 'store'])->name('api.lieux.store');
        Route::put('/api/lieux/{lieu}', [LieuController::class, 'update'])->name('api.lieux.update');
        Route::delete('/api/lieux/{lieu}', [LieuController::class, 'destroy'])->name('api.lieux.destroy');
        Route::post('/api/lieux/update-order', [LieuController::class, 'updateOrder'])->name('api.lieux.update-order');
    });

// Route publique pour récupérer les paramètres (sans authentification)
Route::get('/api/settings/public', [SettingController::class, 'public'])->name('api.settings.public');

require __DIR__.'/settings.php';
