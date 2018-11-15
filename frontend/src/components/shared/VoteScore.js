import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MaterialIcon from 'material-icons-react'
import { fetchVotePost } from '../../actions/posts'
import { fetchVoteComment } from '../../actions/comments'

export class VoteScore extends Component {
    static propTypes = {
        size: PropTypes.number.isRequired,
        id: PropTypes.string,
        score: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired
    }

    vote({ type, id, option }) {
        switch (type) {
            case 'post':
                this.props.fetchVotePost(id, { option })
                break
            case 'comment':
                this.props.fetchVoteComment(id, { option })
                break
            default:
                break
        }
    }

    render() {
        const { size, id, score, type } = this.props
        return (
            <div className="vote-score">
                <div className="vote-score-button vote-down" onClick={() => this.vote({ type, id, option: 'downVote' })}>
                    <MaterialIcon icon="thumb_down" size={size} />
                </div>
                <span className="vote-score-score">{score}</span>
                <div className="vote-score-button vote-up" onClick={() => this.vote({ type, id, option: 'upVote' })}>
                    <MaterialIcon icon="thumb_up" size={size} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        size: ownProps.size,
        id: ownProps.id,
        score: ownProps.score,
        type: ownProps.type
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVotePost: (id, option) => dispatch(fetchVotePost(id, option)),
        fetchVoteComment: (id, option) => dispatch(fetchVoteComment(id, option))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore);
