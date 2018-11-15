import React from 'react'
import { shallow } from 'enzyme'
import { AddCommentForm } from '../AddCommentForm'
import { addCommentInfo } from '../../../../__test-helpers__/comments'
import { add } from '../../../../helpers/ServerAPI';

describe('<AddCommentForm />', () => {
    const setup = {
        parentId: addCommentInfo.parentId,
        closeModal: jest.fn(),
        fetchAddComment: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.closeModal.mockClear()
        setup.fetchAddComment.mockClear()
        wrapper = shallow(<AddCommentForm {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should have initial state with empty values', () => {
        expect(wrapper.state()).toEqual({ body: '', author: '' })
    })

    it('Should change the state.author after onChange event on author input', () => {
        expect(wrapper.state()).toEqual({ body: '', author: '' })
        wrapper.find('input').simulate('change', { target: { value: 'New Author' } })
        expect(wrapper.state()).toEqual({ body: '', author: 'New Author' })
    })

    it('Should change the state.body after onChange event on textarea', () => {
        expect(wrapper.state()).toEqual({ body: '', author: '' })
        wrapper.find('textarea').simulate('change', { target: { value: 'New Body' } })
        expect(wrapper.state()).toEqual({ body: 'New Body', author: '' })
    })

    it('Should clear the state after clicking on Reset Form Button', () => {
        expect(wrapper.state()).toEqual({ body: '', author: '' })
        wrapper.setState({ body: 'New Body', author: 'New Author' })
        expect(wrapper.state()).toEqual({ body: 'New Body', author: 'New Author' })
        wrapper.find('.btn-reset-comment').simulate('click')
        expect(wrapper.state()).toEqual({ body: '', author: '' })
    })

    it('Should call onFormSubmit when btn-add-comment is clicked', () => {
        const mockonFormSubmit = jest.fn()
        wrapper.instance().onFormSubmit = mockonFormSubmit
        expect(mockonFormSubmit).toHaveBeenCalledTimes(0)
        wrapper.find('.btn-add-comment').simulate('click')
        expect(mockonFormSubmit).toHaveBeenCalledTimes(1)
    })

    it('Should call fetchAddComment, onResetForm and closeModal when method onFormSubmit is called', () => {
        const mockonResetForm = jest.fn()
        wrapper.instance().onResetForm = mockonResetForm
        expect(setup.fetchAddComment).toHaveBeenCalledTimes(0)
        expect(setup.closeModal).toHaveBeenCalledTimes(0)
        expect(mockonResetForm).toHaveBeenCalledTimes(0)
        wrapper.instance().onFormSubmit({ addCommentInfo })
        expect(setup.fetchAddComment).toHaveBeenCalledTimes(1)
        expect(setup.closeModal).toHaveBeenCalledTimes(1)
        expect(mockonResetForm).toHaveBeenCalledTimes(1)
    })
})