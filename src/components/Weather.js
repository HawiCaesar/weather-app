// react library
import React from "react";

// third party library
import { CircleLoader } from 'react-spinners';

// component
import WeatherForecast from "./WeatherForecast";

class Weather extends React.Component {
  /**
   * Render WeatherForecast if checks pass. If not WeatherForecast, render loader
   *
   * @return {XML}
   */
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

  /**
   * Render weather info if location is found. If not location render loader
   * @return {XML}
   */
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
