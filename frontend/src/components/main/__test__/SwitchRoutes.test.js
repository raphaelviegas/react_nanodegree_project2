import React from "react"
import { shallow } from "enzyme"
import PostsPage from "../../posts/PostsPage"
import CategoryPage from "../../categories/CategoryPage"
import PostPage from "../../posts/PostPage"
import AddPostPage from "../../posts/addPost/AddPostPage"
import Error from "../../main/Error"

import SwitchRoutes from "../SwitchRoutes"

describe("<Dynamic />", () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<SwitchRoutes />)
  })

  it("Should render correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("routes / to PostsPage component", () => {
    expect(
      wrapper
        .find('Route[exact=true][path="/"]')
        .first()
        .prop("component")
    ).toBe(PostsPage)
  })

  it("routes /addPost to AddPostPage component", () => {
    expect(
      wrapper
        .find('Route[exact=true][path="/addPost"]')
        .first()
        .prop("component")
    ).toBe(AddPostPage)
  })

  it("routes /error to Error component", () => {
    expect(
      wrapper
        .find('Route[exact=true][path="/error"]')
        .first()
        .prop("component")
    ).toBe(Error)
  })

  it("routes /:category to CategoryPage component", () => {
    expect(
      wrapper
        .find('Route[exact=true][path="/:category"]')
        .first()
        .prop("component")
    ).toBe(CategoryPage)
  })

  it("routes /:category/:postId to PostPage component", () => {
    expect(
      wrapper
        .find('Route[path="/:category/:postId"]')
        .first()
        .prop("component")
    ).toBe(PostPage)
  })
})
