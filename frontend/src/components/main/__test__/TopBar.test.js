import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import TopBar from '../TopBar'
import { Link } from 'react-router-dom'

describe('<TopBar />', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<TopBar />)
    })

    it('Should render one nav element', () => {
        expect(wrapper.find('nav').length).toEqual(1)
    })

    it('Should render one link tag to /', () => {
        expect(wrapper.containsMatchingElement(<Link to="/">Leituras</Link>)).toEqual(true)
    })

    it('Should render correctly', () => {
        const tree = renderer.create(
            <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
                <TopBar />
            </MemoryRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

})
