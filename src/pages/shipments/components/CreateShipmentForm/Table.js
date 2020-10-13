/* eslint-disable no-underscore-dangle */
import React, { useContext, useEffect, useState } from 'react'
import {
  Table,
  // Select
  Form,
} from 'antd'
import PlaceholderImage from 'components/PlaceholderImage'
import { FormContext } from 'components/Form'
import find from 'lodash/find'
import { calculateWeight } from 'utils'

// const styles = {
//   width: {
//     width: '100%',
//   },
// }

// const qtyLayout = {
//   labelCol: {
//     xs: 24,
//   },
//   wrapperCol: {
//     xs: 24,
//   },
// }

const ShipItemsSelTable = ({ data, isSelectable }) => {
  const [tableData, setTableData] = useState(data)

  useEffect(() => {
    setTableData(tableData)
  }, [data])

  const context = useContext(FormContext)
  const { setValues, errors } = context
  // eslint-disable-next-line react/destructuring-assignment
  // console.log('FORMDET', 'table', context)

  // table handling
  const rowSelection = isSelectable
    ? {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
          let grossWeight = 0
          const shouldCalculate = find(
            selectedRows,
            i =>
              i.product &&
              i.product.shipping &&
              i.product.shipping.weight &&
              i.product.shipping.weight,
          )
          if (shouldCalculate) {
            grossWeight = calculateWeight(
              selectedRows.map(i => ({
                weight: i.product.shipping.weight.value,
                unit: i.product.shipping.weight.unit,
                quantity: i.quantity,
              })),
              'lb',
            )
          }
          setValues(prev => ({ ...prev, selectedItems: selectedRows, grossWeight }))
        },
        getCheckboxProps: record => ({
          // disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      }
    : null

  // const onChangeQty = (index) => {
  //   return (val) => {
  //     console.log('Hellloooi', index, val)
  //     if (tableData.length > 0 && tableData[index].quantity && val.quantity) {
  //       // const selId = tableData[index].id
  //       setTableData((prev) => {
  //         prev[index].quantity = val.quantity
  //         return prev
  //       })
  //       // if (values.selectedItems){
  //       //   const m = findIndex(values.selectedItems, (i) => i.id === selId)
  //       //   if (m >0) setValues(prev => {
  //       //     prev.selectedItems[m].quantity = val.quantity
  //       //     return ({...prev})
  //       //   })
  //       // }
  //     }
  //   }
  // }

  const columns = [
    // id, title, price, qty, total, delete
    {
      title: 'Thumbnail',
      dataIndex: 'product.images',
      render: (_, record) => (
        <div className="thumbnail-area">
          <PlaceholderImage
            src={(record.product && record.product.images[0].thumbnail) || ''}
            alt={record.title}
          />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'product.name',
    },
    {
      title: 'Quantity',
      dataIndex: `quantity`,
      // render: text => {
      //   // const qty = parseInt(text, 10)
      //   const qty = parseInt(text, 10)
      //   const arr = []
      //   for (let i = 1; i < qty + 1; i += 1) {
      //     arr.push(
      //       <Select.Option key={i} value={i}>
      //         {i}
      //       </Select.Option>,
      //     )
      //   }

      //   console.log(text, parseInt(text, 10), arr.length)
      //   const selectFormItems = [
      //     {
      //       key: `quantity`,
      //       type: (
      //         <Select
      //           onChange={onChangeQty}
      //           placeholder="Select quantity"
      //           style={styles.width}
      //           defaultValue={qty}
      //         >
      //           {arr}
      //         </Select>
      //       ),
      //     },
      //   ]
      //   // return (
      //   //   <Form
      //   //     formItems={selectFormItems}
      //   //     formItemLayout={qtyLayout}
      //   //     onChange={onChangeQty(index)}
      //   //   />
      //   // )
      //   return selectFormItems[0].type
      // },
    },
    {
      title: 'Shipping charge',
      dataIndex: 'shippingCharge',
      render: () => <span>₹0</span>,
    },
  ]

  return (
    <>
      {/* since table wrapped in formitem; if any error; all input elements selected */}
      <Form.Item validateStatus={errors.selectedItems && 'error'} help={errors.selectedItems}>
        <Table
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          scroll={{ x: '100%' }}
          dataSource={data}
          columns={columns}
          rowKey={record => record.id}
        />
      </Form.Item>
    </>
  )
}

export default ShipItemsSelTable
