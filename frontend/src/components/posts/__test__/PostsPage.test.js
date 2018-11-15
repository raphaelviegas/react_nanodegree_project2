import React from "react"
import { shallow } from "enzyme"
import { PostsPage } from '../PostsPage'
import { posts } from '../../../__test-helpers__/posts'

describe("<CategoryPage />", () => {
    // mock function to replace the one provided by mapDispatchToProps
    const mockfetchPosts = jest.fn()
    let wrapper
    beforeEach(() => {
        mockfetchPosts.mockClear()
        wrapper = shallow(<PostsPage
            posts={posts}
            fetchPosts={mockfetchPosts}
        />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should call fetchPosts when component mounts', () => {
        expect(mockfetchPosts).toHaveBeenCalledTimes(1)
    })

    it('Should render a Connected OrderPosts component', () => {
        const componentOrderPosts = wrapper.find('Connect(OrderPosts)')
        expect(componentOrderPosts).toHaveLength(1)
    })

    it('Should find a withRouter(Connect(PostList)) with posts props', () => {
        let componentPostList = wrapper.find('withRouter(Connect(PostList))')
        expect(componentPostList).toHaveLength(1)
        expect(componentPostList.prop('posts')).toEqual(posts)
    })




})
