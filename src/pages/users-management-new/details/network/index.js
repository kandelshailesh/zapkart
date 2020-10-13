import React from 'react'
import SortableTree from 'react-sortable-tree'
import 'react-sortable-tree/style.css' // This only needs to be imported once in your app
import { CATALOG_API_URL } from '_constants'
import useFetching from 'hooks/useFetching'

const Network = ({ userID }) => {
  const [treeData, settreeData] = React.useState([])
  const [{ response }] = useFetching(`${CATALOG_API_URL.getNetwork}/${userID}`)

  React.useEffect(() => {
    if (response?.data) {
      const newArr = mapData(response.data)
      settreeData(newArr)
    }
  }, [response])

  const mapData = (data) => {
    return data.map((i) => {
      let newarr = []
      if (i.underChiledUsers && i.underChiledUsers.length > 0) {
        console.log('jhkas', i.underChiledUsers)
        // mapData(i.underChiledUsers)
        newarr = i.underChiledUsers.map((child) => {
          return {
            title: child?.email || child?.firstName,
            expanded: true,
          }
        })
      }
      return {
        title: i?.chiledUser?.email || i?.chiledUser?.firstName,
        expanded: true,
        children: newarr,
      }
    })
  }

  const returnMap = (node, oldtree) => {
    return node.map((element, index) => {
      if (element?.children && element.children.length > 0) {
        if (element.children.length === oldtree[index].length)
          returnMap(element.children, oldtree[index])
      }
      return { ...oldtree[index], expanded: element.expanded ? element.expanded : false }
    })
  }

  const handlechage = (node) => {
    if (node.length === treeData.length) {
      const temp = returnMap(node, treeData)
      settreeData(temp)
    }
  }
  return (
    <div style={{ height: 400 }}>
      <SortableTree
        // eslint-disable-next-line react/destructuring-assignment
        treeData={treeData}
        onChange={handlechage}
      />
    </div>
  )
}
export default Network
