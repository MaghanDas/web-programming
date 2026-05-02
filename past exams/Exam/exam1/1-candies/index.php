<?php

$shop = [
  [ "brand" => "Homemade", "type"  => "Dark chocolate", "price" => 2000 ],
  [ "brand" => "Grandma's", "type"  => "Milk chocolate", "price" => 1500 ],
  [ "brand" => "Worldsweet", "type"  => "Milk chocolate", "price" => 3000 ],
  [ "brand" => "Worldsweet", "type"  => "Dark chocolate", "price" => 4000 ],
  [ "brand" => "Worldsweet", "type"  => "Orange essence", "price" => 4000 ],
  [ "brand" => "Homemade", "type"  => "Milk chocolate", "price" => 1000 ],
  [ "brand" => "Speziale", "type"  => "Apple & Cinnamon", "price" => 1000 ]
];

$prices = array_column($shop, "price");
$minPrice = min($prices);
$maxPrice = max($prices);

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="index.css">
  <title>Task 1</title>
</head>
<body>
  <h1>Task 1: Candies</h1>
  <!-- Your solution goes here! -->
  <table>
    <tr>
    <?php
      $types = [];
      $brands = [];

      foreach ($shop as $row) {
        $types[]  = $row["type"];
        $brands[] = $row["brand"];
      }

      // remove duplicates
      $types  = array_unique($types);
      $brands = array_unique($brands);

      // c) sort alphabetically
      sort($types);
      sort($brands);
      echo "<th></th>";
      foreach ($types as $type) {
        echo "<th>$type</th>";
      }
      echo "<th>Average</th>";
    ?>
  </tr>

  <!-- b) First column: BRANDS as table headers -->
  <?php foreach ($brands as $brand): ?>
    <tr>
      <th><?= $brand ?></th>
        <?php foreach ($types as $type): ?>
          <!-- <td> -->
            <?php 
            $price = "-";
            foreach($shop as $item) {
              if($item["brand"] === $brand && $item["type"] === $type){
                $price = $item["price"];
                break;
              }
            }
            
          // echo $price;
          $class = "";
          if ($price !== "-") {
            if ($price == $minPrice) $class = "lowest";
            if ($price == $maxPrice) $class = "largest";
          }
          // f. (1 pt) In the last column of the table, show the average price of the types of candies from the given brand!

            ?>
        <td class="<?= $class ?>"><?= $price ?></td>
          <?php endforeach; ?>
          
<?php
            $sum = 0;
           $count = 0;

  foreach ($shop as $item) {
    if ($item["brand"] === $brand) {
      $sum += $item["price"];
      $count++;
    }
  }

  $average = $count > 0 ? round($sum / $count) : "-";
?>
<td><?= $average ?></td>

    </tr>
  <?php endforeach; ?>
</table>
</body>
</html>