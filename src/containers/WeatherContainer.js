import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import Weather from "../components/Weather";
import { getLocationInfo, getCurrentWeather, getFiveWeatherForecast } from "../actions/weatherActions";

class WeatherContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        this.props.getLocationInfo(lat, lng);
      });
    } else {
      alert("Geo location NOT Supported");
    }
  }

  render(){
    return (
          <Weather
            loading={this.state.loading}
            weather_details={this.props.weather_details}
            styles={this.props.styles}
          />
    );
  }

}

function mapStateToProps(state) {
  return {
    weather_details: state.weather
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getLocationInfo: getLocationInfo, getCurrentWeather: getCurrentWeather, getFiveWeatherForecast: getFiveWeatherForecast
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
