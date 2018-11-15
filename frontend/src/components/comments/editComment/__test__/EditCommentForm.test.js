import React from 'react'
import { shallow } from 'enzyme'
import { EditCommentForm } from '../EditCommentForm'
import { editCommentInfo } from '../../../../__test-helpers__/comments'

describe('<EditCommentForm />', () => {
    const setup = {
        commentId: editCommentInfo.id,
        commentBody: editCommentInfo.editContent.body,
        fetchEditComment: jest.fn(),
        closeModal: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.fetchEditComment.mockClear()
        setup.closeModal.mockClear()
        wrapper = shallow(<EditCommentForm {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should have initial state with empty values', () => {
        const wrapperNoLifecicle = shallow(<EditCommentForm {...setup} />, { disableLifecycleMethods: true })
        expect(wrapperNoLifecicle.state()).toEqual({ body: '' })
    })

    it('Should expect method fillDefaultValue to update the state.body', () => {
        const wrapperNoLifecicle = shallow(<EditCommentForm {...setup} />, { disableLifecycleMethods: true })
        expect(wrapperNoLifecicle.state()).toEqual({ body: '' })
        wrapperNoLifecicle.instance().fillDefaultValue('New body value')
        expect(wrapperNoLifecicle.state()).toEqual({ body: 'New body value' })
    })

    it('Should update state with values passed as props', () => {
        expect(wrapper.state()).toEqual({ body: setup.commentBody })
    })

    it('Should update the body value when props are updated', () => {
        const mockfillDefaultValue = jest.fn()
        const newWrapper = shallow(<EditCommentForm {...setup} />)
        newWrapper.instance().fillDefaultValue = mockfillDefaultValue
        expect(mockfillDefaultValue).toHaveBeenCalledTimes(0)
        newWrapper.setProps({ commentBody: 'some comment body' })
        expect(mockfillDefaultValue).toHaveBeenCalledTimes(1)
    })

    it('Should change the state.body after onChange event on title input', () => {
        expect(wrapper.state()).toEqual({ body: setup.commentBody })
        wrapper.find('textarea').simulate('change', { target: { value: 'New Body' } })
        expect(wrapper.state()).toEqual({ body: 'New Body' })
    })

    it('Should call fetchEditComment and closeModal on form submit', () => {
        expect(setup.fetchEditComment).toHaveBeenCalledTimes(0)
        expect(setup.closeModal).toHaveBeenCalledTimes(0)
        wrapper.find('button').simulate('click')
        expect(setup.fetchEditComment).toHaveBeenCalledTimes(1)
        expect(setup.closeModal).toHaveBeenCalledTimes(1)
    })
})