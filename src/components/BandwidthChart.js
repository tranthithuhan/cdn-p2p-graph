import React, { useEffect, useState, useRef } from 'react'
import { Spinner } from 'reactstrap'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import get from 'lodash/get'

import { getPlotLine, getReadableFileSizeString } from '../utils'
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../const'

const BandwidthChart = props => {
  const bandwidth = useSelector(state => state.bandwidth.bandwidth) || EMPTY_OBJECT
  const audience = useSelector(state => state.bandwidth.audience.data.audience) || EMPTY_ARRAY
  const loading = useSelector(state => state.bandwidth.loading)

  const bandwidthChart = useRef(null)

  const [minDate, setMinDate] = useState()
  const [maxDate, setMaxDate] = useState()

  const maxCdn = get(bandwidth, 'max.cdn', 0)
  const maxThroughput = maxCdn + get(bandwidth, 'max.p2p', 0)

  const handleRangeChange = (min, max) => {
    if (min !== minDate) {
      setMinDate(min)
      props.onRangeChange('minDate')(min)
    }
    if (max !== maxDate) {
      setMaxDate(max)
      props.onRangeChange('maxDate')(max)
    }
  }

  useEffect(() => {
    const { chart } = bandwidthChart.current

    if (maxDate && minDate) {
      chart.xAxis.forEach(axis => {
        const newMax = axis.dataMax < props.maxDate ? axis.dataMax : props.maxDate
        const newMin = axis.dataMin > props.minDate ? axis.dataMin : props.minDate
        axis.setExtremes(newMin, newMax)
        chart.redraw()
      })
    }
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.minDate, props.maxDate])

  const series = [
    {
      id: 'cdn',
      type: 'area',
      data: [...(bandwidth.data.cdn || EMPTY_ARRAY)],
      name: 'HTTP',
      color: '#C42151',
      yAxis: 0,
      zIndex: 1
    },
    {
      id: 'p2p',
      type: 'area',
      data: [...(bandwidth.data.p2p || EMPTY_ARRAY)],
      name: 'P2P',
      color: '#12A5ED',
      yAxis: 0,
      zIndex: 0
    },
    {
      id: 'viewers',
      type: 'area',
      data: [...audience],
      name: 'Viewers',
      color: '#DDA02A',
      yAxis: 1
    }
  ]

  const chartConfig = {
    width: '100%',
    navigator: {
      xAxis: {
        ordinal: false
      }
    },
    stockTools: {
      gui: {
        enabled: false
      }
    },
    rangeSelector: {
      enabled: false
    },
    tooltip: {
      formatter () {
        // eslint-disable-next-line react/no-this-in-sfc
        return this.points.reduce((s, point) => {
          if (point.series.userOptions.id === 'viewers') return `${s}`

          return `${s}<br><b style="color: ${point.series.color}">${point.series.name}: </b>${getReadableFileSizeString(point.y)}`
        },
        // eslint-disable-next-line react/no-this-in-sfc
        `<b>${new Date(this.x).toLocaleString()}</b>`)
      },
      shared: true,
      headerFormat: '<small>{point.key}</small><table>'
    },
    xAxis: [
      {
        ordinal: false,
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e %b %Y'
        },
        events: {
          afterSetExtremes: e => {
            // eslint-disable-next-line no-unused-expressions
            !minDate && setMinDate(e.min)
            // eslint-disable-next-line no-unused-expressions
            !maxDate && setMaxDate(e.max)
            if (e.trigger === 'navigator') {
              // Update range
              handleRangeChange(e.min, e.max)
            }
          }
        }
      }
    ],
    yAxis: [
      {
        opposite: false,
        title: {
          text: 'CAPACITY OFFLOAD'
        },
        max: maxThroughput,
        labels: {
          align: 'right',
          formatter () {
            // eslint-disable-next-line react/no-this-in-sfc
            return getReadableFileSizeString(this.value)
          }
        },
        plotLines: [
          getPlotLine('#1D874D', maxThroughput),
          getPlotLine('#C42151', maxCdn)
        ],
        height: '70%'
      },
      {
        opposite: false,
        offset: 1,
        top: '70%',
        height: '30%',
        title: {
          text: 'CONCURRENT VIEWERS'
        },
        labels: {
          align: 'right',
          formatter () {
            // eslint-disable-next-line react/no-this-in-sfc
            return this.value
          }
        }
      }
    ],
    credits: {
      enabled: false
    },
    series
  }

  if (loading) return <div ref={bandwidthChart} data-testid="spinner"><Spinner type="grow" /></div>

  return (
    <div data-testid="bandwidth-chart">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartConfig}
        constructorType="stockChart"
        ref={bandwidthChart}
        containerProps={{ className: 'bandwidth-chart' }}
      />
    </div>
  )
}
BandwidthChart.propTypes = {
  minDate: PropTypes.number.isRequired,
  maxDate: PropTypes.number.isRequired,
  onRangeChange: PropTypes.func.isRequired
}

export default BandwidthChart
