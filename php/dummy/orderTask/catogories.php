
<?php 
$data = json_decode(file_get_contents("products.json"), true);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <h2>List of Cateogories to choose from</h2>
    <ul>
        <?php  foreach ($data as $category => $product): ?>
<li>
<a href="products.php?category=<?= urlencode($category) ?>">
<?= htmlspecialchars($category) ?>
</a>
</li>            <?php endforeach; ?>



</body>
</html>