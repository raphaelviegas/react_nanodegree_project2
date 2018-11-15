import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import AddPostButton from '../AddPostButton'
import { Link } from 'react-router-dom'
import MaterialIcon from 'material-icons-react'

describe('<AddPostButton />', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<AddPostButton />)
    })

    it('Should render one link tag to /addPost', () => {
        const auxiliarIcon = "playlist_add" //Used because material Icons shows an alert if the prop icon is undefined
        expect(wrapper.containsMatchingElement(<Link to="/addPost"><MaterialIcon icon={auxiliarIcon} /></Link>)).toEqual(true)
    })

    it('Should render correctly', () => {
        const tree = renderer.create(
            <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
                <AddPostButton />
            </MemoryRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

})
