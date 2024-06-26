import { weatherApi } from "../../scripts/api/weather.js";

/**
 * Formats a date
 * @param {string} date 'yyyy-mm-dd'
 * @returns {string} a formatted date 'dd-mm-yyyy'
 */
export function formatDate(date) {
    let dateArr = date.split('-');
    dateArr = dateArr.reverse();
    return dateArr.join('/');
}

/**
 * Add 'https:' to icon path
 * @param {string} iconPath 
 * @returns {string} icon path with https protocol
 */
export function addHttps(iconPath) {
    return "https:" + iconPath;
}

/**
 * 
 * @param {HTMLDivElement} block 
 */
export default async function decorate(block) {
    // read block config
    /**
     * @type {{
    *   title: string;
    *   city: string;
    *   numDays: string;
    *   lang: string;
    * }}
    */
   const config = [...block.children]
       .map((row) => ([...row.children].map(col => col.innerText?.trim())))
       .reduce((acc, [k,v]) => ({ ...acc, [k]: v }), {});

    const title = config.title;
    const city = config.city;
    let numDays = 4;
    try {
        numDays = parseInt(config.numDays);
    } catch(e) {
        console.log(e);
    }
    const lang = config.lang;

    // empty block
    block.textContent = '';

    // call api
    const weatherData = await weatherApi.getForecast(city, numDays, lang);

    // get current date and time
    const time = weatherData.current.last_updated.split(' ');
    const current_day = formatDate(time[0]);
    const current_hour = time[1];

    // decorate html
    block.insertAdjacentHTML(
        'beforeend',
        `<div class="container">
            <div class="title">
                ${title}
            </div>
            <div class="city">
                ${city}
            </div>
            <div class="today-container card">
                <div class="day-text">${current_day}</div>
                <div class="last-update">Ultimo aggiornamento: ${current_hour}</div>
                <div class="weather-flex">
                    <img src="${addHttps(weatherData.current.condition.icon)}" alt="Weather data">
                    <div>${weatherData.current.temp_c}°C</div>
                </div>
                <div>${weatherData.current.condition.text}</div>
            </div>

            <div class="forecast-container">
                <div class="forecast-item card">
                    <div class="day-text">${formatDate(weatherData.forecast.forecastday[1].date)}</div>
                    <div class="image-flex">
                        <img src='${addHttps(weatherData.forecast.forecastday[1].day.condition.icon)}' alt="Weather data">
                    </div>
                    <div class="weather-flex">
                        <div>Minima: ${weatherData.forecast.forecastday[1].day.mintemp_c}°C</div>
                        <div>Massima: ${weatherData.forecast.forecastday[1].day.maxtemp_c}°C</div>
                    </div>
                    <div>${weatherData.forecast.forecastday[1].day.condition.text}</div>
                </div>

                <div class="forecast-item card">
                    <div class="day-text">${formatDate(weatherData.forecast.forecastday[2].date)}</div>
                    <div class="image-flex">
                        <img src='${addHttps(weatherData.forecast.forecastday[2].day.condition.icon)}' alt="Weather data">
                    </div>
                    <div class="weather-flex">
                        <div>Minima: ${weatherData.forecast.forecastday[2].day.mintemp_c}°C</div>
                        <div>Massima: ${weatherData.forecast.forecastday[2].day.maxtemp_c}°C</div>
                    </div>
                    <div>${weatherData.forecast.forecastday[2].day.condition.text}</div>
                </div>

                <div class="forecast-item card">
                    <div class="day-text">${formatDate(weatherData.forecast.forecastday[3].date)}</div>
                    <div class="image-flex">
                        <img src='${addHttps(weatherData.forecast.forecastday[3].day.condition.icon)}' alt="Weather data">
                    </div>
                    <div class="weather-flex">
                        <div>Minima: ${weatherData.forecast.forecastday[3].day.mintemp_c}°C</div>
                        <div>Massima: ${weatherData.forecast.forecastday[3].day.maxtemp_c}°C</div>
                    </div>
                    <div>${weatherData.forecast.forecastday[3].day.condition.text}</div>
                </div>
            </div>
        </div>`
    );
}
