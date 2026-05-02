<?php 
require_once "storage.php";
// create jsonIO OBJect
$io = new JsonIO("family.json");
// create storage object
// JsonIO handles reading/writing the JSON file
// Storage is a helper class that gives us add/find/update/delete methods
$familyStorage = new Storage($io);
$storage = new Storage(new jsonIO("family.json"));
$members = $storage->findAll();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["name"])) {
        $name = trim($_POST["name"]);

        if ($name !== "") {
            $familyStorage->add([
                "name" => $name,
                "ideas" => []
            ]);
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Task 3</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <h1>Task 3: Gift list</h1>
  <h2>My family members</h2>
  <form action="" method="post">
    Name: <input type="text" name="name" required>
    <button type="submit">Add</button>
  </form>

<ul>
<?php foreach ($members as $id => $member): ?>
  <li>
    <a href="member.php?id=<?= urlencode($id) ?>">
      <?= htmlspecialchars($member['name'] ?? '') ?>
    </a>
    (0 / 0)
  </li>
<?php endforeach; ?>
</ul>


</body>
</html>