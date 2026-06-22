import './index.css'

import {Link, withRouter} from 'react-router-dom'

import {Component} from 'react'

import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

class Header extends Component {
  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
        <ul className="icon-container">
          <li>
            <Link to="/">
              <AiFillHome size="20" color="white" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsFillBriefcaseFill size="20" color="white" />
            </Link>
          </li>
          <li>
            <button className="logOut-btn" onClick={this.onClickLogout}>
              <FiLogOut size="20" color="white" />
            </button>
          </li>
        </ul>
        <div className="links-container">
          <ul className="menu">
            <li>
              <Link to="/" className="list-item">
                Home
              </Link>
            </li>
            <li>
              <Link className="list-item" to="/jobs">
                Jobs
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="log-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
