import React from "react";

import { convertDateToText, convertUTCToLocal, getCurrentDate } from "../utils/datetimeConvertUtil";
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
        <img src={ process.env.WEATHER_ICON_URL+weather.weather[0].icon+'.png'} />
        <p>HI { kelvinToCelsius(weather.main.temp_max) }</p>
        <p>LO { kelvinToCelsius(weather.main.temp_min) }</p>
      </div>
    );
  };

    /**
     *
     * @param forecast
     * @return {XML}
     */
  const showThreeHourForecast = (forecast) => {
    return (
      <div>
        <p>Weather At { convertDateToText(forecast.dt_txt)[1] }</p>
        <img src={ process.env.WEATHER_ICON_URL+forecast.weather[0].icon+'.png'} />
        <p>HI { kelvinToCelsius(forecast.main.temp_max) }</p>
        <p>LO { kelvinToCelsius(forecast.main.temp_min) }</p>
      </div>
    );
  };

    /**
     *
     * @param forecasts
     */
  const showFiveDayForecast = (forecasts) => {
    return forecasts.map(forecast => {
      if(convertDateToText(forecast.dt_txt)[0] !== getCurrentDate()){
          if(convertDateToText(forecast.dt_txt)[1] === '12:00:00'){
            return(
              <div key={forecast.dt} className="col-sm-3 text-center">
                <p>{convertUTCToLocal(forecast.dt)}</p>
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
          <p className="text-center">Weather Now</p>
          <div className="text-center">
            {showCurrentWeather(this.props.current_weather.data)}
          </div>
        </div>
        <div className="container" style={{ width: '100%'}}>
          <div className="row">
              <div className="col-sm-3 text-center">
                { showThreeHourForecast(this.props.forecast.list[1]) }
              </div>
              <div className="col-sm-3 text-center">
                { showThreeHourForecast(this.props.forecast.list[2]) }
              </div>
              <div className="col-sm-3 text-center">
                { showThreeHourForecast(this.props.forecast.list[3]) }
              </div>
              <div className="col-sm-3 text-center">
                { showThreeHourForecast(this.props.forecast.list[4]) }
              </div>
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
