import './index.css'

const Skill = props => {
  const {skillDetails} = props

  const skills1 = {
    imageUrl: skillDetails.image_url,
    name: skillDetails.name,
  }
  const {imageUrl, name} = skills1
  return (
    <li className="skill-list-item">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skill
