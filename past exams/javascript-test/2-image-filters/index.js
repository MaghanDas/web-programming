// 1️⃣ Filters array
const filters = [
  { label: 'Blur', filter: 'blur(#px)', min: 0, max: 10, value: 3 },
  { label: 'Brightness', filter: 'brightness(#%)', min: 0, max: 500, value: 100 },
  { label: 'Contrast', filter: 'contrast(#%)', min: 0, max: 500, value: 200 },
  { label: 'Grayscale', filter: 'grayscale(#%)', min: 0, max: 100, value: 50 },
  { label: 'Hue rotate', filter: 'hue-rotate(#deg)', min: 0, max: 360, value: 90 },
  { label: 'Invert', filter: 'invert(#%)', min: 0, max: 100, value: 0 },
  { label: 'Opacity', filter: 'opacity(#%)', min: 0, max: 100, value: 100 },
  { label: 'Saturate', filter: 'saturate(#%)', min: 0, max: 500, value: 200 },
  { label: 'Sepia', filter: 'sepia(#%)', min: 0, max: 100, value: 50 },
];

// 2️⃣ Select DOM elements
const theFiltersDiv = document.querySelector('#the-filters');
const theImage = document.querySelector('#the-image');

// 3️⃣ Generate filters dynamically (Task e)
filters.forEach(f => {
  const label = document.createElement('label');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.value = f.filter;

  const text = document.createTextNode(f.label + ' ');

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = f.min;
  slider.max = f.max;
  slider.value = f.value;

  label.appendChild(checkbox);
  label.appendChild(text);
  label.appendChild(slider);

  theFiltersDiv.appendChild(label);
});

// 4️⃣ Event handler for all checkboxes and sliders (Tasks a + b + d)
theFiltersDiv.addEventListener('input', () => {
  // Get all checked checkboxes
  const checkedBoxes = theFiltersDiv.querySelectorAll('input[type=checkbox]:checked');

  // Build CSS filter strings
  const filterStrings = Array.from(checkedBoxes).map(box => {
    const filterTemplate = box.value;
    const slider = box.closest('label').querySelector('input[type=range]');
    const sliderValue = slider.value;
    return filterTemplate.replace('#', sliderValue);
  });

  // Apply combined filters to image
  theImage.style.filter = filterStrings.join(' ');
}); 
