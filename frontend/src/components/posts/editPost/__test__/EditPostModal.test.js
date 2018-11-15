import React from 'react'
import { shallow } from 'enzyme'
import EditPostModal from '../EditPostModal'
import { editPostInfo } from '../../../../__test-helpers__/posts'

describe('<EditPostModal />', () => {

    const setup = {
        id: editPostInfo.id,
        title: editPostInfo.editContent.title,
        body: editPostInfo.editContent.body,
        modalOpen: 'modal-open',
        onCloseModal: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.onCloseModal.mockClear()
        wrapper = shallow(<EditPostModal {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should render an EditPostForm component', () => {
        expect(wrapper.find('withRouter(Connect(EditPostForm))').length).toBe(1)
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