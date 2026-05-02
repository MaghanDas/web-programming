const projectDates = projects.map(project => project.schedule);

const schedule = projects.find(p => p.id === 8)schedule;

const projectSchedules = projects.map(project => ({
  id: project.id,
  name: project.name,
  schedule: project.schedule
}));

Example: projects finishing after 2028
const lateProjects = projects
  .filter(p => p.schedule >= "2028-01")
  .map(p => p.schedule);

  
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

<?php
$errors = [];
$name  = $_GET["name"] ?? "";
$budget = $_GET["budget"] ?? "";
$enddate = $_GET["end-date"] ?? "";
$fundingType = $_GET["funding-type"] ?? "";
$districts = $_GET["districts"] ?? "";

// ---------- Required Fields ----------
if ($_GET) { // Only validate after submission
    if (empty($name)) {
        $errors['name'] = "This field is required!";
    } elseif (strlen($name) < 5) {
        $errors['name'] = "The project name must be at least 5 characters long!";
    }

    if (empty($budget)) {
        $errors['budget'] = "This field is required!";
    } elseif (!ctype_digit($budget) || (int)$budget <= 0) {
        $errors['budget'] = "The budget must be a positive integer!";
    }

    if (empty($enddate)) {
        $errors['end-date'] = "This field is required!";
    } elseif (!preg_match('/^\d{4}-\d{2}$/', $enddate)) {
        $errors['end-date'] = "The planned completion format must be YYYY-MM!";
    } else {
        [$year, $month] = explode("-", $enddate);
        $year = (int)$year;
        $month = (int)$month;

        if ($year < 2025 || $year > 2050) {
            $errors['end-date'] = "The planned completion year must be between 2025 and 2050!";
        }

        if ($month < 1 || $month > 12) {
            $errors['end-date'] = "The planned completion month must be between 01 and 12!";
        }
    }

    $allowedMethods = ['community', 'municipality', 'national', 'eu', 'industry', 'private'];
    if (empty($fundingType)) {
        $errors['funding-type'] = "This field is required!";
    } elseif (!in_array($fundingType, $allowedMethods)) {
        $errors['funding-type'] = "The financing method must be selected from the list!";
    }

    if (empty($districts)) {
        $errors['districts'] = "This field is required!";
    } else {
        $districtArray = explode(",", $districts);
        foreach ($districtArray as $d) {
            $d = trim($d);
            if (!ctype_digit($d) || (int)$d < 1 || (int)$d > 23) {
                $errors['districts'] = "The districts must be a comma-separated list of numbers, each between 1-23!";
                break;
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task 5</title>
    <style>
        .error { color: red; font-size: 0.9em; margin-bottom: 5px; display: block; }
        #success { color: green; font-weight: bold; margin-top: 10px; }
        label { display: block; margin-top: 10px; }
        input, select { margin-bottom: 5px; width: 250px; }
    </style>
</head>
<body>
<h1>Task 5</h1>

<form method="get">
    <label for="name">Project name</label>
    <input name="name" value="<?= htmlspecialchars($name) ?>" placeholder="Expressway renovations">
    <?php if(!empty($errors['name'])): ?><span class="error"><?= $errors['name'] ?></span><?php endif; ?>

    <label for="budget">Budget (million HUF)</label>
    <input name="budget" value="<?= htmlspecialchars($budget) ?>" placeholder="100">
    <?php if(!empty($errors['budget'])): ?><span class="error"><?= $errors['budget'] ?></span><?php endif; ?>

    <label for="end-date">Completion date (YYYY-MM)</label>
    <input name="end-date" value="<?= htmlspecialchars($enddate) ?>" placeholder="2026-05">
    <?php if(!empty($errors['end-date'])): ?><span class="error"><?= $errors['end-date'] ?></span><?php endif; ?>

    <label for="funding-type">Funding type</label>
    <select name="funding-type">
        <option value="">--Select--</option>
        <?php
        foreach ($allowedMethods as $method) {
            $selected = $fundingType === $method ? "selected" : "";
            $label = ucfirst($method);
            echo "<option value=\"$method\" $selected>$label</option>";
        }
        ?>
    </select>
    <?php if(!empty($errors['funding-type'])): ?><span class="error"><?= $errors['funding-type'] ?></span><?php endif; ?>

    <label for="districts">Affected districts (comma-separated)</label>
    <input name="districts" value="<?= htmlspecialchars($districts) ?>" placeholder="1,3,11">
    <?php if(!empty($errors['districts'])): ?><span class="error"><?= $errors['districts'] ?></span><?php endif; ?>

    <input type="submit" value="Save">
</form>

<?php if($_GET && count($errors) === 0): ?>
    <div id="success">New project successfully saved!</div>
<?php endif; ?>

</body>
</html>


$budget = "100";
var_dump(ctype_digit($budget)); // true
$budget = "12.5";
var_dump(ctype_digit($budget)); // false
$budget = "-12";
var_dump(ctype_digit($budget)); // fals
$budget = "";
var_dump(ctype_digit($budget)); // false

Related functions:
is_numeric() → checks if a string is a number (integer or float, allows - and .)
filter_var($var, FILTER_VALIDATE_INT) → validates integer specifically
is_int($var) → checks variable type, not string
⚠️ Important: ctype_digit() only works on strings, not numbers directly.

2️⃣ explode
Purpose:
Splits a string into an array based on a delimiter.
Syntax:
array explode(string $delimiter, string $string[, int $limit])
$delimiter → character(s) to split on
$string → the string you want to split
$limit → optional, max number of pieces

Why used:
Districts input is comma-separated: "1,3,11" → [1,3,11]
Date could also be split into year/month

Example:
$districts = "1,3,11";
$districtArray = explode(",", $districts);
print_r($districtArray);
// Output: Array ( [0] => 1 [1] => 3 [2] => 11 )


Related functions:
implode() → joins array elements into a string
preg_split() → splits using a regular expression
str_split() → splits string into single characters

3️⃣ empty
Purpose:
Checks if a variable is empty or not set.
Syntax:
empty($var)

$budget = 0;
var_dump(empty($budget)); // true
$districts = [];
var_dump(empty($districts)); // true


Related functions:
isset($var) → true if variable exists and is not null
strlen($var) === 0 → specifically for strings

⚠️ empty() is useful for forms because it catches unset or blank inputs.
4️⃣ in_array
Purpose:
Checks if a value exists in an array.
Syntax:
bool in_array(mixed $needle, array $haystack[, bool $strict = false])

Why used
To validate funding tye: check if $fundingType is in allowed list
Can optionally check type ($strict = true)
Example:

$allowedMethods = ['community','municipality','national','eu','industry','private'];
$fundingType = 'eu';

if (in_array($fundingType, $allowedMethods)) {
    echo "Valid funding type";
} else {
    echo "Invalid funding type";
}


Related functions:
array_search() → finds key/index of a value
array_key_exists() → checks key, not value

5️⃣ trim

Purpose:
Removes whitespace or other characters from the start and end of a string.
Syntax:
string trim(string $string, string $characters = " \t\n\r\0\x0B")


Why used:
When splitting districts "1, 3,11" → " 3" has a space, need to clean it

Example:
$d = " 3 ";
echo trim($d); // "3"


Related functions:
ltrim() → left only
rtrim() → right only
6️⃣ preg_match

Purpose:
Matches a regular expression against a string.
Syntax:
preg_match(string $pattern, string $subject, array &$matches = null)
Why used:

To check date format YYYY-MM
Ensures string strictly follows the pattern
Example:

$enddate = "2026-05";
if (preg_match('/^\d{4}-\d{2}$/', $enddate)) {
    echo "Valid format";
} else {
    echo "Invalid format";
}


Related functions:
preg_replace() → replace using regex
preg_split() → split using regex

🔑 How these tie together in your project form
Task	PHP functions used
Budget validation	ctype_digit()
Districts validation	explode(), trim(), ctype_digit(), in_array()
Date format validation	preg_match()
Required fields	empty()
Funding type validation	in_array()

$date = "2026-05";
if (preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $date)) {
    echo "Valid date format YYYY-MM";
} else {
    echo "Invalid";
}
\d{4} → 4 digits for year
0[1-9]|1[0-2] → months 01–12
^ ... $ → match entire string

$email = "user@example.com";
if (preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email)) {
    echo "Valid email";
}

$phone = "0612345678";
if (preg_match('/^06\d{8,9}$/', $phone)) {
    echo "Valid Hungarian phone number";
}

$districts = "1,3,11";
if (preg_match('/^(\d{1,2})(,\d{1,2})*$/', $districts)) {
    echo "Valid district list";
}

$username = "User123";
if (preg_match('/^[a-zA-Z0-9]+$/', $username)) {
    echo "Alphanumeric only";
}
Only letters & numbers, no spaces or symbols

$url = "https://example.com";
if (preg_match('/^(https?:\/\/)?([a-z0-9.-]+)\.([a-z]{2,6})(\/.*)?$/i', $url)) {
    echo "Valid URL";
}


<?php
$shop = [
    ["brand" => "Milka", "type" => "Chocolate", "price" => 200],
    ["brand" => "Haribo", "type" => "Gummy", "price" => 150],
    ["brand" => "Lindt", "type" => "Chocolate", "price" => 300],
    ["brand" => "Haribo", "type" => "Chocolate", "price" => 180],
    ["brand" => "Mars", "type" => "Caramel", "price" => 250],
];

// Unique sorted types and brands
$types = array_unique(array_column($shop, 'type'));
sort($types);
$brands = array_unique(array_column($shop, 'brand'));
sort($brands);

// Price lookup
$prices = [];
foreach ($shop as $candy) {
    $prices[$candy['brand']][$candy['type']] = $candy['price'];
}

// Min/Max prices
$allPrices = array_column($shop, 'price');
$minPrice = min($allPrices);
$maxPrice = max($allPrices);
?>

<!DOCTYPE html>
<html>
<head>
<style>
.lowest { background-color: #a2f5a2; }
.highest { background-color: #f5a2a2; }
table { border-collapse: collapse; }
th, td { border: 1px solid black; padding: 5px; text-align: center; }
</style>
</head>
<body>

<h2>Candy Prices</h2>

<table>
<tr>
    <th>Brand / Type</th>
    <?php foreach($types as $type): ?>
        <th><?= $type ?></th>
    <?php endforeach; ?>
    <th>Average</th>
</tr>

<?php foreach($brands as $brand): ?>
<tr>
    <th><?= $brand ?></th>
    <?php
    $sum = 0; $count = 0;
    foreach($types as $type):
        $price = $prices[$brand][$type] ?? null;
        if ($price !== null) {
            $sum += $price; $count++;
            $class = "";
            if ($price == $minPrice) $class = "lowest";
            if ($price == $maxPrice) $class = "highest";
            echo "<td class='$class'>$price</td>";
        } else {
            echo "<td>-</td>";
        }
    endforeach;
    $avg = $count ? round($sum / $count, 2) : "-";
    ?>
    <td><?= $avg ?></td>
</tr>
<?php endforeach; ?>

</table>

</body>
</html>


  // c. Time required and format X:XX
    if (empty($time)) {
        $errors['time'] = "Time is required!";
    } elseif (!preg_match('/^([0-7]):([0-5][0-9])$/', $time)) {
        $errors['time'] = "Time must be in X:XX format, max 7 hours and less than 60 minutes!";
    }

    