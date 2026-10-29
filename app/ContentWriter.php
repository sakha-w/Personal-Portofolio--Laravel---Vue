<?php

namespace App;

use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Project;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use RuntimeException;
use Throwable;

class ContentWriter
{
    public function save(Model $record, array $data): Model
    {
        $created = [];

        try {
            return DB::transaction(function () use ($record, $data, &$created): Model {
                if ($record->exists) {
                    $record = $record->newQuery()->whereKey($record->getKey())->lockForUpdate()->firstOrFail();
                }
                $previousPaths = $this->paths($record);
                $record->fill(Arr::except($data, ['technology_ids', 'image', 'image_alt', 'remove_image', 'evidence_images', 'evidence_files']));

                if ($record instanceof Project || $record instanceof Certificate) {
                    $this->singleImage($record, $data, $created);
                }
                if ($record instanceof Experience) {
                    $this->gallery($record, $data, $created);
                }

                $record->save();
                if ($record instanceof Project || $record instanceof Experience) {
                    $record->technologies()->sync($data['technology_ids'] ?? []);
                }

                $removed = array_diff($previousPaths, $this->paths($record));
                DB::afterCommit(fn () => $this->deleteFiles($removed));

                return $record->refresh();
            });
        } catch (Throwable $exception) {
            $this->deleteFiles($created);
            if ($exception instanceof QueryException && $exception->getCode() === '23505') {
                $field = str_contains($exception->getMessage(), 'technologies_name') ? 'name' : 'slug';
                throw ValidationException::withMessages([$field => 'This value is already in use.']);
            }
            if ($exception instanceof QueryException && $exception->getCode() === '23503') {
                throw ValidationException::withMessages(['technology_ids' => 'A selected technology is no longer available.']);
            }

            throw $exception;
        }
    }

    public function delete(Model $record): void
    {
        DB::transaction(function () use ($record): void {
            $record = $record->newQuery()->whereKey($record->getKey())->lockForUpdate()->firstOrFail();
            $paths = $this->paths($record);
            $record->delete();
            DB::afterCommit(fn () => $this->deleteFiles($paths));
        });
    }

    private function singleImage(Model $record, array $data, array &$created): void
    {
        if (($data['remove_image'] ?? false) && isset($data['image'])) {
            throw ValidationException::withMessages(['image' => 'Choose either replacement or removal.']);
        }
        if ($data['remove_image'] ?? false) {
            $record->image = null;
        } elseif (isset($data['image'])) {
            $record->image = $this->upload($data['image'], $record->getTable(), $data['image_alt'], $created);
        } elseif (array_key_exists('image_alt', $data)) {
            if (! $record->image || trim($data['image_alt']) === '') {
                throw ValidationException::withMessages(['image_alt' => 'An existing image and descriptive alt text are required.']);
            }
            $record->image = [...$record->image, 'alt' => $data['image_alt']];
        }
        if ($record instanceof Project && (isset($data['image']) || ($data['remove_image'] ?? false))) {
            $record->thumbnail = $record->image['path'] ?? null;
        }
    }

    private function gallery(Experience $record, array $data, array &$created): void
    {
        $files = $data['evidence_files'] ?? [];
        if (! array_key_exists('evidence_images', $data)) {
            if ($files !== []) {
                throw ValidationException::withMessages(['evidence_images' => 'Describe every uploaded evidence image.']);
            }

            return;
        }

        $items = $data['evidence_images'];
        $existing = collect($record->evidence_images ?? [])->keyBy('id');
        $usedFiles = [];
        $gallery = [];
        foreach ($items as $index => $item) {
            if (isset($item['id']) === isset($item['upload_index'])) {
                throw ValidationException::withMessages(["evidence_images.$index" => 'Supply either an existing image ID or an upload index.']);
            }
            if (isset($item['id'])) {
                if (! $existing->has($item['id'])) {
                    throw ValidationException::withMessages(["evidence_images.$index.id" => 'This image no longer belongs to this experience. Reload before editing.']);
                }
                $gallery[] = [...$existing[$item['id']], 'alt' => $item['alt']];
            } else {
                $fileIndex = (int) $item['upload_index'];
                if (! isset($files[$fileIndex])) {
                    throw ValidationException::withMessages(["evidence_images.$index" => 'The referenced upload is missing.']);
                }
                $usedFiles[] = $fileIndex;
                $gallery[] = $this->upload($files[$fileIndex], 'experiences', $item['alt'], $created);
            }
        }
        if (count($usedFiles) !== count($files) || count(array_unique($usedFiles)) !== count($usedFiles)) {
            throw ValidationException::withMessages(['evidence_files' => 'Reference each uploaded file exactly once.']);
        }
        $record->evidence_images = $gallery;
    }

    private function upload(UploadedFile $file, string $directory, string $alt, array &$created): array
    {
        $dimensions = getimagesize($file->getPathname());
        if (! $dimensions) {
            throw ValidationException::withMessages(['image' => 'The image could not be read.']);
        }
        $id = (string) Str::uuid();
        $name = $id.'.'.$file->extension();
        $path = $directory.'/'.$name;
        $created[] = $path;
        $contents = file_get_contents($file->getPathname());
        if ($contents === false || ! Storage::disk('public')->put($path, $contents)) {
            throw new RuntimeException('The image could not be stored.');
        }

        return ['id' => $id, 'path' => $path, 'alt' => $alt, 'width' => $dimensions[0], 'height' => $dimensions[1]];
    }

    private function paths(Model $record): array
    {
        return array_filter([
            $record->getAttribute('image')['path'] ?? null,
            ...array_column($record->getAttribute('evidence_images') ?? [], 'path'),
        ]);
    }

    private function deleteFiles(array $paths): void
    {
        foreach (array_unique($paths) as $path) {
            try {
                if (! Storage::disk('public')->delete($path)) {
                    Log::warning('Content image cleanup failed.', ['path' => $path]);
                }
            } catch (Throwable $exception) {
                report($exception);
            }
        }
    }
}
