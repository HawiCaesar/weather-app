import React from "react";
import {CircleLoader} from 'react-spinners';

import WeatherForecast from "./WeatherForecast";

class Weather extends React.Component {

  show_weather_info(){

    if (this.props.weather_details.fetched_city !=="" &&
        this.props.weather_details.current_weather !== null &&
        this.props.weather_details.forecast_data !== null) {
        return (
          <WeatherForecast city={this.props.weather_details.fetched_city}
                           current_weather={this.props.weather_details.current_weather}
                           forecast={this.props.weather_details.forecast_data.data} />
        );
    }

   return (
        <div>
         <div className={this.props.styles.loadbar}>
           <CircleLoader
             color={'#363CD7'}
             size={'120'}
             loading={this.props.loading}
           />
         </div>
          <p className="text-center">Got Your Location</p>
        </div>
   );

  }

  show_location(){

    if (this.props.weather_details.fetched_location === false) {

      return (
        <div className={this.props.styles.loadbar}>
          <CircleLoader
            color={'#363CD7'}
            size={'120'}
            loading={this.props.loading}
          />
        </div>
      );
    }

    return(
      <div className={this.props.styles.weatherinfo}>

        {this.show_weather_info()}

      </div>
    );

  }

  render() {

    return (
      <div>
          {this.show_location()}
      </div>
    );
  }

}

export default Weather;
