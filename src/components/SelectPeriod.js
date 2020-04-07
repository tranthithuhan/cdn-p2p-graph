import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import { PERIODS } from '../const'

const SelectPeriod = ({ onChangePeriod, selectedPeriod }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => {
    setDropdownOpen(!dropdownOpen)
  }
  const selectPeriod = period => () => {
    onChangePeriod(period)
  }

  return (
    <div className="select-period" data-testid="select-period">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret data-testid="select-period-label">
          { PERIODS[selectedPeriod].label }
        </DropdownToggle>
        <DropdownMenu>
          {
            Object.keys(PERIODS).map(period => (
              <DropdownItem
                data-testid={`select-period-${period}`}
                key={period}
                onClick={selectPeriod(period)}
              >
                { PERIODS[period].label }
              </DropdownItem>
            ))
          }
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

SelectPeriod.propTypes = {
  onChangePeriod: PropTypes.func.isRequired,
  selectedPeriod: PropTypes.string.isRequired
}

export default SelectPeriod
