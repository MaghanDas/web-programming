# storage.php documentation

This module provides lightweight file-backed storage with JSON or PHP serialization. Data loads on `Storage` construction and is automatically saved on destruction.

## Components

- `IFileIO` / `FileIO`: Abstraction for persistence; validates the provided file is readable and writable, storing its canonical path.
- `JsonIO`: Reads/writes JSON (`json_decode` / `json_encode(JSON_PRETTY_PRINT)`), returning an empty array on empty/invalid content.
- `SerializeIO`: Reads/writes serialized PHP data (`serialize` / `unserialize`), returning an empty array on empty/invalid content.
- `IStorage`: CRUD interface for records plus bulk helpers (`findMany`, `updateMany`, `deleteMany`).
- `Storage`: In-memory collection persisted through the injected `IFileIO` implementation.

## Storage behavior

- Construction: `$storage = new Storage(new JsonIO('data.json'));` loads existing contents as an array (keys are record IDs).
- Destruction: Persists current contents via the injected `IFileIO`.
- `add($record)`: Generates a unique ID, attaches it to arrays/objects, stores, and returns the ID.
- `findById($id)`: Returns the record or `null`.
- `findAll($params)`: Filters records where all provided key/value pairs strictly match (array-cast for objects).
- `findOne($params)`: First match from `findAll` or `null`.
- `update($id, $record)`: Merges fields into the existing record (arrays/objects) while preserving `id`; returns updated record or `null` if missing.
- `delete($id)`: Removes a record by ID.
- `findMany($condition)`: Filters with a user-provided predicate.
- `updateMany($condition, $updater)`: Applies `$updater` to items that satisfy `$condition`.
- `deleteMany($condition)`: Removes items that satisfy `$condition`.

## Usage example

```php
require 'storage.php';

$io = new JsonIO(__DIR__ . '/data.json');
$storage = new Storage($io);

$id = $storage->add(['title' => 'Example', 'done' => false]);
$one = $storage->findById($id);
$storage->update($id, ['done' => true]);
$doneItems = $storage->findAll(['done' => true]);
$storage->delete($id);
// Data is saved automatically when $storage is destroyed
```

## Notes and caveats

- The data file must already exist and be readable/writable; otherwise construction throws an exception.
- `FileIO` currently echoes the canonical file path during construction; remove if undesired.
- `findAll` uses strict comparison; type mismatches will not match.
- Be cautious with concurrent writers; this class does not handle locking.
