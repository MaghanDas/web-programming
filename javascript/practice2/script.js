
const books = [
  {
    title: "A Thousand Splendid Suns",
    author: "Khaled Hosseini",
    yearOfPublish: 2007,
    publisher: "Riverhead Books",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    yearOfPublish: 1925,
    publisher: "Charles Scribner's Sons",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    yearOfPublish: 1960,
    publisher: "J.B. Lippincott & Co.",
  },
  {
    title: "1984",
    author: "George Orwell",
    yearOfPublish: 1949,
    publisher: "Secker & Warburg",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    yearOfPublish: 1951,
    publisher: "Little, Brown and Company",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    yearOfPublish: 1813,
    publisher: "T. Egerton, Whitehall",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    yearOfPublish: 1937,
    publisher: "George Allen & Unwin",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    yearOfPublish: 1851,
    publisher: "Harper & Brothers",
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    yearOfPublish: 1869,
    publisher: "The Russian Messenger",
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    yearOfPublish: 2005,
    publisher: "Picador",
  },
];

let publishYearNumberInputElement = document.querySelector("#publishYear");
let queryButtonElement = document.querySelector("#queryButton");
let yearQueryResultsUlElement = document.querySelector("#yearQueryResults");

queryButtonElement.addEventListener("click", () => {
  // On button click:
  // 0. Clear the list
  yearQueryResultsUlElement.innerHTML = "";
  // 1. Read the value from the input field
  let yearInputValue = publishYearNumberInputElement.value;
  // 2. Filter the array of books based on the value of the input field
  let filteredBooksByPublishYear = books.filter(
    (book) => book.yearOfPublish === parseInt(yearInputValue)
  );
  filteredBooksByPublishYear.forEach((element) => {
    // 3. Create an <li> element for each of those books
    let listElement = document.createElement("li");
    // 4. Write the name of the books inside each <li>
    listElement.innerText = element.title;
    // 5. Put the <li>s inside the `yearQueryResultsUlElement`
    yearQueryResultsUlElement.appendChild(listElement);
  });
});


// second task
const publisherselectElement = document.querySelector("#publishSelect")

publisherselectElement.addEventListener("change", (event)) 