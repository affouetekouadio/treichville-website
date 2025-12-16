<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaFileController extends Controller
{
    /**
     * Liste des médias (PDF, images) avec leurs associations.
     */
    public function index()
    {
        $items = MediaFile::with(['actualite:id,titre', 'evenement:id,titre'])
            ->latest()
            ->get();

        return response()->json([
            'data' => $items,
        ]);
    }

    /**
     * Upload d’un fichier local (image ou PDF) et liaison éventuelle à un contenu.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'collection' => ['nullable', 'string', 'max:100'],
            'file_type' => ['nullable', 'string', 'max:50'], // ex: image, pdf
            'actualite_id' => ['nullable', 'exists:actualites,id'],
            'evenement_id' => ['nullable', 'exists:evenements,id'],
            'file' => ['required', 'file', 'max:10240'], // 10 Mo
        ]);

        $file = $request->file('file');
        $path = $file->store('media', 'public');

        $media = MediaFile::create([
            'title' => $validated['title'] ?? $file->getClientOriginalName(),
            'path' => $path,
            'disk' => 'public',
            'collection' => $validated['collection'] ?? 'default',
            'file_type' => $validated['file_type'] ?? $file->extension(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'actualite_id' => $validated['actualite_id'] ?? null,
            'evenement_id' => $validated['evenement_id'] ?? null,
        ]);

        return response()->json([
            'data' => $media,
        ], 201);
    }

    /**
     * Suppression d’un média (fichier local inclus).
     */
    public function destroy(MediaFile $mediaFile)
    {
        $path = $mediaFile->path;
        $isLocal = $path && !str_starts_with($path, 'http://') && !str_starts_with($path, 'https://') && !str_starts_with($path, '/');

        if ($isLocal) {
            Storage::disk($mediaFile->disk ?? 'public')->delete($mediaFile->path);
        }

        $mediaFile->delete();

        return response()->noContent();
    }
}
