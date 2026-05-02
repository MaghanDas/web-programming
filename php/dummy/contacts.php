<?php
$errors = [];
$name = '';
$emails = [];
$phone = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Name (required)
    $name = trim($_POST['name'] ?? '');
    if ($name === '') {
        $errors['name'] = 'Name is required';
    }

    // Emails (multiple allowed)
    $emails = $_POST['emails'] ?? [];
    $validEmails = [];

    foreach ($emails as $email) {
        $email = trim($email);
        if ($email !== '') {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors['emails'] = 'One or more email addresses are invalid';
                break;
            }
            $validEmails[] = $email;
        }
    }

    if (empty($validEmails)) {
        $errors['emails'] = 'At least one email address is required';
    }

    // Phone number (regex validation)
    $phone = trim($_POST['phone'] ?? '');
    if ($phone !== '') {
        if (!preg_match('/^\+?[0-9\s\-()]{7,20}$/', $phone)) {
            $errors['phone'] = 'Invalid phone number format';
        }
    }

    // If no errors, show submitted data
    if (empty($errors)) {
        echo "<h2>Contact Saved Successfully</h2>";
        echo "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
        echo "<p><strong>Emails:</strong></p><ul>";
        foreach ($validEmails as $email) {
            echo "<li>" . htmlspecialchars($email) . "</li>";
        }
        echo "</ul>";
        echo "<p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>";
        exit;
    }
}
?>

<h2>Add New Contact</h2>

<form method="post">
    <!-- Name -->
    <label>
        Name:
        <input type="text" name="name" value="<?= htmlspecialchars($name) ?>">
    </label>
    <span style="color:red"><?= $errors['name'] ?? '' ?></span>
    <br><br>

    <!-- Multiple Emails -->
    <label>Email Addresses:</label><br>
    <?php
    $emailFields = max(1, count($emails));
    for ($i = 0; $i < $emailFields; $i++):
    ?>
        <input type="text" name="emails[]" value="<?= htmlspecialchars($emails[$i] ?? '') ?>"><br>
    <?php endfor; ?>

    <button type="button" onclick="addEmail()">Add another email</button>
    <br>
    <span style="color:red"><?= $errors['emails'] ?? '' ?></span>
    <br><br>

    <!-- Phone -->
    <label>
        Phone:
        <input type="text" name="phone" value="<?= htmlspecialchars($phone) ?>">
    </label>
    <span style="color:red"><?= $errors['phone'] ?? '' ?></span>
    <br><br>

    <button type="submit">Save Contact</button>
</form>

<script>
function addEmail() {
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'emails[]';
    document.forms[0].insertBefore(input, document.querySelector('button[type="button"]'));
    document.forms[0].insertBefore(document.createElement('br'), document.querySelector('button[type="button"]'));
}
</script>
