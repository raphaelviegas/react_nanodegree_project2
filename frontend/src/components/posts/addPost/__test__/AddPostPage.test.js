import React from 'react'
import { shallow } from 'enzyme'

import AddPostPage from '../AddPostPage'
import { Link } from 'react-router-dom'

describe('<AddPostPage />', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<AddPostPage />)
    })

    it('Should render one link tag to /', () => {
        expect(wrapper.containsMatchingElement(<Link to="/">Go back to the home page</Link>)).toEqual(true)
    })
    it('Should render an AddPostForm component', () => {
        expect(wrapper.find('withRouter(Connect(AddPostForm))').length).toBe(1)
    })

})
