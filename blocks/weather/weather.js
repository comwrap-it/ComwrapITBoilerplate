import { weatherApi } from "../../scripts/api/weather.js";

/**
 * Formats a date
 * @param {string} date 'yyyy-mm-dd'
 * @returns {string} a formatted date 'dd-mm-yyyy'
 */
export function formatDate(date) {
    if (!date) return '';
    return date.split('-').reverse().join('/');
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
     *   lang: string;
     *   min?: string;
     *   max?: string;
     * }}
     */
    const config = [...block.children]
        .map((row) => ([...row.children].map(col => col.innerText?.trim())))
        .reduce((acc, [k,v]) => ({ ...acc, [k]: v }), {});
    const city = config.city;
    const lang = config.lang;
    const numDays = 3;

    const weatherData = await weatherApi.getForecast(city, numDays, lang);

    block.textContent = '';
    block.insertAdjacentHTML(
        'beforeend',
        `<div class="weather-container">
            <div class="weather-title">${config.title || ''}</div>
            <div class="weather-city">${city}</div>
            <div class="weather-forecast-container">
                ${Array.from(Array(numDays).keys()).map((index) => (`
                    <div class="weather-card">
                        <div class="weather-day">${formatDate(weatherData.forecast.forecastday[index].date)}</div>
                        <div class="weather-image">
                            <img src='${`https:${weatherData.forecast.forecastday[index].day.condition.icon}`}' alt="${weatherData.forecast.forecastday[index].day.condition.text}">
                        </div>
                        <div>
                            <div>${config.min || 'Min.'} ${weatherData.forecast.forecastday[index].day.mintemp_c}°C</div>
                            <div>${config.max || 'Max.'} ${weatherData.forecast.forecastday[index].day.maxtemp_c}°C</div>
                        </div>
                        <div>${weatherData.forecast.forecastday[index].day.condition.text}</div>
                    </div>`)).join('')}
            </div>
        </div>`
    );
}
