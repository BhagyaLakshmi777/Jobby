import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onChangeUsername = event => {
    const {username} = this.state
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    const {password} = this.state
    this.setState({password: event.target.value})
  }

  loginFailure = data => {
    this.setState({showSubmitError: true, errorMsg: data.error_msg})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    console.log('HI')
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFailure(data)
    }
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="login-container">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label className="user-name" htmlFor="userLabel">
              USERNAME
            </label>
            <br />
            <input
              className="user-input"
              id="userLabel"
              placeholder="Username"
              onChange={this.onChangeUsername}
              value={username}
            />
            <br />
            <label className="user-name" htmlFor="passwordLabel">
              PASSWORD
            </label>
            <br />
            <input
              className="user-input"
              placeholder="Password"
              type="password"
              id="passwordLabel"
              onChange={this.onChangePassword}
              value={password}
            />
            <br />
            <button type="submit" className="login-btn">
              Login
            </button>

            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
