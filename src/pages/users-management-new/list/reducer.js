import qs from 'qs'
import findIndex from 'lodash/findIndex'

const initialState = {
  refresh: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  searchQuery: '',
  sortQuery: '',
  users: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'refreshData':
      return { ...state, refresh: !state.refresh }
    case 'setCurrentPage':
      return { ...state, pagination: { ...state.pagination, current: Number(action.payload) } }
    case 'setPageSize':
      return { ...state, pagination: { ...state.pagination, pageSize: Number(action.payload) } }
    case 'setTotal': {
      console.log('total data', action.payload)
      return { ...state, pagination: { ...state.pagination, total: Number(action.payload) } }
    }
    case 'setUsers':
      return { ...state, users: action.payload }
    case 'setSorters':
      return { ...state, sort: action.payload, sortQuery: qs.stringify({ sort: action.payload }) }
    case 'setSearchers':
      return {
        ...state,
        search: action.payload,
        searchQuery: qs.stringify({ search: action.payload }),
      }
    case 'updateClickedStatus': {
      const index = findIndex(state.users, i => {
        return i.id === action.payload.id
      })
      let { value } = action.payload
      if (value === '0') value = 0
      if (value === '1') value = 1

      if (index > -1) {
        const { users } = state

        users[index][action.payload.key] = value

        return { ...state, users }
      }
      return { ...state }
    }

    default:
      return { ...state }
  }
}

export { initialState, reducer }
