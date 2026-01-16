<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ContentBlockController extends Controller
{
    public function index()
    {
        $items = ContentBlock::orderBy('page')
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

            if ($request->hasFile('image')) {
                $validated['image_path'] = $request->file('image')->store('content-blocks', 'public');
            }

            if ($request->hasFile('background_image')) {
                $validated['background_image_path'] = $request->file('background_image')->store('content-blocks/backgrounds', 'public');
            }

            $block = ContentBlock::create($validated);

            return response()->json([
                'data' => $block,
                'message' => 'Bloc créé avec succès',
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création du bloc: '.$e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la création du bloc',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, ContentBlock $contentBlock)
    {
        try {
            $validated = $this->validatePayload($request, $contentBlock->id);

            if ($request->hasFile('image')) {
                $this->deleteLocalFile($contentBlock->image_path);
                $validated['image_path'] = $request->file('image')->store('content-blocks', 'public');
            }

            if ($request->hasFile('background_image')) {
                $this->deleteLocalFile($contentBlock->background_image_path);
                $validated['background_image_path'] = $request->file('background_image')->store('content-blocks/backgrounds', 'public');
            }

            $contentBlock->update($validated);

            return response()->json([
                'data' => $contentBlock->fresh(),
                'message' => 'Bloc mis à jour avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour du bloc: '.$e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la mise à jour du bloc',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(ContentBlock $contentBlock)
    {
        try {
            $this->deleteLocalFile($contentBlock->image_path);
            $this->deleteLocalFile($contentBlock->background_image_path);
            $contentBlock->delete();

            return response()->json([
                'message' => 'Bloc supprimé avec succès',
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la suppression du bloc: '.$e->getMessage());

            return response()->json([
                'message' => 'Une erreur est survenue lors de la suppression du bloc',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    private function validatePayload(Request $request, ?int $ignoreId = null): array
    {
        $uniqueRule = Rule::unique('content_blocks')
            ->where(fn ($query) => $query->where('page', $request->input('page')));

        if ($ignoreId) {
            $uniqueRule = $uniqueRule->ignore($ignoreId);
        }

        return $request->validate([
            'page' => ['required', 'string', 'max:100'],
            'section_key' => ['required', 'string', 'max:100', $uniqueRule],
            'title' => ['nullable', 'string', 'max:255'],
            'content' => ['nullable', 'string', 'max:5000'],
            'cta_text' => ['nullable', 'string', 'max:100'],
            'cta_link' => ['nullable', 'string', 'max:255'],
            'ordre' => ['nullable', 'integer', 'min:0'],
            'actif' => ['nullable', 'boolean'],
            'image' => ['nullable', 'file', 'image', 'max:4096'],
            'background_image' => ['nullable', 'file', 'image', 'max:4096'],
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
