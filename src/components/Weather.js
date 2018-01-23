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
  showWeatherInfo(){
    if (this.props.weather_details.current_weather !== null && this.props.weather_details.forecast_data !== null) {
      return (
        <WeatherForecast
          city={this.props.weather_details.fetched_city}
          current_weather={this.props.weather_details.current_weather}
          forecast={this.props.weather_details.forecast_data.data}
        />
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
          <h2 className="text-center">Got Your Location</h2>
        </div>
    );
  }

  /**
   * Render weather info if location is found. If not location render loader
   * @return {XML}
   */
  showLocation(){
    if (this.props.weather_details.fetched_city !=="") {
      return(
        <div className={this.props.styles.weatherinfo}>
          {this.showWeatherInfo()}
        </div>
      );
    }

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

  render() {
    return (
      <div>
          {this.showLocation()}
      </div>
    );
  }
}
export default Weather;
