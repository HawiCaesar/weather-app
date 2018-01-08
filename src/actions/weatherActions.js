import LocationService from "../services/locationService";
import WeatherService from "../services/weatherService";

export function get_weather_info() {

  return function (dispatch) {
    dispatch({ type: "FETCHING LOCATION INFO" });

    if (navigator.geolocation) {
      // geolocation is available
      navigator.geolocation.getCurrentPosition((position) => {
        // Get the coordinates of the current position.
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        dispatch({ type: "LOCATION RESULTS" });
        dispatch({ type: "FETCHING CITY INFO" });

        // Location Detail
        return LocationService.get(`latlng=${lat},${lng}&key=${process.env.GOOGLE_KEY}`, (status, response) =>
          dispatch({ type: "FETCHED CITY INFO", payload: response.results })).then((response) => {
            let split_values = response.payload[0]['formatted_address'];
            let city_name = split_values.split(", ");
            // Get Current Weather at the current time
            return WeatherService.getCurrent(`q=${city_name[1]}&appid=${process.env.WEATHER_API_KEY}`)
              .then((response) => {
                  dispatch({ type: "FETCHED CURRENT WEATHER INFO", payload: response });
                  // Get Weather Forecast
                  return WeatherService.getForecast(`q=${city_name[1]}&appid=${process.env.WEATHER_API_KEY}`)
                    .then((response) => {
                      dispatch({ type: "FETCHED WEATHER FORECAST INFO", payload: response });
                  }).catch((error) => {
                      dispatch({ type: "FAILED FETCHING WEATHER FORECAST INFO", payload: error });
                  });
            }).catch((error) => {
                dispatch({ type: "FAILED FETCHING WEATHER INFO", payload: error });
            });
        }).catch((error) => {
              dispatch({ type: "FAILED FETCHING CITY INFO", payload: error });
        });
      });
    }
    else {
      // geolocation is not supported
      dispatch({ type: "FAILED FETCHING LOCATION", payload: "Geo Location Failed" });
      alert("Geo location NOT Supported");
    }

  };
}
