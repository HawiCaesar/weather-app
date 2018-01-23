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

  it('should render the current-weather section', () => {
    expect(wrapper.find('.current-weather').length).toEqual(1);
  });
});
