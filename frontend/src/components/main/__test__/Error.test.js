import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import Error from '../Error'
import { Link } from 'react-router-dom'

describe('<Error />', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<Error />)
    })

    it('Should render one .error-page element', () => {
        expect(wrapper.find('.error-page').length).toEqual(1)
    })

    it('Should render one link tag to /', () => {
        expect(wrapper.containsMatchingElement(<Link to="/">Go back to the home page</Link>)).toEqual(true)
    })

    it('Should have one error message title', () => {
        expect(wrapper.find('.error-title').length).toEqual(1)
    })

    it('Should have one error message text', () => {
        expect(wrapper.find('.error-text').length).toEqual(1)
    })

    it('Should render correctly', () => {
        const tree = renderer.create(
            <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
                <Error />
            </MemoryRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

})
