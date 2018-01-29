// third party libraries
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import { createMockStore } from 'redux-test-utils';

// components
import WeatherForecast from './WeatherForecast';

// fixtures
import { weatherProps } from "../fixtures/weatherForecast";
import { mockStore } from '../fixtures/store';

// store
const store = createMockStore(mockStore);

describe('<WeatherForecast />', () => {

  const wrapper = mount(
    <Provider store={store}>
      <WeatherForecast {...weatherProps} />
    </Provider>
  );

  const wrapper_two = shallow(
    <WeatherForecast {...weatherProps} />
  );

  it('should render the .container section', () => {
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('should render the current-weather section', () => {
    expect(wrapper_two.find('.current-weather').length).toEqual(1);
  });

  it('should render 3 divs of the three-hour-forecast section', () => {
    expect(wrapper_two.find('.three-hour-forecast').length).toEqual(3);
  });

  it('should render 3 divs of the five-day-forecast', () => {
    expect(wrapper_two.find('.five-day-forecast').length).toEqual(3);
  });

  it('should not render the current weather component when no weather props given', () => {
    wrapper_two.setProps({ current_weather: '' });
    expect(wrapper_two.find('.current-weather').length).toEqual(0);
  });
});
