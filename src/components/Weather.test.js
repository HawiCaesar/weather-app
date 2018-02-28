// third party libraries
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import { createMockStore } from 'redux-test-utils';

// component
import Weather from './Weather';

// fixtures
import { weatherDetails } from "../fixtures/weather";
import { mockStore } from '../fixtures/store';

// store
const store = createMockStore(mockStore);

describe('<WeatherContainer />', () => {

  let styles = {
    loadbar: "loadbar",
    navbarh: "navbarh",
    weatherinfo: "weatherinfo"
  };

  const wrapper = shallow(<Weather weatherDetails={weatherDetails} styles={styles} />);

  it('should render the div with weatherinfo class ', () => {
    expect(wrapper.find('.weatherinfo').length).toEqual(1);
  });

  it('should render no-city id when fetchedCity prop is an empty string', () => {
    wrapper.setProps({ weatherDetails: { fetchedCity: '' } });
    expect(wrapper.find('#no-city').length).toEqual(1);
  });

  it('should show "Got Your Location" when currentWeather and forecastData props are null', () => {
    wrapper.setProps({ weatherDetails: { fetchedCity: '' } });
    expect(wrapper.contains(<h2 className="text-center">Got Your Location</h2>)).toEqual(false);
  });

  it('should render loadbar class when currentWeather and forecastData props are null', () => {
    wrapper.setProps({ weatherDetails: { currentWeather: null }, forecastData: null });
    expect(wrapper.find('.loadbar').length).toEqual(1);
  });

  it('should show "Got Your Location" text even when currentWeather and forecastData props are null', () => {
    wrapper.setProps({ weatherDetails: { currentWeather: null }, forecastData: null });
    expect(wrapper.contains(<h2 className="text-center">Got Your Location</h2>)).toEqual(true);
  });
});
