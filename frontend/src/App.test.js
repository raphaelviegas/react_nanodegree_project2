import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'
import { initialState } from './__test-helpers__/posts'

describe('<App />', () => {
    const setup = {
        loadingPosts: initialState.loadingPosts,
        fetchPosts: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.fetchPosts.mockClear()
        wrapper = shallow(<App {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should call fetchPosts when component mounts', () => {
        expect(setup.fetchPosts).toHaveBeenCalledTimes(1)
    })
})