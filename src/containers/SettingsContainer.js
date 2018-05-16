// React library
import React from "react";

// third-party libraries
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

// component
import Settings from "../components/Settings";

// actions
import { convertToFahrenheit, convertToCelisus } from '../actions/settingsActions';

class SettingsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      celisus: true,
      fahrenheit: false
    };
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  // componentWillMount() {
  //   this.props.getCoordinates();
  // }

  render(){

    const callConvertToFahrenheit = () => {
      if (this.props.weatherDetails.temperatureScale !== "fahrenheit") {
        this.setState({
          celisus: false,
          fahrenheit: true
        });
        this.props.convertToFahrenheit(
          this.props.weatherDetails.currentWeather,
          this.props.weatherDetails.forecastData.data
        );
      }
    };

    const callConvertToCelisus = () => {
      if (this.props.weatherDetails.temperatureScale !== "celsius") {
        this.setState({
          celisus: true,
          fahrenheit: false
        });
        this.props.convertToCelisus(
          this.props.weatherDetails.currentWeather,
          this.props.weatherDetails.forecastData.data
        );
      }
    };
    return (
      <Settings
        modalState={this.state.isOpen}
        celisus={this.state.celisus}
        fahrenheit={this.state.fahrenheit}
        toggleModal={this.toggleModal.bind(this)}
        callConvertToFahrenheit={callConvertToFahrenheit}
        callConvertToCelisus={callConvertToCelisus}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    weatherDetails: state.weather
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      convertToFahrenheit: convertToFahrenheit, convertToCelisus: convertToCelisus
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
