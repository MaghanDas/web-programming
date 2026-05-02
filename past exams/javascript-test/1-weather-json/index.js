const textarea = document.querySelector('#the-textarea');
const button = document.querySelector('#the-button');
const task1 = document.querySelector('#task1')
const task2 = document.querySelector('#task2')
const task3 = document.querySelector('#task3')
const task4 = document.querySelector('#task4')
const task5 = document.querySelector('#task5')

let data = null;

button.addEventListener("click", ()=>{
    const jsonString = textarea.value;
    try{
         data = JSON.parse(jsonString);
        console.log(data) ; 
        
//b. (2 point) Write the smallest value of daily maximums in the item with the
//  identifier task2. You have to work with the daily array, the daily maximum is 
// the max property of temp.
if (data && data.daily) {
  // Map daily max temps
  const dailyMaxes = data.daily.map(day => day.temp.max);
  // Find smallest value
  const smallestMax = Math.min(...dailyMaxes);
  // Show in the element
  task2.textContent = smallestMax;
//   console.log(smallestMax)
}

// c. (2 point) Write in the item with the id task3 whether the air pressure was above
//  1010 every day! The daily array must be used, the air pressure is included in the 
//  pressure property.
// "daily": [
//       {
//         "dt": 1603101600,
//         "sunrise": 1603084105,
//         "sunset": 1603122530,
//         "temp": {
//           "day": 10.39,
//           "min": 7.35,
//           "max": 12.3,
//           "night": 11.46,
//           "eve": 11.93,
//           "morn": 7.35
//         },
    //     "feels_like": {
    //       "day": 7.93,
    //       "night": 8.97,
    //       "eve": 9.69,
    //       "morn": 4.52
    //     },
    //     "pressure": 1026,
    //     "humidity": 72,
    //     "dew_point": 5.57,
    //     "wind_speed": 2.07,
    //     "wind_deg": 278,
    //     "weather": [
    //       {
    //         "id": 800,
    //         "main": "Clear",
    //         "description": "clear sky",
    //         "icon": "01d"
    //       }
    //     ],
    //     "clouds": 0,
    //     "pop": 0,
    //     "uvi": 2.21
    //   },
let allpressure = data.daily.map(day => day.pressure)
task3.textContent = allpressure.every(x => x > 1010)
// console.log(allpressure)
// task: 4
// const dailyMaxes = data.daily.map(day => day.temp.max);
let feelslikes = data.daily.map(d => d.feels_like.day) 
const sumFeelsLike = feelslikes.reduce((sum, temp) => sum + temp, 0)
const avgFeelsLike = sumFeelsLike / feelslikes.length;
task4.textContent = avgFeelsLike; // show 2 decimal places

// task: 5
task5.textContent = data.hourly.filter(w => w.wind_speed > 3).length

    } catch(error){
        console.error("Invalid Json!", error);
        data = null
    }
});


// d. (2 points) Write the average daily temperature in the item with the identifier task4! 
// You have to work with the daily array, the daily felt temperature is the day property 
// of the feels_like record.
// e. (1 point) Write the number of windy hours in the item with the identifier task5! You
//  need to work with the hourly array, and a windy hour is when the wind_speed is 
//  greater than 3.