document.addEventListener('DOMContentLoaded', function () {

    function changeBackground() {
        const now = new Date();
        const hours = now.getHours();
        const body = document.body;

        console.log('Current hour:', hours);

        if (hours >= 19 || hours < 5) {
            body.style.backgroundImage = "url('images/night.png')";
            body.style.backgroundSize = "cover";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundPosition = "center";
        } else if (hours >= 5 && hours < 8 || hours >= 17 && hours < 19) {
            body.style.backgroundImage = "url('images/warm.png')";
        }
        else {
            body.style.backgroundImage = "url('images/day.png')";
            console.log(Array.from(document.getElementsByTagName("p")).map(p => p.classList.add("text")));
        }
    }

    changeBackground();
});
search("712c47667bc5d3bae40c6a01fe38e808" , "delhi");

async function search( api = "712c47667bc5d3bae40c6a01fe38e808",
     city = document.getElementById("city").value
) 
{   
    if (city === ""){
        alert("Please enter a city name");
        return;
    }
    else {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`);
            document.getElementById("city").value = "";
            const data = await res.json();
            console.log(data);
            document.querySelector(".loc").innerText = `${data.name}, ${data.sys.country}`;
            const now = new Date();
            day = now.getDay();
            const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            document.querySelector(".date").innerText = `${days[day]}, ${now.getDate()}th ${monthNames[now.getMonth()]}`;
            if(data.weather[0].main === "Clear"){
            document.querySelector(".icons").innerHTML = `<img class="weathericon" src="images/clear.png" alt="Clear"> <p class = "temp">${Math.round(data.main.temp - 273.15)}°C</p> <br> <p class = "date detail"> ${data.weather[0].description} </p> `;
        }
            else if(data.weather[0].main === "Clouds"){
                document.querySelector(".icons").innerHTML = `<img class="weathericon" src="images/cloud.png" alt="Clear"> <p class = "temp">${Math.round(data.main.temp - 273.15)}°C</p> <br> <p class = "date detail"> ${data.weather[0].description} </p> `;
            }        
            else if(data.weather[0].main === "Rain"){
                document.querySelector(".icons").innerHTML = `<img class="weathericon" src="images/rain.png" alt="Clear"> <p class = "temp">${Math.round(data.main.temp - 273.15)}°C</p> <br> <p class = "date detail"> ${data.weather[0].description} </p> `;
            }
            else if(data.weather[0].main === "Snow"){
                document.querySelector(".icons").innerHTML = `<img class="weathericon" src="images/snow.png" alt="Clear"> <p class = "temp">${Math.round(data.main.temp - 273.15)}°C</p> <br> <p class = "date detail"> ${data.weather[0].description} </p> `;
            }
            else{
                document.querySelector(".icons").innerHTML = `<img class="weathericon" src="images/mist.png" alt="Clear"> <p class = "temp">${Math.round(data.main.temp - 273.15)}°C</p> <br> <p class = "date detail"> ${data.weather[0].description} </p> `;
            }
            document.querySelector(".humidity").innerHTML = `<p class="loc fnt">${data.main.humidity}%</p>`
            document.querySelector(".wind").innerHTML = `<p class="loc fnt">${data.wind.speed} km/h</p>`
            document.querySelector(".visibility").innerHTML = `<p class="loc fnt">${data.visibility/1000} km</p>`
        } catch (error) {
            alert("Error fetching weather data:", error);
        }
    }
}
