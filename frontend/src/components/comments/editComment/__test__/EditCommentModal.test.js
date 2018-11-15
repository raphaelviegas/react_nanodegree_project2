import React from 'react'
import { shallow } from 'enzyme'
import EditCommentModal from '../EditCommentModal'
import { editCommentInfo } from '../../../../__test-helpers__/comments'

describe('<EditCommentModal />', () => {

    const setup = {
        commentId: editCommentInfo.id,
        commentBody: editCommentInfo.editContent.body,
        modalOpen: 'modal-open',
        onCloseModal: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.onCloseModal.mockClear()
        wrapper = shallow(<EditCommentModal {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should render an EditCommentForm component', () => {
        expect(wrapper.find('withRouter(Connect(EditCommentForm))').length).toBe(1)
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