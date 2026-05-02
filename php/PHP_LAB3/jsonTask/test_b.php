<?php
require 'JsonStorage.php';
$store = new JsonStorage('empty.json');


// Add items
$store->add(['id'=>1,'name'=>'Pen','price'=>5]);
$store->add(['id'=>2,'name'=>'Book','price'=>10]);
$store->add(['id'=>3,'name'=>'Notebook','price'=>8]);


// Modify one item
$store->updateById(2, ['price'=>12]);


// Delete by ID
$store->deleteById(1);


// Modify several items (price +2 if price < 10)
$store->updateMany(
fn($i) => $i['price'] < 10,
fn($i) => array_merge($i, ['price'=>$i['price']+2])
);


// Delete multiple items (price > 10)
$store->deleteMany(fn($i) => $i['price'] > 10);


print_r($store->all());


