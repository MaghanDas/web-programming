<?php
session_start();

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

$products = ['apple', 'banana', 'milk'];
?>

<h2>Products</h2>

<ul>
<?php foreach ($products as $p): ?>
    <li>
        <?= $p ?>
        <a href="products.php?add=<?= $p ?>">Add</a>
    </li>
<?php endforeach; ?>
</ul>

<h3>Cart</h3>
<pre><?php print_r($_SESSION['cart']); ?></pre>

<?php
if (isset($_GET['add'])) {
    $_SESSION['cart'][] = $_GET['add'];
    header("Location: products.php");
    exit;
}
?>
