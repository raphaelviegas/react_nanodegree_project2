import React from 'react'
import { shallow } from 'enzyme'
import AddCommentButton from '../AddCommentButton'

import { addCommentInfo } from '../../../../__test-helpers__/comments'

describe('<AddCommentButton />', () => {
    const setup = {
        parentId: addCommentInfo.parentId,
    }
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<AddCommentButton {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should render an empty initial state', () => {
        expect(wrapper.state()).toEqual({ modalOpen: '' })
    })

    it('Should render an AddCommentModal component', () => {
        expect(wrapper.find('AddCommentModal').length).toBe(1)
    })

    it('Should update state when button is clicked', () => {
        expect(wrapper.state()).toEqual({ modalOpen: '' })
        wrapper.find('button').simulate('click')
        expect(wrapper.state()).toEqual({ modalOpen: 'modal-open' })
    })

    it('Should update state when method openModal is called', () => {
        expect(wrapper.state()).toEqual({ modalOpen: '' })
        wrapper.instance().openModal()
        expect(wrapper.state()).toEqual({ modalOpen: 'modal-open' })
    })

    it('Should update state when method closeModal is called', () => {
        expect(wrapper.state()).toEqual({ modalOpen: '' })
        wrapper.instance().openModal()
        expect(wrapper.state()).toEqual({ modalOpen: 'modal-open' })
        wrapper.instance().closeModal()
        expect(wrapper.state()).toEqual({ modalOpen: '' })
    })

    it('Should call method openModal when .add-comment-btn is clicked', () => {
        const mockopenModal = jest.fn()
        wrapper.instance().openModal = mockopenModal
        expect(mockopenModal).toHaveBeenCalledTimes(0)
        wrapper.find('.add-comment-btn').simulate('click')
        expect(mockopenModal).toHaveBeenCalledTimes(1)
    })
})