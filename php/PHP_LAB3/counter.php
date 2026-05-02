<?php 

session_start();
if(!isset($_SESSION['count'])){
    $_SESSION['count'] = 0;
}
$_SESSION['count']++;

// if (isset($_GET['reset'])) {
//     $_SESSION['count'] = 0;
// }
if (!isset($_SESSION['fridge'])) {
    $_SESSION['fridge'] = [];
}

$_SESSION['fridge'][] = 'milk';
$_SESSION['fridge'][] = 'eggs';

unset($_SESSION['fridge'][0]);

?>
<h2>Session Counter</h2>
<p>You visited this page <?= $_SESSION['count'] ?> times.</p>
<pre>
<?php print_r($_SESSION['fridge']); ?>
</pre>
<a href="counter.php?reset=1">Reset counter</a>


