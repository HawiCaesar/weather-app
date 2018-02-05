// React library
import React from "react";

// third party libraries
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

// component
import Weather from "../components/Weather";

// actions
import {
  getCoordinates
} from "../actions/weatherActions";

class WeatherContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.props.getCoordinates();
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
      getCoordinates: getCoordinates
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);
