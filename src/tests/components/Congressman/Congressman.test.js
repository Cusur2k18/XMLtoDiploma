/*jslint es6 */
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Congressman } from '../../../components/';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


configure({adapter: new Adapter()});

describe('<Congressman /> Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Congressman userValidation={{}} events={[]} selectedEvent={{props: {}, validation: {}}}/>)
  })

  describe('UI & Render', () => {

    it('Should render three <CircularProgress /> one on each step when is loading', () => {

      wrapper.setProps({loading: true});
      expect(wrapper.find(CircularProgress)).toHaveLength(3);
    })

    it('Should NOT render any <CircularProgress /> is NOT loading', () => {

      wrapper.setProps({loading: false});
      expect(wrapper.find(CircularProgress)).toHaveLength(0);
    })

    it('Should render as many <MenuItem /> as events passed as a props', () => {
      const events = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

      wrapper.setProps({ events });
      expect(wrapper.find(MenuItem)).toHaveLength(4);
    })
  }) 

})