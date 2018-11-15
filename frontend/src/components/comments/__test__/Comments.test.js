import React from 'react'
import { shallow } from 'enzyme'
import { Comments } from '../Comments'
import { comments } from '../../../__test-helpers__/comments'

describe('<Comments />', () => {
    const initialState = {
        sortByOption: '-voteScore',
        commentId: '',
        commentBody: '',
        editModalOpen: ''
    }
    const setup = {
        parentId: comments[0].parentId,
        comments,
        fetchComments: jest.fn(),
        fetchRemoveComment: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.fetchComments.mockClear()
        setup.fetchRemoveComment.mockClear()
        wrapper = shallow(<Comments {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should have initial state with empty values', () => {
        expect(wrapper.state()).toEqual(initialState)
    })

    it('Should render an order-by list with ordering option', () => {
        expect(wrapper.find('.order-by')).toHaveLength(1)
    })

    it('Should render 2 Comment components', () => {
        expect(wrapper.find('.noComments')).toHaveLength(0)
        expect(wrapper.find('Comment')).toHaveLength(2)
    })

    it('Should render a message if the post doesnt have comments', () => {
        wrapper.setProps({ comments: [] })
        expect(wrapper.find('.noComments')).toHaveLength(1)
        expect(wrapper.find('Comment')).toHaveLength(0)
    })

    it('Should render an AddCommentButton component', () => {
        expect(wrapper.find('AddCommentButton')).toHaveLength(1)
    })

    it('Should render an EditCommentModal component', () => {
        expect(wrapper.find('AddCommentButton')).toHaveLength(1)
    })

    it('Should call fetchComments when component mounts', () => {
        expect(setup.fetchComments).toHaveBeenCalledTimes(1)
    })

    it('Should call fetchRemoveComment when method removeComment is called', () => {
        wrapper.instance().removeComment()
        expect(setup.fetchRemoveComment).toHaveBeenCalledTimes(1)
    })

    it('Should change state when showEditModal method is called', () => {
        const modalOption = { commentId: comments[0].id, commentBody: comments[0].body }
        expect(wrapper.state()).toEqual(initialState)
        wrapper.instance().showEditModal(modalOption.commentId, modalOption.commentBody)
        expect(wrapper.state()).toEqual({ ...initialState, editModalOpen: 'modal-open', commentId: comments[0].id, commentBody: comments[0].body })
    })

    it('Should change clear state when hideEditModal method is called', () => {
        const modalOption = { commentId: comments[0].id, commentBody: comments[0].body }
        expect(wrapper.state()).toEqual(initialState)
        wrapper.instance().showEditModal(modalOption.commentId, modalOption.commentBody)
        expect(wrapper.state()).toEqual({ ...initialState, editModalOpen: 'modal-open', commentId: comments[0].id, commentBody: comments[0].body })
        wrapper.instance().hideEditModal()
        expect(wrapper.state()).toEqual(initialState)
    })

    it('Should update state.sortByOption when method changeSortCriteria is called', () => {
        const sortOptions = ['voteScore', '-voteScore', 'timestamp', '-timestamp']
        expect(wrapper.state('sortByOption')).toEqual(initialState.sortByOption)
        expect(wrapper).toMatchSnapshot()
        for (let i = 0; i < sortOptions.length; i++) {
            wrapper.instance().changeSortCriteria(sortOptions[i])
            expect(wrapper.state('sortByOption')).toEqual(sortOptions[i])
            expect(wrapper).toMatchSnapshot()
        }
    })

    it('Should not do anything when method changeSortCriteira is called with empty values', () => {
        expect(wrapper.state('sortByOption')).toEqual(initialState.sortByOption)
        wrapper.instance().changeSortCriteria()
        expect(wrapper.state('sortByOption')).toEqual(initialState.sortByOption)
    })

    it('Should call changeSortCriteria when all options are selected', () => {
        const mockchangeSortCriteria = jest.fn()
        wrapper.instance().changeSortCriteria = mockchangeSortCriteria
        expect(mockchangeSortCriteria).toHaveBeenCalledTimes(0)
        const numOfOptions = wrapper.find('.order-button')
        for (let i = 0; i < numOfOptions.length; i++) {
            numOfOptions.at(i).simulate('click')
            expect(mockchangeSortCriteria).toHaveBeenCalledTimes(i + 1)
        }
    })
})