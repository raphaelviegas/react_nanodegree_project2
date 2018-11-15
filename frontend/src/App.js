import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchPosts } from './actions/posts'
import TopBar from './components/main/TopBar'
import Menu from './components/main/Menu'
import AddPostButton from './components/main/AddPostButton'
import Dynamic from './components/main/Dynamic'

export class App extends Component {

  componentDidMount() {
    this.props.fetchPosts()
  }

  render() {
    return (
      <div className="App">
        <TopBar />
        <div className="row main-row">
          <div className="col s12 m3 leftside-menu">
            <Menu />
          </div>
          <div className="col s12 m9 right-side-content">
            <Dynamic loading={this.props.loadingPosts} />
          </div>
        </div>
        <AddPostButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadingPosts: state.postsReducer.loadingPosts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
