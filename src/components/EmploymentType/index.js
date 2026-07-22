import './index.css'

const EmploymentType = props => {
  const {employmentDetails, onEmploymentChange} = props
  const {employmentTypeId, label} = employmentDetails
  const onChangeEmployment = event => {
    onEmploymentChange(event.target.value, event.target.checked)
  }
  return (
    <li className='input-list'>
      <input
        className='checkbox'
        id={employmentTypeId}
        type='checkbox'
        value={employmentTypeId}
        onChange={onChangeEmployment}
      />
      <label className='label' htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentType
