import React from 'react'
import { shallow } from 'enzyme'
import PostCard from '../PostCard'
import { posts } from '../../../__test-helpers__/posts'

describe('<PostCard />', () => {
    const setup = {
        post: posts[0],
        onRemovePost: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.onRemovePost.mockClear()
        wrapper = shallow(<PostCard {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should render a VoteScore component', () => {
        expect(wrapper.find('Connect(VoteScore)')).toHaveLength(1)
    })

    it('Should render a Link component to the post page', () => {
        expect(wrapper.find('Link')).toHaveLength(1)
    })

    it('Should render a EditPostForm component', () => {
        expect(wrapper.find('withRouter(Connect(EditPostForm))')).toHaveLength(1)
    })

    it('Should render initial empty initial state', () => {
        expect(wrapper.state()).toEqual({ showEdit: '' })
    })

    it('Should change state.showEdit to card-reveal-active when method showEdit is called', () => {
        expect(wrapper.state()).toEqual({ showEdit: '' })
        wrapper.instance().showEdit()
        expect(wrapper.state()).toEqual({ showEdit: 'card-reveal-active' })
    })

    it('Should change state.showEdit to empty when method hideEdit is called', () => {
        expect(wrapper.state()).toEqual({ showEdit: '' })
        wrapper.instance().showEdit()
        expect(wrapper.state()).toEqual({ showEdit: 'card-reveal-active' })
        wrapper.instance().hideEdit()
        expect(wrapper.state()).toEqual({ showEdit: '' })
    })

    it('Should call onRemovePost when method removePost is called', () => {
        expect(setup.onRemovePost).toHaveBeenCalledTimes(0)
        wrapper.instance().removePost()
        expect(setup.onRemovePost).toHaveBeenCalledTimes(1)
    })

    it('Should call method showEdit when .card-button-edit is clicked', () => {
        const mockshowEdit = jest.fn()
        wrapper.instance().showEdit = mockshowEdit
        expect(mockshowEdit).toHaveBeenCalledTimes(0)
        wrapper.find('.card-button-edit').simulate('click')
        expect(mockshowEdit).toHaveBeenCalledTimes(1)
    })

    it('Should call method removePost when .card-button-delete is clicked', () => {
        const mockremovePost = jest.fn()
        wrapper.instance().removePost = mockremovePost
        expect(mockremovePost).toHaveBeenCalledTimes(0)
        wrapper.find('.card-button-delete').simulate('click')
        expect(mockremovePost).toHaveBeenCalledTimes(1)
    })

    it('Should call method hideEdit when .hide-edit is clicked', () => {
        const mockhideEdit = jest.fn()
        wrapper.instance().hideEdit = mockhideEdit
        expect(mockhideEdit).toHaveBeenCalledTimes(0)
        wrapper.find('.hide-edit').simulate('click')
        expect(mockhideEdit).toHaveBeenCalledTimes(1)
    })
})