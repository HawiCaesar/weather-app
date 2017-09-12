import axios from "axios"

export function get_weather_info(){

  let googlemapurl =

  return function(dispatch){
    dispatch({type: "FETCHING LOCATION INFO"});

    if (navigator.geolocation) {
      // geolocation is available

      navigator.geolocation.getCurrentPosition(function(position) {

        // Get the coordinates of the current position.
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;





      });


    }
    else {
      // geolocation is not supported
      dispatch({type: "FAILED FETCHING LOCATION"});
      console.log("NOT Supported");
    }

  }
}
