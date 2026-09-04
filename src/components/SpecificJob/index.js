import './index.css'
import {Link} from 'react-router-dom'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'

import {BsFillBriefcaseFill} from 'react-icons/bs'

const SpecificJob = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    rating,
    companyLogoUrl,
    location,
    employmentType,
    jobDescription,
    packagePerAnnum,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="specific-job-link">
      <div className="specific-job-container">
        <div className="upper-part">
          <div className="job-url">
            <img src={companyLogoUrl} alt="company logo" className="job-logo" />
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
        <h1 className="text">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default SpecificJob
