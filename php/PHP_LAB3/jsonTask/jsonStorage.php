
<?php
class JsonStorage {
    private string $file;

    public function __construct(string $file) {
        $this->file = $file;
        if (!file_exists($file)) {
            file_put_contents($file, json_encode([]));
        }
    }

    private function read(): array {
        return json_decode(file_get_contents($this->file), true);
    }

    private function write(array $data): void {
        file_put_contents($this->file, json_encode($data, JSON_PRETTY_PRINT));
    }

    public function all(): array {
        return $this->read();
    }

    public function add(array $item): void {
        $data = $this->read();
        $data[] = $item;
        $this->write($data);
    }

    public function findById($id): ?array {
        foreach ($this->read() as $item) {
            if ($item['id'] == $id) return $item;
        }
        return null;
    }

    public function findByField(string $field, $value): array {
        return array_filter($this->read(), fn($i) => $i[$field] == $value);
    }

    public function searchContains(string $field, string $value): array {
        return array_filter($this->read(), fn($i) => str_contains($i[$field], $value));
    }

    public function updateById($id, array $newData): void {
        $data = $this->read();
        foreach ($data as &$item) {
            if ($item['id'] == $id) {
                $item = array_merge($item, $newData);
            }
        }
        $this->write($data);
    }

    public function deleteById($id): void {
        $data = array_filter($this->read(), fn($i) => $i['id'] != $id);
        $this->write(array_values($data));
    }

    public function updateMany(callable $condition, callable $modifier): void {
        $data = $this->read();
        foreach ($data as &$item) {
            if ($condition($item)) {
                $item = $modifier($item);
            }
        }
        $this->write($data);
    }

    public function deleteMany(callable $condition): void {
        $data = array_filter($this->read(), fn($i) => !$condition($i));
        $this->write(array_values($data));
    }
}
