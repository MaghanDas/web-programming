
    const form = document.querySelector("form");
    const divContainer = document.querySelector(".container");

// a. (2 pts) Calculate last year's total energy consumption (M) and output it to the console.
//  For this, select all input fields, read the value of data-consumption attribute of each input 
// as a number and calculate the sum.
// Concept	Why it’s correct
// querySelectorAll	Selects all sliders at once
// input[type="range"]	Targets only relevant inputs
// dataset.consumption	Proper way to access data-*
// Number()	Prevents string concatenation
// forEach	Clean and readable iteration

// Select all range input fields
const inputs = document.querySelectorAll('input[type="range"]');
let totalConsumption = 0;
inputs.forEach(input => {
  totalConsumption += Number(input.dataset.consumption);
});
console.log("Last year's total energy consumption:", totalConsumption);

// TASk:2
inputs.forEach(input => {
  const value = Number(input.value);
  const max = Number(input.max);
  const consumption = Number(input.dataset.consumption);

  const ci = (value / max) * consumption;
  console.log(`Current consumption (${input.id}):`, ci);
});

// TASK:3


// c. (2 pts) Every input has a corresponding label element on chart under the form. 
// The label's for attribute matches the id attribute of the input it belongs to. Set the label 
// element's width style property to ci / M * 100 percent (%) for each input field (e.g. '65%').

// a) Total last year's consumption (M)
let M = 0;
inputs.forEach(input => {
  M += Number(input.dataset.consumption);
});

// c) Set label widths based on current consumption
inputs.forEach(input => {
  const value = Number(input.value);
  const max = Number(input.max);
  const consumption = Number(input.dataset.consumption);

  const ci = (value / max) * consumption;

  // Find corresponding label
  const label = document.querySelector(`label[for="${input.id}"]`);

  // Set width in percentage
  label.style.width = (ci / M * 100) + "%";
});

// Function that performs a, b, c
function refreshChart() {
  // a) Calculate total consumption (M)
  let M = 0;
  inputs.forEach(input => {
    M += Number(input.dataset.consumption);
  });

  // b + c) Calculate ci and update label widths
  inputs.forEach(input => {
    const value = Number(input.value);
    const max = Number(input.max);
    const consumption = Number(input.dataset.consumption);

    const ci = (value / max) * consumption;

    const label = document.querySelector(`label[for="${input.id}"]`);
    label.style.width = (ci / M * 100) + "%";
  });
}

// Initial chart rendering (page load)
refreshChart();

// d) Refresh chart on any input change (event delegation)
form.addEventListener("input", refreshChart);