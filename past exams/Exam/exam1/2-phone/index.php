<?php
// Initialize variables
$errors = [
    "fullname" => "",
    "email" => "",
    "colour" => "",
    "cardnumber" => ""
];

$fullname = $email = $colour = $cardnumber = "";

// Process form submission
if ($_SERVER["REQUEST_METHOD"] === "GET" && !empty($_GET)) {

    // Fullname validation (required, at least 2 words)
    $fullname = trim($_GET["fullname"] ?? "");
    if ($fullname === "") {
        $errors["fullname"] = "Full name is required";
    } else {
        $words = preg_split('/\s+/', $fullname);
        if (count($words) < 2) {
            $errors["fullname"] = "Full name must contain at least two words";
        }
    }

    // Email validation (required, valid format)
    $email = trim($_GET["email"] ?? "");
    if ($email === "") {
        $errors["email"] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors["email"] = "Invalid email address";
    }

    // Colour validation (required, must be in list)
    $colour = $_GET["colour"] ?? "";
    $allowed_colours = ["black", "white", "gold", "pink", "blue"];
    if ($colour === "") {
        $errors["colour"] = "Colour field is required";
    } elseif (!in_array($colour, $allowed_colours)) {
        $errors["colour"] = "Invalid colour selected";
    }

    // Card number validation (required, exact format)
    $cardnumber = trim($_GET["cardnumber"] ?? "");
    if ($cardnumber === "") {
        $errors["cardnumber"] = "Card number is required";
    } elseif (!preg_match('/^\d{4}-\d{4}-\d{4}-\d{4}$/', $cardnumber)) {
        $errors["cardnumber"] = "Card number must follow XXXX-XXXX-XXXX-XXXX format";
    }

    // Check if all errors are empty
    $form_valid = !array_filter($errors); // true if all errors are empty strings
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>Task 2</title>
</head>
<body>
    <h1>Task 2: You've just won a new phone!</h1>
    <form action="index.php" method="get" novalidate>
        <label for="i1">Your full name:</label> <input type="text" name="fullname" id="i1"> 
        <span class="error"><?= $errors["fullname"] ?></span><br>

        <label for="i2">Your e-mail address:</label> <input type="text" name="email" id="i2"> 
            <span class="error"><?= $errors["email"] ?></span><br>
        <label>Choose colour:</label>          
        <span class="error"><?= $errors["colour"] ?></span><br>
        <input type="radio" value="black" name="colour" id="i3a"> <label for="i3a">black</label><br>
        <input type="radio" value="white" name="colour" id="i3b"> <label for="i3b">white</label><br>
        <input type="radio" value="gold" name="colour" id="i3c"> <label for="i3c">gold</label><br>
        <input type="radio" value="pink" name="colour" id="i3d"> <label for="i3d">pink</label><br>
        <input type="radio" value="blue" name="colour" id="i3e"> <label for="i3e">blue</label><br>
        <label for="i4">Your credit card number:</label>
        <input type="text" name="cardnumber" id="i4"> 
        <span class="error"><?= $errors["cardnumber"] ?></span><br>
        <button type="submit">Click here to get your free phone today!</button>
    </form>

<?php if($form_valid): ?>
    <div id="success">
        <h2></h2>
		<div id="progress-bar">
			<div id="progress-bar-fill"></div>
		</div>
	</div>
<?php endif; ?>


    <h2>Hyperlinks for testing</h2>
    <a href="index.php?fullname=&email=&cardnumber=">fullname=&email=&cardnumber=</a><br>
    <a href="index.php?fullname=Grandma&email=&cardnumber=">fullname=Grandma&email=&cardnumber=</a><br>
    <a href="index.php?fullname=Lovely+Grandma&email=&cardnumber=">fullname=Lovely+Grandma&email=&cardnumber=</a><br>
    <a href="index.php?fullname=Lovely+Grandma&email=nagyi&cardnumber=">fullname=Lovely+Grandma&email=nagyi&cardnumber=</a><br>
    <a href="index.php?fullname=Lovely+Grandma&email=nagyi%40webprog.hu&cardnumber=">fullname=Lovely+Grandma&email=nagyi%40webprog.hu&cardnumber=</a><br>
    <a href="index.php?fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=red&cardnumber=">fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=red&cardnumber=</a><br>
    <a href="index.php?fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=pink&cardnumber=">fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=pink&cardnumber=</a><br>
    <a href="index.php?fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=pink&cardnumber=1234">fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=pink&cardnumber=1234</a><br>
    <a href="index.php?fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=pink&cardnumber=1234.5678.1234.5678">fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=pink&cardnumber=1234.5678.1234.5678</a><br>
    <a href="index.php?fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=pink&cardnumber=1234-5678-1234-5678"><span style="color: green">Correct input: </span>fullname=Lovely+Grandma&email=nagyi%40webprog.hu&colour=pink&cardnumber=1234-5678-1234-5678</a><br>

    <script src="index.js"></script>
    </body>
</html>
