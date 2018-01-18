// third party
import { mount, shallow } from 'enzyme';
import { expect } from 'expect';
import { Provider } from 'react-redux';
import { spy } from 'sinon';
import { createMockStore } from 'redux-test-utils';

// components
import WeatherForecast from './WeatherForecast';

// fixtures
import { mockStore } from '../fixtures/store';

// store
const store = createMockStore(mockStore);

describe('<WeatherForecast />', () => {

  let props = {

  };

  const wrapper = mount(
    <Provider store={store}>
      <WeatherForecast {...props} />
    </Provider>
  );

  const wrapper_two = shallow(
    <WeatherForecast {...props} />
  );

});
