<?php
// file_get_contents("data-php-assoc.php");
$data = json_decode(file_get_contents("data-json.json"), true);
$project = $data["projects"];
$districtNames = $data["districtLocalization"];

// Sort projects by budget (cheapest first)
usort($project, function ($a, $b) {
    return $a["budget"] <=> $b["budget"];
});

// Count Buda projects
$budaDistricts = [1, 2, 3, 11, 12, 22];
$budaCount = 0;

foreach ($project as $p) {
    if (array_intersect($p["districts"], $budaDistricts)) {
        $budaCount++;
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task 4.</title>
    <link rel="stylesheet" href="index.css" />
</head>

<body>
    <h1>Task 4.</h1>

    <div id="information">
        <span id="buda-projects">
                    There are <?= $budaCount ?> projects on Buda
        </span>
    </div>

    <table id="projects">
        <thead>
            <tr>
                <th>Project name</th>
                <th>Budget</th>
                <th>Affected districts</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($project as $row): ?>
                <tr>
                    <td><?= $row['name'] ?></td>
=                    <td><?= $row['budget'] ?></td>
                    <td>
                        <ul>
                            <?php foreach ($row["districts"] as $d): ?>
                                <li class= <?= "dist-". $d ?> ><?= $d ?></li>  
                              <?php endforeach; ?>                          
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</body>
</html>

