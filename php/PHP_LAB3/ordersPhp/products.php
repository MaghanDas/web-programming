<?php
$data = json_decode(file_get_contents("products.json"), true);
$category = $_GET['category'];
$products = $data[$category];
?>
<!DOCTYPE html>
<html>
<body>
<h2><?= htmlspecialchars($category) ?></h2>


<form method="post" action="save_order.php">
<input type="hidden" name="category" value="<?= htmlspecialchars($category) ?>">


<?php foreach ($products as $product): ?>
<label>
<input type="checkbox" name="products[]" value="<?= $product['name'] ?>">
<?= $product['name'] ?> ($<?= $product['price'] ?>)
</label><br>
<?php endforeach; ?>
<br>
Name: <input type="text" name="name" required><br>
Address: <input type="text" name="address" required><br><br>

<button type="submit">Place Order</button>
</form>
</body>
</html>