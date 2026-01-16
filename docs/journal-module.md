# Module Journal municipal

Ce module permet de gerer les editions PDF du journal municipal et de les afficher sur le frontend.

## Fonctionnalites
- CRUD admin (ajout, modification, suppression)
- Upload PDF + cover image optionnelle
- Listing admin avec recherche, tri, pagination, export
- Frontend dynamique avec fallback si aucune edition en base

## Modeles et tables
- Modele: `App\\Models\\JournalEdition`
- Table: `journal_editions`

Champs principaux:
- `title` (titre)
- `description`
- `file_path` (PDF)
- `cover_image_path` (image optionnelle)
- `file_size` (octets)
- `published_at`
- `ordre`
- `actif`

## Routes
- Admin page: `/admin/journal`
- API:
  - GET `/admin/api/journal`
  - POST `/admin/api/journal`
  - PUT `/admin/api/journal/{journalEdition}`
  - DELETE `/admin/api/journal/{journalEdition}`
- Frontend: `/communication/journal`

## Frontend
La page frontend consomme `editions` depuis Inertia et affiche les donnees en cartes.
Fallback local si la base est vide.

## Notes
- PDF requis a la creation.
- Cover image optionnelle.
- Stockage sur le disk `public`.
