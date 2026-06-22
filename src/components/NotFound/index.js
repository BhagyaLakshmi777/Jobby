import './index.css'

const NotFound = () => (
  <div className="failure-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not Found"
      className="failure-img"
    />
    <h1 className="failure-heading">Page Not Found</h1>
    <p className="failure-text">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
