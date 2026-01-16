<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\JournalEdition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JournalEditionController extends Controller
{
    public function index()
    {
        $items = JournalEdition::orderByDesc('published_at')
            ->orderBy('ordre')
            ->orderBy('id')
            ->get();

        return response()->json([
            'data' => $items,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $this->validatePayload($request);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $validated['file_path'] = $file->store('journals', 'public');
                $validated['file_size'] = $file->getSize();
            }

            if ($request->hasFile('cover_image')) {
                $validated['cover_image_path'] = $request->file('cover_image')->store('journals/covers', 'public');
            }

            $edition = JournalEdition::create($validated);

            return response()->json([
                'data' => $edition,
                'message' => 'Édition créée avec succès',
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création du journal: '.$e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la création',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, JournalEdition $journalEdition)
    {
        try {
            $validated = $this->validatePayload($request, true);

            if ($request->hasFile('file')) {
                $this->deleteLocalFile($journalEdition->file_path);
                $file = $request->file('file');
                $validated['file_path'] = $file->store('journals', 'public');
                $validated['file_size'] = $file->getSize();
            }

            if ($request->hasFile('cover_image')) {
                $this->deleteLocalFile($journalEdition->cover_image_path);
                $validated['cover_image_path'] = $request->file('cover_image')->store('journals/covers', 'public');
            }

            $journalEdition->update($validated);

            return response()->json([
                'data' => $journalEdition->fresh(),
                'message' => 'Édition mise à jour avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour du journal: '.$e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(JournalEdition $journalEdition)
    {
        try {
            $this->deleteLocalFile($journalEdition->file_path);
            $this->deleteLocalFile($journalEdition->cover_image_path);
            $journalEdition->delete();

            return response()->json([
                'message' => 'Édition supprimée avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression du journal: '.$e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function validatePayload(Request $request, bool $partial = false): array
    {
        return $request->validate([
            'title' => [$partial ? 'sometimes' : 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'published_at' => ['nullable', 'date'],
            'ordre' => ['nullable', 'integer', 'min:0'],
            'actif' => ['nullable', 'boolean'],
            'file' => [$partial ? 'nullable' : 'required', 'file', 'mimes:pdf', 'max:20480'],
            'cover_image' => ['nullable', 'file', 'image', 'max:4096'],
        ]);
    }

    private function deleteLocalFile(?string $path): void
    {
        if (! $path) {
            return;
        }

        $isLocal = !str_starts_with($path, 'http://')
            && !str_starts_with($path, 'https://')
            && !str_starts_with($path, '/');

        if ($isLocal) {
            Storage::disk('public')->delete($path);
        }
    }
}
