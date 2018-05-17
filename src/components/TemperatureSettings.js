// react library
import React from 'react';

class TemperatureSettings extends React.Component {
  render(){
    return (
      <div className="row">
        <h3>Change Temperature Scale</h3>
          <button
            onClick={this.props.callConvertToCelisus}
            className="btn btn-primary ctemp"
            disabled={this.props.celisus === true}
          >
            Celsius
          </button>

        <button
          onClick={this.props.callConvertToFahrenheit}
          className="btn btn-primary ftemp"
          disabled={this.props.fahrenheit === true}
        >
          Fahrenhiet
        </button>
      </div>
    );
  }
}
TemperatureSettings.propTypes = {
  fahrenheit: React.PropTypes.bool,
  celisus: React.PropTypes.bool,
  callConvertToCelisus: React.PropTypes.func.isRequired,
  callConvertToFahrenheit: React.PropTypes.func.isRequired
};
export default TemperatureSettings;
