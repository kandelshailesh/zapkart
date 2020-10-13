import React from 'react'
import SearchAndFilters from 'components/SearchAndFilters'
import isEmpty from 'lodash/isEmpty'
import startsWith from 'lodash/startsWith'

/**
 * @param {array} data table data
 * @param {array} columns columns with search (boolean) and filters array
 * @param {boolean} columns[].search for search params
 * @param {array} columns[].filters columns with search (boolean) and filters array
 */
class FilterProvider extends React.Component {
  state = {
    data: [],
    tableData: [],
  }

  componentDidMount() {
    const { data } = this.props
    console.log('componentdidmount data', data)
    this.setState({
      data,
      tableData: data,
    })
  }

  componentDidUpdate({ data: prevData }) {
    const { data: currentData } = this.props
    if (prevData !== currentData) this.updateTableData()
  }

  updateTableData = () => {
    const { data } = this.props
    this.setState({
      data,
      tableData: data,
    })
  }

  handleFilters = a => {
    console.log(a)
    if (isEmpty(a.search) && isEmpty(a.filters)) return this.resetData()
    this.setState(prev => {
      let filteredData = []
      if (!isEmpty(a.filters))
        Object.entries(a.filters).forEach(([key, value]) => {
          filteredData = prev.data.filter(i => i[key] === value)
        })
      if (!isEmpty(a.search))
        Object.entries(a.search).forEach(([key, value]) => {
          filteredData = (filteredData.length > 0 ? filteredData : prev.data).filter(i => {
            console.log(i[key].toLowerCase(), value.toLowerCase())
            return startsWith(i[key].toLowerCase(), value.toLowerCase())
          })
        })

      return {
        ...prev,
        tableData: filteredData,
      }
    })
    return null
  }

  resetData = () => {
    this.setState(prev => ({
      ...prev,
      tableData: prev.data,
    }))
  }

  render() {
    const { loading, columns, children } = this.props
    const { tableData } = this.state
    return (
      <>
        <SearchAndFilters
          onCancel={this.resetData}
          onSubmit={this.handleFilters}
          attributes={columns}
          loading={loading}
        />
        {children(tableData)}
      </>
    )
  }
}

export default FilterProvider
