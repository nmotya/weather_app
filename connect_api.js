
// Importing jQuery to be used
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// Getting Weather API link, assigning the query to user input, and saving the submit button as variable for later
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const appid = "&appid=";
const key = "2611df27478efbc6c0031f6809a8b29d";
const cityName = document.querySelector("#input");
const submit = document.querySelector("#submit");
document.getElementById("input").placeholder = "Enter a city from around the world";


//Converts the time of the city from milleseconds since 1970 to the current time in the city in military time
const getTime = (offset) =>{
    let date = new Date();
    let time = date.getTime();
    let offsetTime = date.getTimezoneOffset() * 60000;
    let utcTime =  offsetTime + time;
    let newTime = utcTime + (offset * 1000);
    let stringDate = `${new Date(newTime)}`;
    let a = stringDate.split(" ");
    let b = a[4].split(":");
    return b[0]+":"+b[1];
    
}
//Method that processes JSON data and displays it for the user using jQuery to modify the HTML
const processResponse = (response) => {
    let name = `${JSON.stringify(response.name)}`
    let weather = `${JSON.parse(JSON.stringify(response.weather[0].description))}`;
    let feels = `${JSON.stringify(response.main.feels_like)}`;
    let humidity = `${JSON.stringify(response.main.humidity)}`;
    let time = getTime(response.timezone); 
    let temp = `${convertTemp(JSON.parse(response.main.temp))}`;
    let min = `${convertTemp(JSON.parse(response.main.temp_min))}`;
    let max = `${convertTemp(JSON.parse(response.main.temp_max))}`;
    let icon = `${JSON.parse(JSON.stringify(response.weather[0].icon))}`;
    $(document).ready(() => {
        $("form").hide();
        $("#greeting").hide();
        $("#container").append(`<h3 id = city-name> ${JSON.parse(name)} <span id = time>${time}</span></h3>`);
        $("#container").append(`<div id = greeting-result></div>`);
        $("#greeting-result").append(`<h3 class = result-text>${weather}</h3>`);
        $("#greeting-result").append(`<div class = result-text id = result-image ><img src = ${imageLink(icon)} width = 15% ></div>`);
        $("#container").append(`<div id = results></div>`);
        $("#results").append(`<div class = result-text><h3><span class = desc>Temp: </span> ${temp + `ºF`}</h3></div>`);
        $("#results").append(`<div class = result-text><h3><span class = desc>Humidity: </span> ${humidity + "%"}</h3></div>`);
        $("#results").append(`<div class = result-text><h3><span class = desc>Daily min: </span> ${min+ `ºF`}</h3></div>`);
        $("#results").append(`<div class = result-text><h3><span class = desc>Daily max: </span> ${max+ `ºF`}</h3></div>`);
        $("#container").append("<a href= homepage.html><div id = restart><p id = imtired>Home</p></div></a>");
        $("input:submit").attr('placeholder','Some New Text');
    });
}

//Converts Temp from Kelvin to Farenheit
const convertTemp = (temp) => {
    let faren = (temp - 273.15) * 9/5 + 32;
    return Math.round(faren);
}

const imageLink = (icon) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`
}

// Method that makes the API call
const getWeather = async() =>{
    const input = cityName.value;
    const result = `${url}${input}${appid}${key}`;
    console.log(result);
    try{
        const response = await fetch(result);
        if (response.ok){
            const jsonResult = await response.json();
            processResponse(jsonResult);
        }
    }
    catch(error){
        console.log(error);
    }
}

//Method that is called when the submit button is pressed
const showWeather = (event) => {
    event.preventDefault();
    getWeather();
}

submit.addEventListener("click", showWeather);
