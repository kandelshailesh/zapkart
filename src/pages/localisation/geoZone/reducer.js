/* eslint-disable no-underscore-dangle */
import findIndex from 'lodash/findIndex'
import qs from 'qs'

const initialState = {
  current: 1,
  pageSize: 20,
  total: 0,
  filters: {},
  sorters: {},
  statusClickedId: null,
  data: [],
  sortQuery: '',
  searchQuery: '',
  categories: [],
  selectedRowKeys: [],
}

function reducer(state, action) {
  switch (action.type) {
    case 'setCurrentPage':
      return { ...state, current: action.payload }
    case 'setPageSize':
      return { ...state, pageSize: action.payload }
    case 'setTotal':
      return { ...state, total: action.payload }
    case 'setStatusClickedId':
      return { ...state, statusClickedId: action.payload }
    case 'clearStatusClickedId':
      return { ...state, statusClickedId: null }
    case 'setSorters':
      if (action.payload.sortField && action.payload.sortOrder)
        return {
          ...state,
          sorters: {
            sortField: action.payload.sortField,
            sortOrder: action.payload.sortOrder,
          },
          sortQuery: qs.stringify({
            sort: { [action.payload.sortField]: action.payload.sortOrder },
          }),
        }
      return { ...state }
    case 'clearSorters':
      return { ...state, sortQuery: '', sorters: {} }
    case 'setData':
      return { ...state, data: action.payload }
    case 'updateClickedProdStatus': {
      // const { id, status } = action.payload
      if (state.statusClickedId) {
        const index = findIndex(state.data, (i) => i._id === state.statusClickedId)
        if (index > -1) state.data[index].status = action.payload
        return { ...state, statusClickedId: null }
      }
      // break
      return { ...state }
    }
    case 'deleteItem': {
      const id = action.payload
      const data = state.data.filter((i) => i._id !== id)
      return { ...state, data }
    }
    case 'setSearchers':
      return {
        ...state,
        search: action.payload,
        searchQuery: qs.stringify({ search: action.payload }),
      }
    case 'setFilters': {
      console.log('setFilters reducer', action.payload)
      return {
        ...state,
        filterQuery: qs.stringify(action.payload),
      }
    }
    case 'clearData':
      return { ...state, data: [] }
    case 'setCategories':
      return { ...state, categories: action.payload }
    case 'clearPagination':
      return {
        ...state,
        current: initialState.current,
        pageSize: initialState.pageSize,
        total: initialState.total,
      }
    default: {
      let newState = {}
      if (action.payload) newState = { ...action.payload }
      return { ...state, ...newState }
    }
  }
}

export { reducer, initialState }
