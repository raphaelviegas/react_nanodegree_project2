import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from "materialize-css/dist/js/materialize.min.js"
import MaterialIcon from 'material-icons-react'
import { orderPosts } from '../../actions/posts'

export class OrderPosts extends Component {
    componentDidMount() {
        let elems = document.querySelectorAll('.dropdown-trigger2');
        // eslint-disable-next-line
        let instances = M.Dropdown.init(elems, { alignment: 'right', constrainWidth: false, hover: false });
    }

    changeOrderOption(orderOption) {
        this.props.orderPosts(orderOption)
    }

    render() {
        return (
            <div className="order-by">
                <a className='dropdown-trigger2' data-target='order_posts'><MaterialIcon icon="sort" size={30} /></a>
                <ul id='order_posts' className='dropdown-content'>
                    <li><span>Vote Score</span></li>
                    <li><a className="order-button" onClick={() => this.changeOrderOption('voteScore')}>Ascending</a></li>
                    <li><a className="order-button" onClick={() => this.changeOrderOption('-voteScore')}>Descending</a></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><span>Date</span></li>
                    <li><a className="order-button" onClick={() => this.changeOrderOption('timestamp')}>Ascending</a></li>
                    <li><a className="order-button" onClick={() => this.changeOrderOption('-timestamp')}>Descending</a></li>
                    <li className="divider" tabIndex="-1"></li>
                    <li><span># Comments</span></li>
                    <li><a className="order-button" onClick={() => this.changeOrderOption('commentCount')}>Ascending</a></li>
                    <li><a className="order-button" onClick={() => this.changeOrderOption('-commentCount')}>Descending</a></li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderPosts: (orderOption) => dispatch(orderPosts(orderOption)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPosts);
