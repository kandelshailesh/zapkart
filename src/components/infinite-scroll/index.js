import React from 'react'
import Select from 'react-select'
// import MultiSelect from 'react-multiple-select-dropdown';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized'

const InfiniteDropbox = ({ optionData, onChange, pageSize, value }) => {
  // console.log('dfd', optionData)

  const rowHeight = 30
  const maxListheight = pageSize * rowHeight
  const [loading, setLoading] = React.useState(false)
  const [collection, setCollection] = React.useState([])
  const [rowcount, setRowCount] = React.useState(false)

  const fetchReposByPage = async newPage => {
    const data = await optionData(pageSize, newPage)
    setLoading(false)
    setRowCount(data.count)
    setCollection(collection.concat(data.rows))
    return data
  }
  React.useEffect(() => {
    setLoading(true)
    fetchReposByPage(0)
  }, [])

  const options = collection.map(({ id, email }) => {
    return { value: id, label: email }
  })

  const loadMoreRows = ({ startIndex }) => {
    const newPage = Math.floor(startIndex / pageSize + 1)

    // console.log('jjj', newPage)

    return fetchReposByPage(newPage)
  }

  const currentListHeight = pageSize * rowHeight
  const listHeight = collection.length > currentListHeight ? maxListheight : currentListHeight

  const MenuList = ({ children, ...menuListProps }) => {
    console.log(menuListProps)
    const childrenArray = React.Children.toArray(children)

    const rowRenderer = ({ index, isScrolling, isVisible, style, ...rest }) => {
      const child = childrenArray[index]
      return (
        <div
          style={{
            borderBottom: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            ...style,
          }}
          {...rest}
        >
          {child}
        </div>
      )
    }

    return (
      <InfiniteLoader
        isRowLoaded={({ index }) => !!collection[index]}
        loadMoreRows={loadMoreRows}
        rowCount={rowcount}
        threshhold={5}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <List
                height={listHeight}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                rowCount={rowcount}
                rowHeight={rowHeight}
                rowRenderer={rowRenderer}
                width={width}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    )
  }

  return (
    <div>
      <Select
        defaultMenuIsOpen={false}
        // defaultValue={[]}
        value={value}
        isMulti
        onChange={onChange}
        isLoading={loading}
        options={options}
        components={{
          MenuList,
        }}
      />
    </div>
  )
}

export default InfiniteDropbox
