//masukan api key kamu terlebih dahulu 
const apiKey = ''
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&q=`;
const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weather = document.querySelector(".weather-icon");
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const weatherDisplay = document.querySelector('.weather')
const searchInputNone = document.querySelector('.card p')
const timeZone = document.querySelector('.time h2')
const h1Element = document.querySelector('.time > h1');
const timeZoneElement = document.querySelector('.time > h2');
const warning = document.querySelector('.warning h3')
const text = h1Element.textContent;


h1Element.textContent = ''; // Menghapus konten awal pada elemen h1

const letters = text.split('');


letters.forEach((letter, index) => {
  const spanElement = document.createElement('span');
  spanElement.textContent = letter;

  const hue = (index * 10) % 360; // Menghitung nilai hue berdasarkan indeks
  spanElement.style.color = `hsl(${hue}, 100%, 50%)`; // Menentukan warna berdasarkan hue

  h1Element.appendChild(spanElement);
});

h1Element.appendChild(timeZoneElement); // Menambahkan elemen timeZone setelah elemen span


//clock

function rotateClockHands() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourRotation = (hours % 12) * 30 + minutes * 0.5;
  const minuteRotation = minutes * 6 + seconds * 0.1;
  const secondRotation = seconds * 6;

  const hourHand = document.querySelector('.hour-hand');
  const minuteHand = document.querySelector('.minute-hand');
  const secondHand = document.querySelector('.second-hand');

  hourHand.style.transform = `rotate(${hourRotation}deg)`;
  minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
  secondHand.style.transform = `rotate(${secondRotation}deg)`;
}

// Panggil fungsi rotateClockHands setiap detik
setInterval(rotateClockHands, 1000);





const weatherIcons = {
  Clouds: "./weather-app-img/images/clouds.png",
  Clear: "./weather-app-img/images/clear.png",
  Rain: "./weather-app-img/images/rain.png",
  Snow: "./weather-app-img/images/snow.png",
  Mist: "./weather-app-img/images/mist.png",
  Haze: "./weather-app-img/images/haze.png",
  Drizzle: "./weather-app-img/images/drizzle.png"
};

const updateWeatherIcon = (weatherMain) => {
  const imageSrc = weatherIcons[weatherMain];
  weather.setAttribute('src', imageSrc);
};

const updateWeatherData = (responseJson) => {
  cityElement.innerHTML = responseJson.name;
  const temp = Math.floor(responseJson.main.feels_like);
  tempElement.textContent = `${temp}°C`;
  humidityElement.textContent = `${responseJson.main.humidity} %`;
  windElement.textContent = `${responseJson.wind.speed} km/h`;
  const weatherMain = responseJson.weather[0].main;
  warning.textContent = `suhu saat ini ${temp >= 30 ? 'lebih dari' : 'kurang dari'} 30°C apakah mau ${temp >= 30 ? 'menghidupkan' : 'mematikan'} ac ..?`;

  if (weatherIcons.hasOwnProperty(weatherMain)) {
    updateWeatherIcon(weatherMain);
  } else {
    console.log('Invalid weather condition');
  }

  searchBox.value = '';
};

const getWeatherData = async (cityName) => {
  try {
    const response = await fetch(`${apiUrl}${cityName}`);

    if (response.status === 404) {
      searchInputNone.textContent = 'City is not found';
      searchBox.value = '';
    }
    const responseJson = await response.json();
    console.log(responseJson);
    updateWeatherData(responseJson);
    weatherDisplay.style.display = 'block';
  } catch (error) {
    console.log('Error fetching weather data:', error);

    if (cityName.trim() === '') {
      searchInputNone.textContent = 'Please enter a city name';
    } else {
      searchInputNone.textContent = 'City is not found';
    }

    weatherDisplay.style.display = 'none';
    searchInputNone.style.display = 'block';
  }
};

const handleSearchButtonClick = () => {
  const cityName = searchBox.value;
  if (cityName.trim() === '') {
    searchInputNone.style.display = 'block';
  }
  searchInputNone.style.display = 'none';
  getWeatherData(cityName);
};

const handleKeyDown = (event) => {
  if (event.key === "Enter" || event.keyCode === 13) {
    handleSearchButtonClick();
  }
};

const handleClick = () => {
  handleSearchButtonClick();
};

searchBox.addEventListener("keydown", handleKeyDown);
searchButton.addEventListener("click", handleClick);

(changeBackgroundByTime = () => {
  const currentHour = new Date().getHours();

  // Morning (06:00 - 11:59)
  if (currentHour >= 6 && currentHour < 12) {
    document.body.style.backgroundImage = "url('./weather-app-img/images/morning.jpg')";
  }
  // Afternoon (12:00 - 17:59)
  else if (currentHour >= 12 && currentHour < 18) {
    document.body.style.backgroundImage = "url('./weather-app-img/images/afternoon.jpg')";
  }
  // Evening (18:00 - 20:59)
  else if (currentHour >= 18 && currentHour < 21) {
    document.body.style.backgroundImage = "url('./weather-app-img/images/evening.jpg')";
  }
  // Night (21:00 - 05:59)
  else {
    document.body.style.backgroundImage = "url('./weather-app-img/images/night.jpg')";
  }
})()



// Update the background every minute
setInterval(changeBackgroundByTime, 60000);

const updateTime = () => {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
  timeZone.textContent = currentTime;
};

// Panggil fungsi updateTime untuk pertama kali
updateTime();

// Update waktu setiap detik
setInterval(updateTime, 1000);



