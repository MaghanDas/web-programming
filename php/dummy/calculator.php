<?
$result = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $num1 = $_POST["num1"];
    $num2 = $_POST["num2"];
    $op = $_POST["op"];

    if ($op == "+") $result = $num1 + $num2;
    if ($op == "-") $result = $num1 - $num2;
    if ($op == "*") $result = $num1 * $num2;
    if ($op == "/") {
        if ($num2 == 0) $result = "Cannot divide by zero!";
        else $result = $num1 / $num2;
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>CALCULATOR</h1>
    <form  method="post">
        <input type="number" name = "num1"required>
        <select name="op" >
            <option>+</option>
            <option>-</option>
            <option>*</option>
            <option>/</option>
        </select>
        <input type="number" name = "num2" required> 
        <button type="submit">=</button>
    </form>

    <h2>Result: <?= $result?></h2>
</body>
</html>