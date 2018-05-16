// react library
import React from 'react';

// model
import CommonModal from './CommonModal';

// component
import TemperatureSettings from './TemperatureSettings';

class Settings extends React.Component {
  render(){
    return (
      <div>
        <button onClick={this.props.toggleModal}>Settings</button>
        <CommonModal
          show={this.props.modalState}
          style={{width:'500px', height:'500px'}}
          onClose={this.props.toggleModal}>
          <TemperatureSettings
            celisus={this.props.celisus}
            fahrenheit={this.props.fahrenheit}
            callConvertToFahrenheit={this.props.callConvertToFahrenheit}
            callConvertToCelisus={this.props.callConvertToCelisus}
          />
        </CommonModal>
      </div>
    );
  }
}
export default Settings;
