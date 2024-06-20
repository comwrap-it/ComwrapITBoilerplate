/**
 * @typedef {Object} ForecastResponse
 * @property {{
 *   forecastday: ForecastItem[],
 * }} forecast
 */

/**
 * @typedef {Object} ForecastItem
 * @property {string} date The date in 'yyyy-MM-dd' or 'yyyy-MM-dd hh:mm' format
 */

class WeatherApi {

    #baseUrl = 'api.weatherapi.com/v1';
    #apiKey = 'e95746a9467f4783b92140429242006';
    #endpoints = {
        forecast: '/forecast.json',
    };

    #buildEndpoint(endpoint) {
        return `${this.#baseUrl}${endpoint}`;
    }

    /**
     * Get forecast API
     * @param {string} cityName The city name in English
     * @param {number} numDays 
     * @param {string} lang 
     * @returns {ForecastResponse}
     */
    async getForecast(cityName, numDays, lang) {
        // compose URL
        const url = new URL(this.#buildEndpoint(this.#endpoints.forecast));
        // add query string params
        url.searchParams.append('test','test');
        // add api key in query string
        
        // fetch request
        const resp = await fetch(url);
        return resp.json();
    }
}

export const WeatherApi = new WeatherApi();
