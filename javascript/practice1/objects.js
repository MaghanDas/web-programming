
// let user = {
//     name : "Kerna",
//     age: 23,
//     isStudent: true 
// }

// console.log(user.name)
// console.log(user["age"]) 


// let car = { brand: "Toyota", year: 2020 };
// console.log(car.brand) 

// car.year = 2022
// car.color = "Red"
// delete car.brand
// console.log(car)

// let student = {
//   name: "Bob",
//   grades: [85, 92, 78],
//   address: {
//     city: "Budapest",
//     zip: "12345"
//   }
// };

// console.log(student.grades[1]); // 92
// console.log(student.address.city); // Budapest


// let user = { name: "Alice", age: 22, city: "Budapest" };

// for (let key in user) {
//   console.log(key, ":", user[key]);
// }
// console.log(Object.keys(user));   // ["name", "age", "city"]
// console.log(Object.values(user)); // ["Alice", 22, "Budapest"]
// console.log(Object.entries(user));
// // [["name","Alice"], ["age",22], ["city","Budapest"]]

// let person = {
//   name: "Alice",
//   greet: function() {
//     console.log("Hello, I’m " + this.name);
//   }
// };

// person.greet(); // Hello, I’m Alice


/// Combining arrays and Objects

let products = [ 
    {id: 1, name: "Laptop", price: 700},
    {id: 2, name: "Phone" , price: 500},
    {id: 3, name: "Tablet", price: 300}
];

products.forEach(product => {
     console.log(`${product.name} costs $${product.price}`);
})

