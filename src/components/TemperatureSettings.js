// react library
import React from 'react';

class TemperatureSettings extends React.Component {
  render(){
    return (
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tempSetting"
            defaultChecked={this.props.celisus === true}
            onClick={this.props.callConvertToCelisus}
          />
          <div className="form-check-label">
            Change to Degrees Celicus
          </div>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tempSetting"
            defaultChecked={this.props.fahrenheit === true}
            onClick={this.props.callConvertToFahrenheit}
          />
          <div className="form-check-label">
            Change to Degress Farhenheit
          </div>
        </div>
        {/*<div className="form-check form-check-inline disabled">*/}
          {/*<input*/}
            {/*className="form-check-input"*/}
            {/*type="radio"*/}
            {/*name="exampleRadios"*/}
            {/*id="exampleRadios3"*/}
            {/*value="option3"*/}
            {/*disabled*/}
          {/*/>*/}
            {/*<div*/}
              {/*className="form-check-label"*/}
              {/*for="exampleRadios3"*/}
            {/*>*/}
              {/*Disabled radio*/}
            {/*</div>*/}
        {/*</div>*/}
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
