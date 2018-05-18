// third party libraries
import { shallow, mount } from 'enzyme';
import expect from 'expect';
import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';

// component
import TemperatureSettings from './TemperatureSettings';

// store
import { mockStore } from '../fixtures/store';
const store = createMockStore(mockStore);

describe('<TemperatureSettings />', () => {

  let props = {
    weatherDetails: {
      temperatureScale: "celsius"
    },
    celisus: true,
    fahrenheit: false,
    callConvertToFahrenheit: () => {},
    callConvertToCelisus: () => {}
  };

  const wrapper = shallow(
    <TemperatureSettings {...props}/>
  );

  const wrapperTwo = mount(
    <Provider store={store}>
      <TemperatureSettings {...props} />
    </Provider>
  );

  it('should render 2 buttons', () => {
    expect(wrapper.find('button').length).toEqual(2);
  });

  it('celsius button should be disabled when rendered at first', () => {
    expect(wrapper.find('.ctemp').is('[disabled]')).toBe(true);
    expect(wrapper.find('.ftemp').props().disabled).toBe(false);
  });

  it('fahrenheit button should be disabled celsius is not disabled', () => {
    wrapper.setProps({celisus: false, fahrenheit: true});
    expect(wrapper.find('.ctemp').props().disabled).toBe(false);
    expect(wrapper.find('.ftemp').props().disabled).toBe(true);
  });

  it('should simulate button click on the temperature settings component', () => {
    let celsiusButton = wrapperTwo.find('button').at(0);
    let fahrenheitButton = wrapperTwo.find('button').at(1);

    fahrenheitButton.simulate('click');
    expect(wrapperTwo.find('.ftemp').props().disabled);
    expect(wrapperTwo.find('.ctemp').props().disabled);

    celsiusButton.simulate('click');
    expect(wrapperTwo.find('.ctemp').props().disabled);
    expect(wrapperTwo.find('.ftemp').props().disabled);

  });
});
