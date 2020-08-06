

const url = "pro.openweathermap.org/data/2.5/forecast/hourly?q=";
const appid = "&appid=";
const key = "2611df27478efbc6c0031f6809a8b29d";
const cityName = document.querySelector("#input");
const body = document.querySelector("#container");
const submit = document.querySelector("#submit");

const processResponse = (response) => {
    if (!response){
        console.log("oops");
    }
    if (!response.length){
        console.log("haha");
    }
    body.innerHTML = `${JSON.stringify(response)}`;
    console.log(`{JSON.stringify(response)}`);
    console.log("chicken");
}


const getWeather = async() =>{
    const input = cityName.value;
    const result = "api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2611df27478efbc6c0031f6809a8b29d";
    console.log(result);
    try{
        const response = await fetch("api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2611df27478efbc6c0031f6809a8b29d");
        if (response.ok){
            const jsonResult = await response.json();
            processResponse(jsonResult);
        }
    }
    catch(error){
        console.log(error);
    }
}

const showWeather = (event) => {
    event.preventDefault();
    getSuggestions();
}

submit.addEventListener("click", showWeather);