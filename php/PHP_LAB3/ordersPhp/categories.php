<?php 
    $data = json_decode(file_get_contents("products.json"), true);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h2>Product categories</h2>
<ul>
<?php foreach ($data as $category => $products): ?>
<li>
<a href="products.php?category=<?= urlencode($category) ?>">
<?= htmlspecialchars($category) ?>
</a>
</li>
<?php endforeach; ?>
</ul>
</body>
</html>