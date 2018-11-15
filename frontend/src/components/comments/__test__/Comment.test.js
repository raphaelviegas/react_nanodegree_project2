import React from 'react'
import { shallow } from 'enzyme'
import Comment from '../Comment'
import { comments } from '../../../__test-helpers__/comments'

describe('<Comment />', () => {
    const setup = {
        commentInfo: comments[0],
        onEditComment: jest.fn(),
        onRemoveComment: jest.fn(),
    }
    let wrapper
    beforeEach(() => {
        setup.onRemoveComment.mockClear()
        setup.onEditComment.mockClear()
        wrapper = shallow(<Comment {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should render a title item', () => {
        expect(wrapper.find('.comment-title').length).toBe(1)
    })

    it('Should render a date item', () => {
        expect(wrapper.find('.comment-date').length).toBe(1)
    })

    it('Should render a body item', () => {
        expect(wrapper.find('.comment-body').length).toBe(1)
    })

    it('Should render an action item', () => {
        expect(wrapper.find('.comment-action').length).toBe(1)
    })

    it('Should render a <VoteScore /> element', () => {
        expect(wrapper.find('Connect(VoteScore)').length).toBe(1)
    })

    it('Should call editComment when edit span is clicked', () => {
        const mockEditComment = jest.fn()
        wrapper.instance().editComment = mockEditComment
        expect(mockEditComment).toHaveBeenCalledTimes(0)
        wrapper.find('.comment-action-edit').simulate('click')
        expect(mockEditComment).toHaveBeenCalledTimes(1)
    })

    it('Should call onEditComment when method editComment runs', () => {
        expect(setup.onEditComment).toHaveBeenCalledTimes(0)
        wrapper.instance().editComment()
        expect(setup.onEditComment).toHaveBeenCalledTimes(1)
    })

    it('Should call removeComment when edit span is clicked', () => {
        const mockRemoveComment = jest.fn()
        wrapper.instance().removeComment = mockRemoveComment
        expect(mockRemoveComment).toHaveBeenCalledTimes(0)
        wrapper.find('.comment-action-remove').simulate('click')
        expect(mockRemoveComment).toHaveBeenCalledTimes(1)
    })

    it('Should call onRemoveComment when method removeComment runs', () => {
        expect(setup.onRemoveComment).toHaveBeenCalledTimes(0)
        wrapper.instance().removeComment()
        expect(setup.onRemoveComment).toHaveBeenCalledTimes(1)
    })
})