# ✅ Method A: Importing a JS object

data/data-js-object.js
const data = {
  users: [...],
  events: [...]
};
export default data;

In your question file
import data from '../data/data-js-object.js';
console.log(data.users);

# ✅ Method B: Importing separate variables

data/data-js-separate-variables.js
export const users = [...];
export const events = [...];


In your question file
import { users, events } from '../data/data-js-separate-variables.js';
users.forEach(user => console.log(user.name));


# 2. Working with JSON data (.json)
File involved

data/data-json.json

✅ Method A: Fetching JSON (browser-based JS)
fetch('../data/data-json.json')
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });


✅ Method B: Import JSON directly (modern JS)
import data from '../data/data-json.json' assert { type: 'json' };

console.log(data);


3. Working with PHP associative arrays
Files involved

data/data-php-assoc.php
data/data-php-separate-variables-assoc.php

✅ Method A: require associative array
data/data-php-assoc.php
<?php
return [
  "users" => [...],
  "tasks" => [...]
];


In your question file

<?php
$data = require '../data/data-php-assoc.php';
foreach ($data['users'] as $user) {
    echo $user['name'];
}


✅ Method B: Require separate variables
data/data-php-separate-variables-assoc.php

<?php
$users = [...];
$tasks = [...];


In your question file
<?php
require '../data/data-php-separate-variables-assoc.php';

echo count($users);

4. Working with PHP objects
Files involved
data/data-php-object.php
data/data-php-separate-variables-object.php

✅ Method A: Single object return
<?php
$data = require '../data/data-php-object.php';
echo $data->users[0]->name;


✅ Method B: Separate object variables
<?php
require '../data/data-php-separate-variables-object.php';

foreach ($projects as $project) {
    echo $project->title;
}

