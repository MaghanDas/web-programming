<?php 
    // echo "hello world";
// if ($_POST) {
//     $errors = [];
//     if (empty($_POST['name'])) $errors[] = "Name required";
//     foreach ($_POST['email'] as $email) {
//         if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email: $email";
//     }
//     if (!preg_match("/^[0-9+\- ]+$/", $_POST['phone'])) $errors[] = "Invalid phone";

//     if ($errors) {
//         foreach ($errors as $e) echo "<p style='color:red'>$e</p>";
//     } else {
//         echo "Submitted:<br>Name: {$_POST['name']}<br>";
//         echo "Emails: " . implode(", ", $_POST['email']) . "<br>";
//         echo "Phone: {$_POST['phone']}";
//     }
// }

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <!-- <form method="post"> Name: <input type="text" name="name"><br>
     Email: <input type="text" name="email[]"><br>
      <button type="button" onclick="addEmail()">Add another email</button><br> 
      Phone: <input type="text" name="phone"><br> 
      <input type="submit" value="Save"> </form> -->

      <form method="get" action="welcome.php">
  <input type="text" name="name">
  <input type="submit">
</form>
    
</body>
</html>