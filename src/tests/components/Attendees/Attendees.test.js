/*jslint es6 */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Attendees } from '../../../components/';
import CircularProgress from 'material-ui/CircularProgress';

configure({adapter: new Adapter()});

describe('<Attendees /> Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Attendees validation={{}}/>)
  })

  describe('UI & Render', () => {

    it('Should render two <CircularProgress /> one on each step when is loading', () => {
      wrapper.setProps({loading: true});
      expect(wrapper.find(CircularProgress)).toHaveLength(2);
    })

    it('Should NOT render any <CircularProgress /> when is not loading', () => {
      wrapper.setProps({loading: false});
      expect(wrapper.find(CircularProgress)).toHaveLength(0);
    })
    
  })
  

})