import React from "react";

import convertToDate from "../utils/datetimeConvertUtil";

class WeatherForecast extends React.Component {


  render(){

    return(
      <div>
        <div className="jumbotron">
          <h2 className="text-center">3 hour Weather Forecast {this.props.forecast.fetched_city}</h2>
        </div>
        <div className="container">
        <div className="row">
            <div className="col-sm-3">
              <p>Weather At {convertToDate(this.props.forecast.weather_data.list[0].dt_txt)}</p>
              <img src={process.env.WEATHER_ICON_URL+this.props.forecast.weather_data.list[0].weather[0].icon+'.png'} />
            </div>
            <div className="col-sm-3">
              <p>Weather At {convertToDate(this.props.forecast.weather_data.list[1].dt_txt)}</p>
              <img src={process.env.WEATHER_ICON_URL+this.props.forecast.weather_data.list[1].weather[0].icon+'.png'} />
            </div>
            <div className="col-sm-3">
              <p>Weather At {convertToDate(this.props.forecast.weather_data.list[2].dt_txt)}</p>
              <img src={process.env.WEATHER_ICON_URL+this.props.forecast.weather_data.list[2].weather[0].icon+'.png'} />
            </div>
        </div>
        </div>
      </div>
    );
  }

}
export default WeatherForecast;
