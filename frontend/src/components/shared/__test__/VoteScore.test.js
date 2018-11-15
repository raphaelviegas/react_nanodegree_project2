import React from 'react'
import { shallow } from "enzyme"
import { VoteScore } from '../VoteScore'
import MaterialIcon from 'material-icons-react'
import { votePost } from '../../../__test-helpers__/posts'
import { voteComment } from '../../../__test-helpers__/comments'

describe("<VoteScore />", () => {
    // mock function to replace the one provided by mapDispatchToProps
    const setupPost = {
        id: votePost.id,
        score: votePost.voteScore,
        type: 'post',
        size: 30,
        fetchVotePost: jest.fn()
    }
    const setupComment = {
        id: voteComment.id,
        score: voteComment.voteScore,
        type: 'comment',
        size: 20,
        fetchVoteComment: jest.fn()
    }

    beforeEach(() => {
        setupPost.fetchVotePost.mockClear()
        setupComment.fetchVoteComment.mockClear()
    })

    it('Should render two buttons', () => {
        const wrapper = shallow(<VoteScore {...setupPost} />)
        expect(wrapper.find('.vote-score-button').length).toEqual(2)
    })

    it('Should render a .vote-down button', () => {
        const wrapper = shallow(<VoteScore {...setupPost} />)
        expect(wrapper.find('.vote-down').length).toEqual(1)
    })

    it('Should render a .vote-up button', () => {
        const wrapper = shallow(<VoteScore {...setupPost} />)
        expect(wrapper.find('.vote-up').length).toEqual(1)
    })

    describe("<VoteScore  type='posts' />", () => {
        const wrapper = shallow(<VoteScore {...setupPost} />)

        it('Should render corretly on type Post', () => {
            expect(wrapper).toMatchSnapshot()
        })

        it('Should call fetchVotePost when the buttons are clicked', () => {
            expect(setupPost.fetchVotePost).toHaveBeenCalledTimes(0)
            wrapper.find('.vote-down').simulate('click')
            expect(setupPost.fetchVotePost).toHaveBeenCalledTimes(1)
            wrapper.find('.vote-up').simulate('click')
            expect(setupPost.fetchVotePost).toHaveBeenCalledTimes(2)
        })
    })

    describe("<VoteScore  type='comments' />", () => {
        const wrapper = shallow(<VoteScore {...setupComment} />)

        it('Should render corretly on type Comment', () => {
            expect(wrapper).toMatchSnapshot()
        })

        it('Should call fetchVoteComment when the buttons are clicked', () => {
            expect(setupComment.fetchVoteComment).toHaveBeenCalledTimes(0)
            wrapper.find('.vote-down').simulate('click')
            expect(setupComment.fetchVoteComment).toHaveBeenCalledTimes(1)
            wrapper.find('.vote-up').simulate('click')
            expect(setupComment.fetchVoteComment).toHaveBeenCalledTimes(2)
        })
    })

    it('Should not do anything when method vote is called with undefined type property', () => {
        const setup = {
            id: voteComment.id,
            score: voteComment.voteScore,
            type: 'comment',
            size: 20,
            fetchVotePost: jest.fn(),
            fetchVoteComment: jest.fn()
        }
        const wrapper = shallow(<VoteScore {...setup} />)
        expect(setup.fetchVotePost).toHaveBeenCalledTimes(0)
        expect(setup.fetchVoteComment).toHaveBeenCalledTimes(0)
        wrapper.instance().vote({ type: undefined })
        expect(setup.fetchVotePost).toHaveBeenCalledTimes(0)
        expect(setup.fetchVoteComment).toHaveBeenCalledTimes(0)
    })

})