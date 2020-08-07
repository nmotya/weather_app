

const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const appid = "&appid=";
const key = "2611df27478efbc6c0031f6809a8b29d";
const cityName = document.querySelector("#input");
const body = document.querySelector("#container");
const submit = document.querySelector("#submit");

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

const processResponse = (response) => {
    let weather = `${JSON.stringify(response.weather[0].main)}`;
    let temp = `${JSON.stringify(response.main.temp)}`;
    let feels = `${JSON.stringify(response.main.feels_like)}`;
    let humidity = `${JSON.stringify(response.main.humidity)}`;
    let time = getTime(response.timezone);

    
    body.innerHTML = weather+ "   " + temp + "   " + time + "   " + feels + "  " + humidity;

    console.log(`${JSON.stringify(response)}`);
    console.log("chicken");
}

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


const showWeather = (event) => {
    event.preventDefault();
    getWeather();
}

submit.addEventListener("click", showWeather);