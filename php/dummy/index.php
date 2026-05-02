
<?php
    // echo "<h1>My first PHP script!</h1>";
    // $name = "maghan";
    // echo "Helloo " . $name . "!"; // . used for concetation.
    // echo "current time: " . date("Y-m-d H:i:s");

    function getFact($num){
        if($num==0){
            return 1;
        }
        return $num*getFact($num-1);
    }
    // $number = 4;
    // echo "Factorial of $number is " . getFact($number);
    // for($i=0; $i<=10; $i++){
    //     echo "<p style='font-size:" . ($i * 5) . "px;' >Hello World!</p>";
    // }

//     $errors = [
//     "Username is required",
//     "Password must be at least 8 characters",
//     "Email address is invalid"
// ];

// echo "<ol>";
// foreach ($errors as $error) {
//     echo "<li>". $error ."</li>";
// }
// echo "</ol>";

// create an associative array!
// $genres = [
//     5 => "Action",
//     4 => "Drama",
//     8 => "Comedy"
// ];
// echo "<select name='genre'>";
// foreach ($genres as $id => $label) {
//     echo "<option value='" . $id . "'>" . $id . " - " . $label . "</option>";
// }
// echo "</select>";

// function randomHexColor() {
//     $color = "#";
//     $values = [];

    // Generate R, G, B values
    // for ($i = 0; $i < 3; $i++) {
    //     $val = random_int(0, 255);
    //     $values[] = $val;
    //     $hex = str_pad(dechex($val), 2, "0", STR_PAD_LEFT);
    //     $color .= $hex;
    // }

    // Check condition
    // $useColor = true;
    // foreach ($values as $v) {
    //     if ($v <= 128) {
    //         $useColor = false;
    //         break;
    //     }
    // }

    // Apply background
    // $bg = $useColor ? $color : "#cccccc";

    // echo "<div style='background-color:$bg; padding:20px;'>";
    // echo "Generated color: $color <br>";
    // echo "Background used: $bg";
//     echo "</div>";
// }

// // Call function
// randomHexColor();
// echo "<h1>Your IP address is: " . $_SERVER['REMOTE_ADDR'] . "</h1>";

// a) From URL: index.php?name=Anna
// if (isset($_GET['name'])) {
//     echo "Hello " . htmlspecialchars($_GET['name']);
// }

// // b) From form
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $name = $_POST['name'];
//     echo "Hello " . htmlspecialchars($name);
// }

// echo $_SERVER['REMOTE_ADDR'];  // User's IP
// echo $_SERVER['HTTP_USER_AGENT']; // Browser info
// echo $_SERVER['REQUEST_METHOD'];  // GET or POST
// echo $_SERVER['REQUEST_URI'];  // URL path
// echo $_SERVER['SERVER_NAME'];  // Domain name
// echo $_SERVER['HTTP_HOST'];    // Host header

// $color = $_GET['color'] ?? "white"; // default

/// solving linear equation: 
$a = $_GET['a'] ?? "";
$b = $_GET['b'] ?? "";
$errors = [];
$solution = "";

// Process form only if submitted
if ($_SERVER['REQUEST_METHOD'] === 'GET' && (isset($_GET['a']) || isset($_GET['b']))) {

    // Validate a and b
    if ($a === "" || !is_numeric($a)) {
        $errors[] = "Coefficient a must be a numeric value.";
    }
    if ($b === "" || !is_numeric($b)) {
        $errors[] = "Coefficient b must be a numeric value.";
    }

    // Equation logic only if no errors
    if (empty($errors)) {
        $a = floatval($a);
        $b = floatval($b);

        if ($a == 0) {
            if ($b == 0) {
                $solution = "Every number is a solution (infinitely many solutions).";
            } else {
                $solution = "No solution (contradiction).";
            }
        } else {
            $x = -$b / $a;
            $solution = "Solution: x = $x";
        }
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
    
<h1>Solve the equation: ax + b = 0</h1>

<!-- Show errors if any -->
<?php if (!empty($errors)): ?>
    <ul style="color:red;">
        <?php foreach ($errors as $e): ?>
            <li><?= htmlspecialchars($e) ?></li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>

<!-- Form -->
<form method="get">
    a: <input type="text" name="a" value="<?= htmlspecialchars($a) ?>"> <br><br>
    b: <input type="text" name="b" value="<?= htmlspecialchars($b) ?>"> <br><br>
    <button type="submit">Solve</button>
</form>

<!-- Solution output -->
<?php if ($solution): ?>
    <h2><?= htmlspecialchars($solution) ?></h2>
<?php endif; ?>


<!-- <body style="background-color:" >
    <a href="?color=blue">Blue</a> |
    <a href="?color=yellow">Yellow</a> |
    <a href="?color=red">Red</a>

    <form method="get">
        <input type="text" name="color" placeholder="Enter color">
        <button type="submit">Change</button>
    </form>
</body> -->
<!-- 
<form method="post">
    <label for="Name">Name</label>
    <input type="text" name = "name"  placeholder="Enter your name">
    <button type="submit">Submit</button>
</form> -->

</body>
</html>