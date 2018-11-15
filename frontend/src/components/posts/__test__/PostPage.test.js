import React from 'react'
import { shallow } from 'enzyme'
import { PostPage } from '../PostPage'
import { posts } from '../../../__test-helpers__/posts'

describe('<PostPage />', () => {
    const historyMock = { push: jest.fn() };
    const setup = {
        id: posts[0].id,
        postInfo: [posts[0]],
        fetchPosts: jest.fn(),
        fetchRemovePost: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.fetchPosts.mockClear()
        setup.fetchRemovePost.mockClear()
        historyMock.push.mockClear()
        wrapper = shallow(<PostPage {...setup} history={historyMock} />)
    })

    describe('postInfo is empty', () => {
        it('Should render an Redirect component when there are no post infos', () => {
            wrapper.setProps({ postInfo: [] })
            expect(wrapper.find('Redirect')).toHaveLength(1)
        })
    })

    describe('postInfo has a value', () => {
        it('Should render correctly', () => {
            expect(wrapper).toMatchSnapshot()
        })

        it('Should render one .post-page item', () => {
            expect(wrapper.find('.post-page')).toHaveLength(1)
        })

        it('Should render one VoteScore component', () => {
            expect(wrapper.find('Connect(VoteScore)')).toHaveLength(1)
        })

        it('Should render one Comments component', () => {
            expect(wrapper.find('withRouter(Connect(Comments))')).toHaveLength(1)
        })

        it('Should render one EditPostModal component', () => {
            expect(wrapper.find('EditPostModal')).toHaveLength(1)
        })

        it('Should have an empty initial state', () => {
            expect(wrapper.state()).toEqual({ modalOpen: '' })
        })

        it('Should update state when method openModal is called', () => {
            expect(wrapper.state()).toEqual({ modalOpen: '' })
            wrapper.instance().openModal()
            expect(wrapper.state()).toEqual({ modalOpen: 'modal-open' })
        })

        it('Should clear state when method closeModal is called', () => {
            expect(wrapper.state()).toEqual({ modalOpen: '' })
            wrapper.instance().openModal()
            expect(wrapper.state()).toEqual({ modalOpen: 'modal-open' })
            wrapper.instance().closeModal()
            expect(wrapper.state()).toEqual({ modalOpen: '' })
        })

        it('Should call fetchPosts when component mounts', () => {
            expect(setup.fetchPosts).toHaveBeenCalledTimes(1)
        })

        it('Should call fetchPosts when component updates', () => {
            expect(setup.fetchPosts).toHaveBeenCalledTimes(1)
            wrapper.setProps({ id: 'newId' })
            expect(setup.fetchPosts).toHaveBeenCalledTimes(2)
        })

        it('Should not call fetchPosts when component updates if the id is the same', () => {
            expect(setup.fetchPosts).toHaveBeenCalledTimes(1)
            wrapper.setProps({ id: posts[0].id })
            expect(setup.fetchPosts).toHaveBeenCalledTimes(1)
        })

        it('Should call fetchRemovePosts and history.push when the method removePost is called', () => {
            expect(setup.fetchRemovePost).toHaveBeenCalledTimes(0)
            expect(historyMock.push).toHaveBeenCalledTimes(0)
            wrapper.instance().removePost()
            expect(setup.fetchRemovePost).toHaveBeenCalledTimes(1)
            expect(historyMock.push).toHaveBeenCalledTimes(1)
        })

        it('Should call openModal method when .post-button-edit is clicked', () => {
            const mockopenModal = jest.fn()
            wrapper.instance().openModal = mockopenModal
            expect(mockopenModal).toHaveBeenCalledTimes(0)
            wrapper.find('.post-button-edit').simulate('click')
            expect(mockopenModal).toHaveBeenCalledTimes(1)
        })

        it('Should call removePost method when .post-button-remove is clicked', () => {
            const mockremovePost = jest.fn()
            wrapper.instance().removePost = mockremovePost
            expect(mockremovePost).toHaveBeenCalledTimes(0)
            wrapper.find('.post-button-remove').simulate('click')
            expect(mockremovePost).toHaveBeenCalledTimes(1)
        })
    })
})