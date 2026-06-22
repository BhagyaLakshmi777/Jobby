import './index.css'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import Skill from '../Skill'

const apiJobItemConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'In_Progress',
}

class JobItemDetails extends Component {
  state = {getJobItem: {}, apiJobItemStatus: apiJobItemConstants.initial}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiJobItemStatus: apiJobItemConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    if (response.ok === true) {
      const {job_details, similar_jobs} = data
      const updateDetails = {
        companyLogoUrl: job_details.company_logo_url,
        companyWebsiteUrl: job_details.company_website_url,
        employmentType: job_details.employment_type,
        id: job_details.id,
        jobDescription: job_details.job_description,
        lifeAtCompany: job_details.life_at_company,
        location: job_details.location,
        packagePerAnnum: job_details.package_per_annum,
        rating: job_details.rating,
        skills: job_details.skills,
        title: job_details.title,
        similarJobs: data.similar_jobs,
      }

      this.setState({
        getJobItem: updateDetails,
        apiJobItemStatus: apiJobItemConstants.success,
      })
    } else {
      this.setState({apiJobItemStatus: apiJobItemConstants.failure})
    }
  }

  renderJobItemSuccess = () => {
    const {getJobItem} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      similarJobs,
    } = getJobItem
    return (
      <div className="job-item-container">
        <div className="job-success-container">
          <div className="upper-part">
            <div className="job-url">
              <img
                src={companyLogoUrl}
                className="job-logo"
                alt="job details company logo"
              />
            </div>
            <div className="role-container">
              <h1 className="role-text">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-img" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="salaries">
            <div className="salary-container">
              <FaMapMarkerAlt className="map" />
              <p className="location">{location}</p>
              <BsFillBriefcaseFill className="map" />
              <p className="location">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="line1" />
          <div className="link-container">
            <h1 className="text">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              className="visit-link"
              rel="noreferrer"
            >
              Visit <FiExternalLink className="icon-1" />
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <h1 className="text">Skills</h1>
          <ul className="skills-list">
            {skills.map(each => (
              <Skill skillDetails={each} key={each.name} />
            ))}
          </ul>
          <h1 className="text">Life at Company</h1>
          <div className="about-company">
            <p className="description">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="company-img"
            />
          </div>
        </div>
        <div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobs.map(each => (
              <SimilarJobs key={each.id} similarDetails={each} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  renderJobItemFailure = () => (
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
      <button type="button" className="retry-btn1" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderJobItemLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetails = () => {
    const {apiJobItemStatus} = this.state
    switch (apiJobItemStatus) {
      case apiJobItemConstants.success:
        return this.renderJobItemSuccess()
      case apiJobItemConstants.failure:
        return this.renderJobItemFailure()
      case apiJobItemConstants.inProgress:
        return this.renderJobItemLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobItemDetails()}
      </>
    )
  }
}

export default JobItemDetails
