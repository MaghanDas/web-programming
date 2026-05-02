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
