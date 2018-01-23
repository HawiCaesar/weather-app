// react library
import React from "react";

// helpers
import {
  convertDateToText,
  milisecondsToDateTime,
  getCurrentDateTime
} from "../utils/datetimeConvertUtil";
import kelvinToCelsius  from "../utils/kelvinToCelsius";

class WeatherForecast extends React.Component {

render(){

    /**
     * Render current weather
     *
     * @param weather
     * @return {XML}
     */
  const showCurrentWeather = (weather) => {
    return (
      <div className="current-weather">
        <p className="text-center">{milisecondsToDateTime(this.props.current_weather.data.dt)[0]} Today</p>
        <p className="text-center">Weather Now</p>
        <img src={ process.env.WEATHER_ICON_URL+weather.weather[0].icon+'.png'} />
        <p>HI { kelvinToCelsius(weather.main.temp_max) }</p>
        <p>LO { kelvinToCelsius(weather.main.temp_min) }</p>
      </div>
    );
  };

  /**
   * Render 3 hour forecast via loop
   *
   * @param forecasts
   */
  const showThreeHourForecast = (forecasts) => {

    return forecasts.map(forecast => {
      // dates are equal
      if(convertDateToText(forecast.dt_txt)[0] === getCurrentDateTime()[0]) {
          return (
            <div key={forecast.dt} className="col-sm-3 text-center three-hour-forecast">
              <p>Weather At {convertDateToText(forecast.dt_txt)[1]}</p>
              <img src={process.env.WEATHER_ICON_URL + forecast.weather[0].icon + '.png'}/>
              <p>HI {kelvinToCelsius(forecast.main.temp_max)}</p>
              <p>LO {kelvinToCelsius(forecast.main.temp_min)}</p>
            </div>
          );
        }
    });
  };

    /**
     * Render 5 day forecast via loop
     *
     * @param forecasts
     */
  const showFiveDayForecast = (forecasts) => {
    return forecasts.map(forecast => {
      if(convertDateToText(forecast.dt_txt)[0] !== getCurrentDateTime()[0]){
          if(convertDateToText(forecast.dt_txt)[1] === '12:00:00'){
            return(
              <div key={forecast.dt} className="col-sm-3 text-center five-day-forecast">
                <p><b>{milisecondsToDateTime(forecast.dt)[0]}</b></p>
                <img src={ process.env.WEATHER_ICON_URL+forecast.weather[0].icon+'.png'} />
                <p>HI {kelvinToCelsius(forecast.main.temp_max)}</p>
                <p>LO {kelvinToCelsius(forecast.main.temp_min)}</p>
              </div>
            );
          }
      }
    });
  };

    return(
      <div>
        <div className="jumbotron">
          <h2 className="text-center">Weather Forecast {this.props.city}</h2>
          <div className="text-center">
            {showCurrentWeather(this.props.current_weather.data)}
          </div>
        </div>
        <div className="container" style={{ width: '100%'}}>
          <div className="jumbotron">
            <h2 className="text-center">3 Hour Weather Forecast { this.props.city }</h2>
          </div>
          <div className="row">
            {showThreeHourForecast(this.props.forecast.list)}
          </div>
          <div className="row">
            <div className="jumbotron">
              <h2 className="text-center">5 Day Weather Forecast { this.props.city }</h2>
            </div>
            {showFiveDayForecast(this.props.forecast.list)}
          </div>
        </div>
      </div>
    );
  }
}
export default WeatherForecast;
