import React from "react";

import { convertDateToText, convertUTCToLocal, getCurrentDateTime } from "../utils/datetimeConvertUtil";
import kelvinToCelsius  from "../utils/kelvinToCelsius";

class WeatherForecast extends React.Component {

render(){

    /**
     *
     * @param weather
     * @return {XML}
     */
  const showCurrentWeather = (weather) => {
    return (
      <div>
        <p className="text-center">{convertUTCToLocal(this.props.current_weather.data.dt)[0]} Today</p>
        <p className="text-center">Weather Now</p>
        <img src={ process.env.WEATHER_ICON_URL+weather.weather[0].icon+'.png'} />
        <p>HI { kelvinToCelsius(weather.main.temp_max) }</p>
        <p>LO { kelvinToCelsius(weather.main.temp_min) }</p>
      </div>
    );
  };

  /**
   *
   * @param forecasts
   */
  const showThreeHourForecast = (forecasts) => {

    return forecasts.map(forecast => {
      // dates are equal
      if(convertDateToText(forecast.dt_txt)[0] === getCurrentDateTime()[0]) {
          return (
            <div key={forecast.dt} className="col-sm-3 text-center">
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
     *
     * @param forecasts
     */
  const showFiveDayForecast = (forecasts) => {
    return forecasts.map(forecast => {
      if(convertDateToText(forecast.dt_txt)[0] !== getCurrentDateTime()[0]){
          if(convertDateToText(forecast.dt_txt)[1] === '12:00:00'){
            return(
              <div key={forecast.dt} className="col-sm-3 text-center">
                <p>{convertUTCToLocal(forecast.dt)[0]}</p>
                <img src={ process.env.WEATHER_ICON_URL+forecast.weather[0].icon+'.png'} />
                <p>HI { kelvinToCelsius(forecast.main.temp_max) }</p>
                <p>LO { kelvinToCelsius(forecast.main.temp_min) }</p>
              </div>
            );
          }
      }
    });
  };

    return(
      <div>
        <div className="jumbotron">
          <h2 className="text-center">3 hour Weather Forecast { this.props.city }</h2>
          <div className="text-center">
            {showCurrentWeather(this.props.current_weather.data)}
          </div>
        </div>
        <div className="container" style={{ width: '100%'}}>
          <div className="row">
                { showThreeHourForecast(this.props.forecast.list) }
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
