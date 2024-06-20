import { WeatherApi } from "../../scripts/api/weather";

export default async function decorate(block) {
    // read block config

    // empty block
    block.textContent = '';

    // call api
    const weatherData = await WeatherApi.getForecast(/*... */);

    // decorate html
    block.append(`<div>
        WEATHER
    </div>`);
}
