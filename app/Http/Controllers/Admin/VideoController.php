<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function index()
    {
        $videos = Video::orderBy('ordre')
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Video $video) => $video->toFrontendArray());

        return response()->json([
            'data' => $videos,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'youtube_url' => ['required', 'string', 'max:255'],
            'published_at' => ['nullable', 'date'],
            'ordre' => ['nullable', 'integer', 'min:0'],
            'actif' => ['nullable'],
        ]);

        if (array_key_exists('actif', $validated)) {
            $validated['actif'] = filter_var($validated['actif'], FILTER_VALIDATE_BOOLEAN);
        }

        $video = Video::create($validated);

        return response()->json([
            'message' => 'Vidéo créée avec succès',
            'video' => $video->toFrontendArray(),
        ], 201);
    }

    public function update(Request $request, Video $video)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'youtube_url' => ['required', 'string', 'max:255'],
            'published_at' => ['nullable', 'date'],
            'ordre' => ['nullable', 'integer', 'min:0'],
            'actif' => ['nullable'],
        ]);

        if (array_key_exists('actif', $validated)) {
            $validated['actif'] = filter_var($validated['actif'], FILTER_VALIDATE_BOOLEAN);
        }

        $video->update($validated);

        return response()->json([
            'message' => 'Vidéo mise à jour avec succès',
            'video' => $video->toFrontendArray(),
        ]);
    }

    public function destroy(Video $video)
    {
        $video->delete();

        return response()->json([
            'message' => 'Vidéo supprimée avec succès',
        ]);
    }
}
