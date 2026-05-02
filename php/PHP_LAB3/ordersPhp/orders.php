<?php
$orders = file_exists("orders.json")
? json_decode(file_get_contents("orders.json"), true)
: [];
?>
<!DOCTYPE html>
<html>
<body>
<h2>Orders</h2>


<table border="1" cellpadding="5">
<tr>
<th>Name</th>
<th>Address</th>
<th>Category</th>
<th>Products</th>
</tr>

<?php foreach ($orders as $order): ?>
    <tr>
<td><?= htmlspecialchars($order['name']) ?></td>
<td><?= htmlspecialchars($order['address']) ?></td>
<td><?= htmlspecialchars($order['category']) ?></td>
<td><?= implode(", ", $order['products']) ?></td>
</tr>
<?php endforeach; ?>
</table>
</body>
</html>