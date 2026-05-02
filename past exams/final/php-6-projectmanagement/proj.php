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
    <link rel="stylesheet" href="proj.css" />
</head>

<body>
    <h1>
        <a href="index.php" class="home-btn" aria-label="Back to main page">🛖</a>
        Task 6. - Project page
    </h1>

    <div id="main">
        <h2><span>PROJ-10</span> Expressway renowation</h2>
        <div id="modify">
            <form>
                <input name="new-year">
                <select name="new-month">
                    <?php foreach ($months as $index => $month): ?> <option value="<?= $index ?>"><?= $index ?> - <?= $month ?></option><?php endforeach ?>
                </select>
                <input type="submit" value="Mentés">
            </form>
        </div>
        <div id="details">
            <span>Planned completion date: 2026-05</span>
            <span>Budget: 100 million HUF</span>
        </div>
    </div>
</body>

</html>