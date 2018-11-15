import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { fetchCategories } from "../../actions/categories"
import { Link, NavLink, withRouter } from "react-router-dom"

export class Menu extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const { categories } = this.props;
    return (
      <div className="section menu-items">
        <p className="menu-title show-all">
          <Link to="/">Show All Posts</Link>
        </p>
        <p className="menu-title">Categories</p>
        <ul>
          {categories.map(category => {
            return (
              <li className="menu-item" key={category.name}>
                <NavLink to={`/${category.path}`} activeClassName="active">
                  {category.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoriesReducer.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))
