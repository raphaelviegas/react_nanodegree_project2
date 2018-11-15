import React from 'react'
import { shallow } from "enzyme"
import { OrderPosts } from '../OrderPosts'
import MaterialIcon from 'material-icons-react'

describe("<OrderPosts />", () => {
    // mock function to replace the one provided by mapDispatchToProps
    const mockorderPosts = jest.fn()
    let wrapper
    beforeEach(() => {
        mockorderPosts.mockClear()
        wrapper = shallow(<OrderPosts
            orderPosts={mockorderPosts}
        />)
    })

    it('Should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('Should render an link icon that opens the dropdown menu', () => {
        const auxiliarIcon = "sort" //Used because material Icons shows an alert if the prop icon is undefined
        expect(wrapper.containsMatchingElement(<MaterialIcon icon={auxiliarIcon} size={30} />)).toEqual(true)
    })

    it('Should add style display:block to the ul when the icon is clicked', () => {
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.dropdown-trigger2').simulate('click')
        expect(wrapper).toMatchSnapshot()
    })

    it('Should call changeOrderOption when all options are selected', () => {
        expect(mockorderPosts).toHaveBeenCalledTimes(0)
        const numOfOptions = wrapper.find('.order-button')
        for (let i = 0; i < numOfOptions.length; i++) {
            numOfOptions.at(i).simulate('click')
            expect(mockorderPosts).toHaveBeenCalledTimes(i + 1)
        }
    })

    it('Should call the mockFunction when method changeOrderOption is called', () => {
        expect(mockorderPosts).toHaveBeenCalledTimes(0)
        wrapper.instance().changeOrderOption('voteScore')
        expect(mockorderPosts).toHaveBeenCalledTimes(1)
    })
})
