import React from 'react'
import { shallow } from 'enzyme'
import { EditPostForm } from '../EditPostForm'
import { editPostInfo } from '../../../../__test-helpers__/posts'


describe('<EditPostForm />', () => {
    const setup = {
        defaultTitle: editPostInfo.editContent.title,
        defaultBody: editPostInfo.editContent.body,
        id: editPostInfo.id,
        fetchEditPost: jest.fn()
    }
    let wrapper
    beforeEach(() => {
        setup.fetchEditPost.mockClear()
        wrapper = shallow(<EditPostForm {...setup} />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should have initial state with empty values', () => {
        const wrapperNoLifecicle = shallow(<EditPostForm {...setup} />, { disableLifecycleMethods: true })
        expect(wrapperNoLifecicle.state()).toEqual({ title: '', body: '', })
    })

    it('Should update state with values passed as props', () => {
        expect(wrapper.state()).toEqual({ title: setup.defaultTitle, body: setup.defaultBody })
    })

    it('Should change the state.title after onChange event on title input', () => {
        expect(wrapper.state()).toEqual({ title: setup.defaultTitle, body: setup.defaultBody })
        wrapper.find('input').simulate('change', { target: { value: 'New Title' } })
        expect(wrapper.state()).toEqual({ title: 'New Title', body: setup.defaultBody })
    })

    it('Should change the state.body after onChange event on textarea', () => {
        expect(wrapper.state()).toEqual({ title: setup.defaultTitle, body: setup.defaultBody })
        wrapper.find('textarea').simulate('change', { target: { value: 'New Body' } })
        expect(wrapper.state()).toEqual({ title: setup.defaultTitle, body: 'New Body' })
    })

    it('Should call fetchEditPost on form submit', () => {
        expect(setup.fetchEditPost).toHaveBeenCalledTimes(0)
        wrapper.find('button').simulate('click')
        expect(setup.fetchEditPost).toHaveBeenCalledTimes(1)
    })

    describe('Component on Post Card', () => {
        it('Should call postCardFormSubmited on form submit', () => {
            const mockpostCardFormSubmited = jest.fn()
            wrapper.setProps({ postCardFormSubmited: mockpostCardFormSubmited })
            expect(mockpostCardFormSubmited).toHaveBeenCalledTimes(0)
            wrapper.find('button').simulate('click')
            expect(mockpostCardFormSubmited).toHaveBeenCalledTimes(1)
        })
    })

    describe('Component on Post Page', () => {
        it('Should call postPageFormSubmited on form submit', () => {
            const mockpostPageFormSubmited = jest.fn()
            wrapper.setProps({ postPageFormSubmited: mockpostPageFormSubmited })
            expect(mockpostPageFormSubmited).toHaveBeenCalledTimes(0)
            wrapper.find('button').simulate('click')
            expect(mockpostPageFormSubmited).toHaveBeenCalledTimes(1)
        })
    })
})