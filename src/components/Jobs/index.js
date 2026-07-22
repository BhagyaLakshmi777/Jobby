import {Component} from 'react'

import Header from '../Header'

import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import './index.css'

import Loader from 'react-loader-spinner'

import SpecificJob from '../SpecificJob'
import SalaryRange from '../SalaryRange'
import EmploymentType from '../EmploymentType'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_Progress',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const apiJobConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_Progress',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: apiConstants.initial,
    profileObject: {},
    jobsList: [],
    searchInput: '',
    minimum_package: '1000000',
    employment_type: [],
    apiJobStatus: apiJobConstants.initial,
    location: [],
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsList()
  }

  getJobsList = async () => {
    const {
      searchInput,
      minimum_package,
      employment_type,
      apiJobStatus,
      location,
      jobsList,
    } = this.state
    const employmentType = employment_type.join(',')
    this.setState({apiJobStatus: apiJobConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimum_package}&search=${searchInput} `
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)

    if (response.ok === true) {
      const jobsData = await response.json()
      const {jobs} = jobsData
      if (location.length === 0) {
        this.setState({jobsList: jobs, apiJobStatus: apiJobConstants.success})
      } else {
        let filterJobsList = []
        for (let i of location) {
          for (let j of jobs) {
            if (j.location === i) {
              filterJobsList.push(j)
            }
          }
        }
        this.setState({
          jobsList: filterJobsList,
          apiJobStatus: apiJobConstants.success,
        })
      }
    } else {
      this.setState({apiJobStatus: apiJobConstants.failure})
    }
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)

    if (response.ok === true) {
      const profileData = await response.json()
      const {profile_details} = profileData
      const profileDetails = profile_details
      const updatedObject = {
        profileImageUrl: profileDetails.profile_image_url,
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        apiStatus: apiConstants.success,
        profileObject: updatedObject,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profileObject} = this.state
    const {profileImageUrl, name, shortBio} = profileObject
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="role">{shortBio}</p>
      </div>
    )
  }

  onClickRetry = () => {
    this.getProfileData()
  }

  renderProfileFailure = () => (
    <div className="button-container">
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderProfileLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderProfileSuccess()
      case apiConstants.failure:
        return this.renderProfileFailure()
      case apiConstants.inProgress:
        return this.renderProfileLoading()
      default:
        return null
    }
  }

  renderJobsSuccess = () => {
    const {jobsList, location} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failure-img"
          />
          <h1 className="failure-heading">No Jobs Found</h1>
          <p className="failure-text">
            We could not find any jobs. Try other filters
          </p>
        </div>
      )
    }
    return (
      <ul className="jobs-list-container1">
        {jobsList.map(each => (
          <SpecificJob key={each.id} jobDetails={each} />
        ))}
      </ul>
    )
  }

  renderJobsLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry1 = () => {
    this.getJobsList()
  }

  renderJobsFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn1" onClick={this.onClickRetry1}>
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case apiJobConstants.success:
        return this.renderJobsSuccess()
      case apiJobConstants.failure:
        return this.renderJobsFailure()
      case apiJobConstants.inProgress:
        return this.renderJobsLoading()
    }
  }

  onKeyDownSearchInput = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.getJobsList)
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSalaryChange = id => {
    this.setState({minimum_package: id}, this.getJobsList)
  }

  onEmploymentChange = (value, boolValue) => {
    const {employment_type} = this.state
    const isPresent = employment_type.includes(value)
    if (isPresent) {
      const filterData = employment_type.filter(each => each !== value)

      this.setState({employment_type: filterData}, this.getJobsList)
    } else {
      employment_type.push(value)
      this.setState({employment_type}, this.getJobsList)
    }
  }
  onChangeLocation = event => {
    const {location, jobsList} = this.state
    let filterLocation = []
    const isExists = location.includes(event.target.value)

    if (isExists) {
      filterLocation = location.filter(each => each !== event.target.value)

      this.setState({location: filterLocation}, this.getJobsList)
    } else {
      location.push(event.target.value)
      const newLocation = location
      this.setState({location: newLocation}, this.getJobsList)
    }
  }

  render() {
    const {jobsList, searchInput, employment_type} = this.state
    console.log(jobsList)

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchInput}
              onKeyDown={this.onKeyDownSearchInput}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-button"
              onClick={() => this.getJobsList()}
            >
              <BsSearch />
            </button>
          </div>
          <div className="profile-section">
            {this.renderProfile()}
            <hr className="line" />
            <h1 className="employ-type">Type of Employment</h1>
            <ul className="list-type">
              {employmentTypesList.map(each => (
                <EmploymentType
                  employmentDetails={each}
                  key={each.employmentTypeId}
                  onEmploymentChange={this.onEmploymentChange}
                />
              ))}
            </ul>
            <hr className="line" />
            <h1 className="employ-type">Salary Range</h1>
            <ul className="list-type">
              {salaryRangesList.map(each => (
                <SalaryRange
                  salaryDetails={each}
                  key={each.salaryRangeId}
                  onSalaryChange={this.onSalaryChange}
                />
              ))}
            </ul>
            <hr className="line" />
            <h1 className="employ-type">Location</h1>
            <ul className="list-type">
              <li className="input-list">
                <input
                  type="checkbox"
                  className="loc-checkbox"
                  id="HYDERABAD"
                  value="Hyderabad"
                  onChange={this.onChangeLocation}
                />
                <label htmlFor="HYDERABAD" className="loc-label">
                  Hyderabad
                </label>
              </li>
              <li className="input-list">
                <input
                  type="checkbox"
                  className="loc-checkbox"
                  id="BANGALORE"
                  value="Bangalore"
                  onChange={this.onChangeLocation}
                />
                <label htmlFor="BANGALORE" className="loc-label">
                  Bangalore
                </label>
              </li>
              <li className="input-list">
                <input
                  type="checkbox"
                  className="loc-checkbox"
                  id="CHENNAI"
                  value="Chennai"
                  onChange={this.onChangeLocation}
                />
                <label htmlFor="CHENNAI" className="loc-label">
                  Chennai
                </label>
              </li>
              <li className="input-list">
                <input
                  type="checkbox"
                  className="loc-checkbox"
                  id="DELHI"
                  value="Delhi"
                  onChange={this.onChangeLocation}
                />
                <label htmlFor="DELHI" className="loc-label">
                  Delhi
                </label>
              </li>
              <li className="input-list">
                <input
                  type="checkbox"
                  className="loc-checkbox"
                  id="MUMBAI"
                  value="Mumbai"
                  onChange={this.onChangeLocation}
                />
                <label htmlFor="MUMBAI" className="loc-label">
                  Mumbai
                </label>
              </li>
            </ul>
          </div>
          <div className="jobs-list-container">
            <div className="search-container1">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchInput}
                onKeyDown={this.onKeyDownSearchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={() => this.getJobsList()}
              >
                <BsSearch />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
