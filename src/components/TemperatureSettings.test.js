// third party libraries
import { shallow } from 'enzyme';
import expect from 'expect';
import React from 'react';

// component
import TemperatureSettings from './TemperatureSettings';

describe('<TemperatureSettings />', () => {

  let props = {
    celisus: true,
    fahrenheit: false,
    callConvertToFahrenheit: () => {},
    callConvertToCelisus: () => {}
  };

  const wrapper = shallow(
    <TemperatureSettings {...props} />
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
});
