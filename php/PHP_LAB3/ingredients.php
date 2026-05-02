<?php
session_start();

if (!isset($_SESSION['fridge'])) {
    $_SESSION['fridge'] = [];
}

$ingredients = ['milk', 'eggs', 'flour'];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $selected = $_POST['ingredients'] ?? [];

    $newItems = array_diff($selected, $_SESSION['fridge']);
    $_SESSION['fridge'] = array_merge($_SESSION['fridge'], $newItems);

    header("Location: ingredients.php");
    exit;
}

?>
<form method="post">
<?php foreach ($ingredients as $i): ?>
    <?php $inFridge = in_array($i, $_SESSION['fridge']); ?>
    <label>
        <input type="checkbox"
               name="ingredients[]"
               value="<?= $i ?>"
               <?= $inFridge ? 'checked disabled' : '' ?>>
        <?= $i ?>
    </label><br>
<?php endforeach; ?>
<button type="submit">Add to fridge</button>
</form>

<pre><?php print_r($_SESSION['fridge']); ?></pre>
