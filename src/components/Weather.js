import React from "react";
import {CircleLoader} from 'react-spinners';

class Weather extends React.Component {

  show_weather_info(){

    if (this.props.weather_details.fetched_city !=="" && this.props.weather_details.fetched_weather !== false){
        return (
          <div>
            <p>Today's Weather</p>
          </div>

        );
    }

   return (
     <div>
       <CircleLoader
         color={'#363CD7'}
         size={'120'}
         loading={this.props.loading}
       />
       <p>Got Your Location</p>
     </div>
   );

  }

  show_location(){

    if (this.props.weather_details.fetched_location === false) {

      return (
        <CircleLoader
          color={'#363CD7'}
          size={'120'}
          loading={this.props.loading}
        />
      );
    }

    return(
      <div>

        {this.show_weather_info()}

      </div>
    );

  }

  render() {

    return (
      <div>
        <div className={this.props.styles}>
          {this.show_location()}
        </div>
      </div>
    );
  }

}

export default Weather;
