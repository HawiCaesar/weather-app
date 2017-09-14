import axios from "axios";

export function get_weather_info() {

  let googlemapurl = "https://maps.googleapis.com/maps/api/geocode/json?";
  let weatherapi = "https://api.openweathermap.org/data/2.5/weather?";

  // const service = axios.create({
  //   baseURL: googlemapurl
  //
  // });

  return function (dispatch) {
    dispatch({type: "FETCHING LOCATION INFO"});

    if (navigator.geolocation) {
      // geolocation is available

      navigator.geolocation.getCurrentPosition(function (position) {

        // Get the coordinates of the current position.
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        dispatch({type: "LOCATION RESULTS"});
        dispatch({type: "FETCHING CITY INFO"});

        return axios.get(`${googlemapurl}latlng=${lat},${lng}&key=AIzaSyAO26kNQBP2exWaVG0DIHGDhWQ2SelGIY0`)
          .then(function (response) {

            dispatch({type: "FETCHED CITY INFO", payload: response.data});

            let split_values = response.data['results'][0]['formatted_address'];

            let values = split_values.split(",");

            return axios.get(`${weatherapi}q=${values[1]}&appid=1bc10c4306570d86e35d3e172ab6bedb`).then(
              function (response) {

                dispatch({type: "FETCHED WEATHER INFO", payload: response.data});

              }).catch((err) => {

              dispatch({type: "FAILED FETCHING WEATHER INFO", payload: err});
            });


            //dispatch(hideLoading())

          }).catch((err) => {

            dispatch({type: "FAILED FETCHING CITY INFO", payload: err});
          });

      });


    }
    else {
      // geolocation is not supported

      dispatch({type: "FAILED FETCHING LOCATION", payload: "Geo Location Failed"});
      alert("NOT Supported");
    }

  };
}
