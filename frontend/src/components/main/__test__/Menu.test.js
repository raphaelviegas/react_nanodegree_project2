import React from "react"
import { mount, render } from "enzyme"
import { MemoryRouter } from "react-router"

import { Menu } from "../Menu"
import { Link } from "react-router-dom"
import { initialState, categories } from "../../../__test-helpers__/categories"

describe("<Menu />", () => {
  // mock function to replace the one provided by mapDispatchToProps
  const mockfetchCategories = jest.fn()
  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Menu
          categories={initialState.categories}
          fetchCategories={mockfetchCategories}
        />
      </MemoryRouter>)
  })

  it("Should always render one link tag to /", () => {
    expect(
      wrapper.containsMatchingElement(<Link to="/">Show All Posts</Link>)
    ).toEqual(true)
  })

  it('Should call fetchCategories when component mounts', () => {
    expect(mockfetchCategories).toHaveBeenCalled()
  })

  it('Should render three NavLink to each category path', () => {
    let renderWrapper = render(
      <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
        <Menu
          categories={categories}
          fetchCategories={mockfetchCategories}
        />
      </MemoryRouter>)
    expect(renderWrapper.find('.menu-item').length).toEqual(3)
  })
})
