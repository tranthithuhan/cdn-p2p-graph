import moment from 'moment'
export const BACKEND_LINK = 'http://localhost:3000'

export const LOCAL_STORAGE_SESSION_NAME = 'str-token'

export const LOGIN_PATH = '/login'
export const HOME_PATH = '/'

export const DEFAULT_PERIOD = 'SI'
const NOW = new Date()

export const PERIODS = {
  WEEK: {
    label: 'Last week',
    periods: {
      from: new Date(NOW.setDate(NOW.getDate() - NOW.getDay())),
      to: new Date(NOW.setDate(NOW.getDate() - NOW.getDay() + 6))
    }
  },
  MONTH: {
    label: 'Last month',
    periods: {
      from: new Date(NOW.getFullYear(), NOW.getMonth() - 1, 1),
      to: new Date(NOW.getFullYear(), NOW.getMonth(), 0)
    }
  },
  YEAR: {
    label: 'Last year',
    periods: {
      from: new Date(NOW.getFullYear() - 1, 0, 1),
      to: new Date(NOW.getFullYear() - 1, 11, 31)
    }
  },
  SI: {
    label: 'Since inception',
    periods: {
      from: moment().subtract(10, 'year').toDate(),
      to: NOW
    }
  }
}

export const EMPTY_ARRAY = []
export const EMPTY_OBJECT = {}
