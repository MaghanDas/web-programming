<?php 
$order = [
$name= $_POST["name"],
$address = $_POST["address"],
$category = $_POST["category"],
$products => $_POST['products'] ?? []
];

$file = "orders.json";
$orders = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$orders[] = $order;
file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT));

header("Location: orders.php");
exit;

?>


<!-- $orders = file_exists($file) ? json_decode(file_get_contents($file), true) : []; -->
<!-- file_put_contents($file, json_encode($orders, JSON_PRETTY_PRINT)); -->
