import React from 'react'
import { shallow } from 'enzyme'
import { PostList } from '../PostList'
import { posts, initialState } from '../../../__test-helpers__/posts'

describe('<PostList />', () => {
    const setup = {
        ...initialState,
        fetchRemovePost: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.fetchRemovePost.mockClear()
        wrapper = shallow(<PostList {...setup} />)
    })

    it('Should render a message when there are no posts', () => {
        expect(wrapper.find('.noPosts')).toHaveLength(1)
        expect(wrapper).toMatchSnapshot()
    })

    it('Should render two PostCard elements', () => {
        wrapper.setProps({ posts })
        expect(wrapper.find('PostCard')).toHaveLength(2)
        expect(wrapper).toMatchSnapshot()
    })

    it('Should call fetchRemovePosts when method removePost is called', () => {
        expect(setup.fetchRemovePost).toHaveBeenCalledTimes(0)
        wrapper.instance().removePost()
        expect(setup.fetchRemovePost).toHaveBeenCalledTimes(1)
    })
})