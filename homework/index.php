<?php
$bestiary = [
    [
        "name" => "Griffin",
        "type" => "Hybrid",
        "danger" => 8,
        "region" => "White Orchard",
        "weaknesses" => ["Aard", "Hybrid Oil"],
    ],
    [
        "name" => "Leshen",
        "type" => "Relict",
        "danger" => 10,
        "region" => "Velen Forest",
        "weaknesses" => ["Dimeritium Bomb", "Relict Oil", "Fire"],
    ],
    [
        "name" => "Drowner",
        "type" => "Necrophage",
        "danger" => 4,
        "region" => "Swamps of Velen",
        "weaknesses" => ["Necrophage Oil", "Igni"],
    ],
    [
        "name" => "Wyvern",
        "type" => "Draconid",
        "danger" => 6,
        "region" => "Skellige Cliffs",
        "weaknesses" => ["Draconid Oil", "Aard"],
    ],
];


function renderDanger($danger) {
    $dangerDisplay = $danger >= 8 
       ? "<span style='color:red: font-weight:bold; '>$danger</span>"
        : $danger;
    $dangerBar = str_repeat("🔥", $danger);
    return "$dangerDisplay $dangerBar";
}

echo "<!DOCTYPE html><html><head><meta charset='UTF-8'>";
echo "<title>The Witcher’s Bestiary</title>";
echo "<style>
        body { font-family: Arial, sans-serif; background:#f4f4f4; padding:20px; }
        h1 { color:#333; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #999; padding: 8px; text-align: left; }
        thead { background-color: #444; color: white; }
      </style>";
echo "</head><body>";

echo "<h1>The Witcher’s Bestiary</h1>";
echo "<p>Generated on " . date("D, d M Y H:i:s") . "</p>";


echo "<table>";
echo "<thead>
        <tr>
            <th>Name</th><th>Type</th><th>Danger level</th><th>Region</th><th>Weaknesses</th>
        </tr>
        </thead><tbody>";


foreach ($bestiary as $monster) {
    echo "<tr> 
                <td>{$monster['name']}</td>
                <td>{$monster['type']}</td>
                <td>" . renderDanger($monster['danger']) . "</td>
                <td>{$monster['region']}</td>
                <td>" . implode(", ", $monster['weaknesses']) . "</td>
          </tr>";
}

echo "</tbody></table>";

$count = count($bestiary);
$avgDanger = round(array_sum(array_column($bestiary, "danger")) / $count, 1);
$mostDangerous = array_reduce($bestiary, function($carry, $monster) {
    return ($carry === null || $monster["danger"] > $carry["danger"]) ? $monster : $carry;
});


echo "<p>Monsters Listed: $count</p>";
echo "<p>Average danger level: $avgDanger</p>";
echo "<p>Most dangerous: {$mostDangerous['name']}</p>";


$quotes = [
"Evil is evil. Lesser, greater, middling... makes no difference. ",
"People like to invent monsters and monstrosities. ",
"Winds howling...",
"Toss a coin to your Witcher!"
];

echo "<p><em>\"" . $quotes[array_rand($quotes)] . "\"</em></p>";

// echo "</body></html>";
?>