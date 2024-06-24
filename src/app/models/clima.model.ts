export class ClimaModel {

    latitude!: String
    longitude!: String
    generationtime_ms!: String
    utc_offset_seconds!: String
    timezone!: String
    timezone_abbreviation!: String
    elevation!: String
    current_weather_units!: {
        time: String
        interval: String
        temperature: String
        windspeed: String
        winddirection: String
        is_day: String
        weathercode: String
    }
    current_weather!: {
        time: String
        interval: String
        temperature: String
        windspeed: String
        winddirection: String
        is_day: String
        weathercode: String
    }

    contructor() {

    }
}