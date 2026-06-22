import './index.css'
import {FaStar, FaMapMarkerAlt} from 'react-icons/fa'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const SimilarJobs = props => {
  const {similarDetails} = props
  const {
    id,
    company_logo_url,
    employment_type,
    job_description,
    location,
    rating,
    title,
  } = similarDetails
  return (
    <li className="similar-job-container">
      <div className="upper-part">
        <div className="job-url">
          <img
            src={company_logo_url}
            className="job-logo"
            alt="similar job company logo"
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
      <h1 className="text">Description</h1>
      <p className="description">{job_description}</p>
      <div className="salary-container">
        <FaMapMarkerAlt className="map" />
        <p className="location">{location}</p>
        <BsFillBriefcaseFill className="map" />
        <p className="location">{employment_type}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
