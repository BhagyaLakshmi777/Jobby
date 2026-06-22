import './index.css'

const Skill = props => {
  const {skillDetails} = props
  const {image_url, name} = skillDetails
  return (
    <li className="skill-list-item">
      <img src={image_url} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skill
