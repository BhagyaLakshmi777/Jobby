import './index.css'

const SalaryRange = props => {
  const {salaryDetails, onSalaryChange} = props
  const {salaryRangeId, label} = salaryDetails
  const onChangeSalary = () => {
    onSalaryChange(salaryRangeId)
  }

  return (
    <li className="input-list">
      <input
        type="radio"
        className="radio-btn"
        name="salary"
        id={salaryRangeId}
        value={salaryRangeId}
        onChange={onChangeSalary}
      />
      <label className="label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
