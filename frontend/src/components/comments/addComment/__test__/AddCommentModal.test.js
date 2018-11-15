import React from 'react'
import { shallow } from 'enzyme'
import AddCommentModal from '../AddCommentModal'
import { addCommentInfo } from '../../../../__test-helpers__/comments'

describe('<EditCommentModal />', () => {

    const setup = {
        parentId: addCommentInfo.parentId,
        modalOpen: 'modal-open',
        onCloseModal: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.onCloseModal.mockClear()
        wrapper = shallow(<AddCommentModal {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should render an AddCommentForm component', () => {
        expect(wrapper.find('withRouter(Connect(AddCommentForm))').length).toBe(1)
    })

    it('Should call onCloseModal when click on modal-overlay', () => {
        expect(setup.onCloseModal).toHaveBeenCalledTimes(0)
        wrapper.find('.modal-overlay').simulate('click')
        expect(setup.onCloseModal).toHaveBeenCalledTimes(1)
    })

    it('Should call onCloseModal when click on close icon', () => {
        expect(setup.onCloseModal).toHaveBeenCalledTimes(0)
        wrapper.find('.close-modal').simulate('click')
        expect(setup.onCloseModal).toHaveBeenCalledTimes(1)
    })

})