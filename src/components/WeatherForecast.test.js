// third party libraries
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import { createMockStore } from 'redux-test-utils';

// component
import WeatherForecast from './WeatherForecast';

// fixtures
import { weatherProps } from '../fixtures/weatherForecast';
import { mockStore } from '../fixtures/store';

// store
const store = createMockStore(mockStore);

describe('<WeatherForecast />', () => {

  const wrapper = mount(
    <Provider store={store}>
      <WeatherForecast {...weatherProps} />
    </Provider>
  );

  const wrapperTwo = shallow(
    <WeatherForecast {...weatherProps} />
  );

  it('should render the .container section', () => {
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('should render the current-weather section', () => {
    expect(wrapperTwo.find('.current-weather').length).toEqual(1);
  });

  it('should render 3 divs of the three-hour-forecast section', () => {
    expect(wrapperTwo.find('.three-hour-forecast').length).toEqual(3);
  });

  it('should render 3 divs of the five-day-forecast', () => {
    expect(wrapperTwo.find('.five-day-forecast').length).toEqual(3);
  });

  it('should not render the current weather component when no weather props given', () => {
    wrapperTwo.setProps({ currentWeather: '' });
    expect(wrapperTwo.find('.current-weather').length).toEqual(0);
  });

  it('should render the HI and LO temperature scale in degrees celisus', () => {
    expect(wrapper.find('.current-weather').find('.celsius-scale').length).toEqual(2);
  });

  it('should render the HI and LO temperature scale in degrees fahrenheit', () => {
    let convertedCurrentTemperature = {...weatherProps.currentWeather.data,
      main: {
        temp_max: 75.45,
        temp_min: 74.37
      }
    };

    wrapperTwo.setProps({
      currentWeather: {
        data: convertedCurrentTemperature
      },
      temperatureScale: "fahrenheit"
    });

    expect(wrapperTwo.find('.current-weather').find('.farenheit-scale').length).toEqual(2);
  });
});
