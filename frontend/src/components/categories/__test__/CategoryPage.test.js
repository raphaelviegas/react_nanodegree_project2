import React from "react"
import { shallow, mount, render } from "enzyme"
import { CategoryPage } from '../CategoryPage'
import { categories } from '../../../__test-helpers__/categories'
import { posts } from '../../../__test-helpers__/posts'


describe("<CategoryPage />", () => {
    // mock function to replace the one provided by mapDispatchToProps
    const mockfetchPosts = jest.fn()
    const mockverifyCategories = jest.fn()
    const testCategory = 'react'
    const setup = {
        posts,
        categories,
        category: testCategory,
        fetchPosts: mockfetchPosts
    }
    let wrapper
    beforeEach(() => {
        mockfetchPosts.mockClear()
        mockverifyCategories.mockClear()
        wrapper = shallow(<CategoryPage {...setup} />)
        wrapper.instance().verifyCategory = mockverifyCategories
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should call fetchPosts and verifyCategory when component mounts', () => {
        expect(mockfetchPosts).toHaveBeenCalledTimes(1)
    })

    it('Should call fetchPosts when component updates', () => {
        wrapper.setProps({ category: 'redux' })
        expect(mockfetchPosts).toHaveBeenCalledTimes(2)
    })

    it('Should call verifyCategory() when component mounts', () => {
        wrapper.instance().componentDidMount()
        expect(mockverifyCategories).toHaveBeenCalledTimes(1)
    })

    it('Should call verifyCategory() when component updates', () => {
        wrapper.setProps({ category: 'redux' })
        expect(mockverifyCategories).toHaveBeenCalledTimes(1)
    })

    it('Should not call verifyCategory() when component updates if the props are the same', () => {
        wrapper.setProps({ category: testCategory })
        expect(mockverifyCategories).toHaveBeenCalledTimes(0)
    })

    it('Should render a Connected OrderPosts component', () => {
        const componentOrderPosts = wrapper.find('Connect(OrderPosts)')
        expect(componentOrderPosts).toHaveLength(1)
    })

    it('Should find a withRouter(Connect(PostList)) with posts props', () => {
        let componentPostList = wrapper.find('withRouter(Connect(PostList))')
        expect(componentPostList).toHaveLength(1)
        const filteredPosts = posts.filter(post => post.category === testCategory)
        expect(componentPostList.prop('posts')).toEqual(filteredPosts)
    })

    it('Should redirect user to error page when category doesnt exists', () => {
        const historyMock = { push: jest.fn() };
        const newSetup = {
            posts,
            categories,
            category: 'invalidCategory',
            fetchPosts: mockfetchPosts,
        }
        const newWrapper = shallow(<CategoryPage {...newSetup} history={historyMock} />)
        expect(historyMock.push).toHaveBeenCalledTimes(1)
    })
})
