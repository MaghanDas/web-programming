<?php
    $months = [
        1 => 'January',
        2 => 'February',
        3 => 'March',
        4 => 'April',
        5 => 'May',
        6 => 'June',
        7 => 'July',
        8 => 'August',
        9 => 'September',
        10 => 'October',
        11 => 'November',
        12 => 'December'
    ];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task 6.</title>
    <link rel="stylesheet" href="index.css" />
</head>

<body>
    <h1>Task 6. - Main page</h1>

    <div id="contorls">
        <form>
            <input name="id" placeholder="15">
            <input name="new-year" placeholder="2026">
            <select name="new-month">
                <?php foreach ($months as $index => $month): ?> <option value="<?= $index ?>"><?= $index ?> - <?= $month ?></option><?php endforeach ?>
            </select>
            <input type="submit" value="Save">
        </form>
    </div>

    <div id="kanban">
        <div id="twenties">
            <h2>Twenties (2020-2029)</h2>
            <div><a href="">PROJ-1</a>Expressway renowation</div>
            <div><a href="">PROJ-5</a>Expressway renowation</div>
            <div><a href="">PROJ-6</a>Expressway renowation</div>
        </div>
        <div id="thirties">
            <h2>Thirties (2030-2039)</h2>
            <div><a href="">PROJ-3</a>Expressway renowation</div>
            <div><a href="">PROJ-7</a>Expressway renowation</div>
        </div>
    </div>
</body>

</html>