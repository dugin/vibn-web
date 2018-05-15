import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../App';
import '../setup/setupTests';

describe('App', () => {
  const app = shallow(<App />);

  it('renders properly', () => {
    expect(toJson(app)).toMatchSnapshot();
  });
});
