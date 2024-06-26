/**
 * @typedef {Object} ForecastResponse
 * @property {Current} current
 * @property {{
 *   forecastday: ForecastItem[],
 * }} forecast
 */

/**
 * @typedef {Object} Current
 * @property {Condition} condition
 * @property {string} last_updated
 * @property {number} temp_c
 */

/**
 * @typedef {Object} ForecastItem
 * @property {string} date The date in 'yyyy-MM-dd' or 'yyyy-MM-dd hh:mm' format
 * @property {Day} day
 * @property {HourItem[]} hour
 */

/**
 * @typedef {Object} Day
 * @property {Condition} condition
 * @property {number} mintemp_c
 * @property {number} maxtemp_c
 */

/**
 * @typedef {Object} Condition
 * @property {string} text
 * @property {string} icon
 */

/**
 * @typedef {HourItem}
 * @property {number} time_epoch
 * @property {string} time
 * @property {number} temp_c
 * @property {Condition} condition
 */

class WeatherApi {

    #baseUrl = 'api.weatherapi.com/v1';
    #apiKey = 'e95746a9467f4783b92140429242006';
    #endpoints = {
        forecast: '/forecast.json',
    };

    #buildEndpoint(endpoint) {
        return `https://${this.#baseUrl}${endpoint}`;
    }

    /**
     * Get forecast API
     * @param {string} cityName The city name in English
     * @param {number} numDays 
     * @param {string} lang 
     * @returns {Promise<ForecastResponse>}
     */
    async getForecast(cityName, numDays, lang) {
        // compose URL
        const url = new URL(this.#buildEndpoint(this.#endpoints.forecast));
        // add query string params
        url.searchParams.append('q', cityName);
        url.searchParams.append('days', numDays);
        url.searchParams.append('lang', lang);
        // add api key in query string
        url.searchParams.append('key',this.#apiKey);
        
        // fetch request
        const resp = await fetch(url);
        return resp.json();
    }
}

export const weatherApi = new WeatherApi();
