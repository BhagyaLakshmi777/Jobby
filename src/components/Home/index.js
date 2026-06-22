import {Component} from 'react'

import Header from '../Header'

import './index.css'

import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-text">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="job-link-btn">
            <button type="button" className="jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default Home
