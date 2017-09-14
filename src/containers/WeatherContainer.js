import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";

import Weather from "../components/Weather";
import { get_weather_info } from "../actions/weatherActions";

class WeatherContainer extends React.Component {

  componentWillMount() {

    this.props.get_weather_info();
  }

  render(){
    return (<Weather />);
  }

}

function mapStateToProps(state) {
  return {
    weather_details: state.weather_info

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      get_weather_info: get_weather_info
    }, dispatch);

}



export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
