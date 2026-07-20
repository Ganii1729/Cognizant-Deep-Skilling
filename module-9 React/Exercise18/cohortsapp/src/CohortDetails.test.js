import React from 'react';
import { mount, shallow } from 'enzyme';
import CohortDetails from './components/CohortDetails';
import { CohortData } from './Cohort';

describe('Cohort Details Component', () => {
  const mockCohort = CohortData[0];

  // Test 1: Load the component in isolation using shallow render
  test('should create the component', () => {
    const wrapper = shallow(<CohortDetails cohort={mockCohort} />);
    expect(wrapper.exists()).toBe(true);
  });

  // Test 2: Mount the component, pass props, and assert they are assigned correctly
  test('should initialize the props', () => {
    const wrapper = mount(<CohortDetails cohort={mockCohort} />);
    expect(wrapper.props().cohort).toEqual(mockCohort);
  });

  // Test 3: Locate the h3 tag and check it renders the exact cohort code
  test('should display cohort code in h3', () => {
    const wrapper = mount(<CohortDetails cohort={mockCohort} />);
    const h3Element = wrapper.find('h3');
    expect(h3Element.text()).toBe(mockCohort.code);
  });

  // Test 4: Verify the HTML matchers for the component snapshot
  test('should always render same html', () => {
    const wrapper = shallow(<CohortDetails cohort={mockCohort} />);
    expect(wrapper).toMatchSnapshot();
  });
});
