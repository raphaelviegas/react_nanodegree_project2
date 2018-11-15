import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

import Dynamic from '../Dynamic'

describe('<Dynamic />', () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<Dynamic loading={true} />)
    })

    it('Should render a progress bar when the posts are loading (props.loading === true)', () => {
        const loadingBar = <div className="progress"><div className="indeterminate"></div></div>
        expect(wrapper.containsMatchingElement(loadingBar)).toEqual(true)
    })

    it('SNAPSHOT - Should render a progress bar when the posts are loading (props.loading === true)', () => {
        const tree = renderer.create(
            <MemoryRouter initialEntries={[{ pathname: '/', key: 'testKey' }]}>
                <Dynamic loading={true} />
            </MemoryRouter>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })

    it('Should render a  <SwitchRoutes> when props.loading === false', () => {
        wrapper.setProps({ loading: false })
        expect(wrapper.find('SwitchRoutes').length).toEqual(1)
    })

})
