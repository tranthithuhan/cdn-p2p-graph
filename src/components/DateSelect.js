import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const DateSelect = ({ defaultDate, onDateChange, name }) => {
  const [selectedDate, setSelectedDate] = useState(defaultDate)

  const handleSelectDate = e => {
    const newDate = e.target.value
    setSelectedDate(newDate)
    onDateChange && onDateChange(name)(newDate)
  }

  useEffect(() => {
    const newDate = moment(new Date(defaultDate)).format('Y-MM-DD')
    setSelectedDate(newDate)
  }, [defaultDate])

  return <input type="date" value={selectedDate} onChange={handleSelectDate} data-testid="datepicker" />
}

DateSelect.propTypes = {
  name: PropTypes.string.isRequired,
  defaultDate: PropTypes.number.isRequired,
  onDateChange: PropTypes.func.isRequired
}


export default DateSelect
