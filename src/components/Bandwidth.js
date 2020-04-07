import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'

import { getAudience, getBandwidthDatas } from '../reducers/bandwidth'
import SelectPeriod from './SelectPeriod'
import { DEFAULT_PERIOD, PERIODS } from '../const'
import DateSelect from './DateSelect'
import BandwidthChart from './BandwidthChart'

const Bandwidth = () => {
  const dispatch = useDispatch()

  const [selectedPeriod, setPeriod] = useState(DEFAULT_PERIOD)
  const [minDate, setMinDate] = useState(PERIODS[DEFAULT_PERIOD].periods.from.getTime())
  const [maxDate, setMaxDate] = useState(PERIODS[DEFAULT_PERIOD].periods.to.getTime())

  const handleChangePeriod = period => {
    const newPeriodRange = PERIODS[period].periods
    setPeriod(period)
    setMinDate(newPeriodRange.from.getTime())
    setMaxDate(newPeriodRange.to.getTime())
  }

  const periodRange = PERIODS[selectedPeriod].periods

  useEffect(() => {
    dispatch(getBandwidthDatas(periodRange.from.getTime(), periodRange.to.getTime()))
    dispatch(getAudience(periodRange.from.getTime(), periodRange.to.getTime()))
  }, [selectedPeriod])

  const handleDateChange = name => value => {
    const newDate = new Date(value).getTime()

    const updateDateActions = {
      minDate: () => {
        setMinDate(newDate)
      },
      maxDate: () => {
        setMaxDate(newDate)
      }
    }
    const actions = updateDateActions[name]
    actions()
  }


  return (
    <Container className="bandwidth mb-5" data-testid="bandwidth" fluid>
      <Row>
        <Col>
          <SelectPeriod selectedPeriod={selectedPeriod} onChangePeriod={handleChangePeriod} />
        </Col>
      </Row>

      <Row className="d-flex align-items-end">
        <Col>
          <DateSelect defaultDate={minDate} onDateChange={handleDateChange} name="minDate" />
        </Col>
        <Col sm="8">
          <BandwidthChart minDate={minDate} maxDate={maxDate} onRangeChange={handleDateChange} />
        </Col>
        <Col>
          <DateSelect defaultDate={maxDate} onDateChange={handleDateChange} name="maxDate" />
        </Col>
      </Row>
    </Container>
  )
}

export default Bandwidth
