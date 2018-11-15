import React from 'react'
import { shallow } from 'enzyme'
import { AddPostForm } from '../AddPostForm'
import { categories } from '../../../../__test-helpers__/categories'

describe('<AddPostForm />', () => {
    const mockAddPost = jest.fn()
    const historyMock = { push: jest.fn() };
    const setup = {
        fetchAddPost: jest.fn(),
        isLoading: jest.fn(),
        categories
    }
    let wrapper
    beforeEach(() => {
        setup.fetchAddPost.mockClear()
        setup.isLoading.mockClear()
        historyMock.push.mockClear()
        wrapper = shallow(<AddPostForm {...setup} history={historyMock} />)
    })

    it('Should have initial state with empty values', () => {
        expect(wrapper.state()).toEqual({ title: '', body: '', author: '', category: 'none', error: false })
    })

    it('Should not render an error message on initial state', () => {
        expect(wrapper.find('.form-error-message').length).toBe(0)
    })

    it('Should render an error message if the user submits a form with empty values and dont call addPost', () => {
        expect(wrapper.state()).toEqual({ title: '', body: '', author: '', category: 'none', error: false })
        wrapper.instance().addPost = mockAddPost
        expect(mockAddPost).toHaveBeenCalledTimes(0)
        wrapper.find('.btn-add-post').simulate('click')
        expect(wrapper.find('.form-error-message').length).toBe(1)
        expect(mockAddPost).toHaveBeenCalledTimes(0)
    })

    it('Should change the state.title after onChange event on title input', () => {
        expect(wrapper.state()).toEqual({ title: '', body: '', author: '', category: 'none', error: false })
        wrapper.find('.input-title').simulate('change', { target: { value: 'New Title' } })
        expect(wrapper.state()).toEqual({ title: 'New Title', body: '', author: '', category: 'none', error: false })
    })

    it('Should change the state.author after onChange event on author input', () => {
        expect(wrapper.state()).toEqual({ title: '', body: '', author: '', category: 'none', error: false })
        wrapper.find('.input-author').simulate('change', { target: { value: 'New Author' } })
        expect(wrapper.state()).toEqual({ title: '', body: '', author: 'New Author', category: 'none', error: false })
    })

    it('Should change the state.category after onChange event on select', () => {
        expect(wrapper.state()).toEqual({ title: '', body: '', author: '', category: 'none', error: false })
        wrapper.find('select').simulate('change', { target: { value: 'react' } })
        expect(wrapper.state()).toEqual({ title: '', body: '', author: '', category: 'react', error: false })
    })

    it('Should change the state.body after onChange event on textarea', () => {
        expect(wrapper.state()).toEqual({ title: '', body: '', author: '', category: 'none', error: false })
        wrapper.find('textarea').simulate('change', { target: { value: 'New Body' } })
        expect(wrapper.state()).toEqual({ title: '', body: 'New Body', author: '', category: 'none', error: false })
    })

    it('Should clear the state after clicking on Reset Form Button', () => {
        expect(wrapper.state()).toEqual({ title: '', body: '', author: '', category: 'none', error: false })
        wrapper.setState({ title: 'New Title', body: 'New Body', author: 'New Author', category: 'react', error: false })
        expect(wrapper.state()).toEqual({ title: 'New Title', body: 'New Body', author: 'New Author', category: 'react', error: false })
        wrapper.find('.btn-reset-form').simulate('click')
        expect(wrapper.state()).toEqual({ title: '', body: '', author: '', category: 'react', error: false })
    })

    it('Should call addPost when OnFormSubmit is called with non empty values', () => {
        expect(setup.fetchAddPost).toHaveBeenCalledTimes(0)
        expect(setup.isLoading).toHaveBeenCalledTimes(0)
        expect(historyMock.push).toHaveBeenCalledTimes(0)
        wrapper.instance().onFormSubmit({ title: 'Post Title', body: 'Post Body', author: 'Post Author', category: 'Post Category' })
        expect(setup.fetchAddPost).toHaveBeenCalledTimes(1)
        expect(setup.isLoading).toHaveBeenCalledTimes(1)
        expect(historyMock.push).toHaveBeenCalledTimes(1)
    })

    it('Should call addPost when btn-add-post is clicked', () => {
        expect(setup.fetchAddPost).toHaveBeenCalledTimes(0)
        expect(setup.isLoading).toHaveBeenCalledTimes(0)
        expect(historyMock.push).toHaveBeenCalledTimes(0)
        wrapper.setState({ title: 'New Title', body: 'New Body', author: 'New Author', category: 'react', error: false })
        wrapper.find('.btn-add-post').simulate('click')
        expect(setup.fetchAddPost).toHaveBeenCalledTimes(1)
        expect(setup.isLoading).toHaveBeenCalledTimes(1)
        expect(historyMock.push).toHaveBeenCalledTimes(1)
    })
})