import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import Weather from "../components/Weather";
import { get_weather_info } from "../actions/weatherActions";

class WeatherContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {

    this.props.get_weather_info();
  }

  render(){
    return (
          <Weather loading={this.state.loading}
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
      get_weather_info: get_weather_info
    }, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
