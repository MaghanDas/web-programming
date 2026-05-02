<?php
require 'JsonStorage.php';
$store = new JsonStorage('data.json');


// Display all data
print_r($store->all());


// Find by ID
print_r($store->findById(2));


// Find by other field
print_r($store->findByField('city', 'London'));


// Search string contains
print_r($store->searchContains('name', 'li'));