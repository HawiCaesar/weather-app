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
  it('should render 2 radio buttons', () => {
    expect(wrapper.find('.form-check').length).toEqual(2);
  });

});
