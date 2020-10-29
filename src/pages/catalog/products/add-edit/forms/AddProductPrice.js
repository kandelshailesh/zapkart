/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { notification, InputNumber, Select, Spin, Button, Icon } from 'antd'
import useFetching from 'hooks/useFetching'
import { CATALOG_API_URL, STRINGS } from '_constants'
import { getProducts } from 'services/products'
import { addProductPriceByMerchant, updateProductPriceByMerchant } from 'services/priceList'
import Form from 'components/Form'
import { productPriceSchema } from 'utils/Schema'
import DescriptionList from 'components/DescriptionList'
import { deleteData } from 'services'

// const menuItems = [
//   {
//     key: 'active',
//     title: 'Active',
//   },
//   {
//     key: 'hold',
//     title: 'Hold',
//   },
// ]

const Countries = ({ productID, onSuccess }) => {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [products, setProducts] = useState([])
  const [isFetchingProds, setFetchingProds] = useState(false)
  const [values, setValues] = useState({})
  const [data, setData] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const [{ response, loading, error }] = useFetching(
    `${CATALOG_API_URL.getProductPriceList}?productId=${productID}&approveStatus=pending&status=hold`,
  )

  useEffect(() => {
    if (response && response?.price && response.price.length > 0) {
      const {
        merchentId,
        merchentName,
        price,
        quantity,
        status,
        approveStatus,
        commission,
        productId,
      } = response.price[0]
      const { name } = productId
      setData({
        merchentId,
        merchentName,
        name,
        price,
        quantity,
        status,
        approveStatus,
        commission,
      })
    }
  }, [response, loading, error])

  // const onSelectChange = sRkeys => {
  //   console.log('selectedRowKeys changed: ', sRkeys)
  //   setSelectedRowKeys(sRkeys)
  // }

  // const handleDelete = (id) => {
  //   return async () => {
  //     const isDeleted = await deleteData(`${URL}/${id}`)
  //     if (isDeleted) {
  //       dispatch({
  //         type: 'deleteItem',
  //         payload: id,
  //       })
  //     }
  //   }
  // }

  // const handleStatusClick = React.useCallback((id) => {
  //   dispatch({
  //     type: 'setStatusClickedId',
  //     payload: id,
  //   })
  // }, [])

  const fetchProducts = async (value) => {
    setFetchingProds(true)
    const data = await getProducts({ search: { name: value }, fields: ['name', '_id'] })
    setFetchingProds(false)
    if (data) setProducts(data)
  }

  const handleSubmit = async (val) => {
    const succcess = !isEdit
      ? await addProductPriceByMerchant(val)
      : await updateProductPriceByMerchant(val)
    if (succcess) {
      if (onSuccess) onSuccess()
      notification.success({
        message: STRINGS.success,
        description: isEdit ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
    }
  }

  const handleDelete = async (id) => {
    const succcess = await deleteData(`${CATALOG_API_URL.deletePriceByMerchant}/${id}`)
    if (succcess) {
      if (onSuccess) onSuccess()
    }
  }

  // const columns = [
  //
  //   {
  //     title: 'merchentId',
  //     dataIndex: 'merchentId',
  //     key: 'merchentId',
  //     render: (text) => `${text}`,
  //   },
  //   {
  //     title: 'Merchent Name',
  //     dataIndex: 'merchentName',
  //     key: 'merchentName',
  //   },
  //   {
  //     title: 'Price',
  //     dataIndex: 'price',
  //     key: 'price',
  //   },

  //   {
  //     title: 'Quantity',
  //     dataIndex: 'quantity',
  //     key: 'quantity',
  //   },
  //   {
  //     title: 'Commission',
  //     dataIndex: 'commission',
  //     key: 'commission',
  //   },
  //   {
  //     title: 'Approve Status',
  //     dataIndex: 'approveStatus',
  //     key: 'approveStatus',
  //     render: (text, record) => {
  //       let badge = 'badge-success'
  //       if (record.approveStatus === 'pending') badge = 'badge-danger'
  //       return (
  //         <span className={`font-size-12 badge ${badge} 'badgeText'`}>{text.toUpperCase()}</span>
  //       )
  //     },
  //   },

  //   {
  //     title: 'Status',
  //     dataIndex: 'status',
  //     key: 'status',
  //     render: (text, record) => {
  //       let badge = 'badge-success'
  //       if (record.status === 'hold') badge = 'badge-danger'
  //       return (
  //         <span className={`font-size-12 badge ${badge} 'badgeText'`}>{text.toUpperCase()}</span>
  //       )
  //     },
  //   },
  //   // {
  //   //   title: 'Action',
  //   //   key: 'action',
  //   //   render: (record) => (
  //   //     <span>
  //   //       <Link to={`/localisation/countries/edit/${record._id}`}>
  //   //         <Button icon="edit" className="mr-1" size="small" />
  //   //       </Link>
  //   //       {state.data.length >= 1 ? (
  //   //         <Popconfirm title="Sure to delete?" onConfirm={handleDelete(record._id)}>
  //   //           <Button icon="close" size="small" />
  //   //         </Popconfirm>
  //   //       ) : null}
  //   //     </span>
  //   //   ),
  //   // },
  // ]

  const formItems = [
    {
      key: 'productId',
      label: 'Product ID',
      name: 'productId',
      type: (
        <Select
          mode="multiple"
          // labelInValue
          value={values.productId}
          placeholder="Search products"
          notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchProducts}
          onChange={(a) => setValues((prev) => ({ ...prev, productId: a }))}
          style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
          disabled={!!isEdit}
        >
          {products.map((d) => (
            <Select.Option key={d._id} value={d._id}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      key: 'price',
      label: 'price',
      name: 'price',
      type: <InputNumber type="number" min={0} />,
    },
    {
      key: 'quantity',
      label: 'Quantity',
      name: 'quantity',
      type: <InputNumber type="number" min={0} />,
    },
    {
      key: 'commission',
      label: 'Commission',
      name: 'commission',
      type: <InputNumber type="number" min={0} />,
    },
  ]

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Pricing List</strong>
            <div className="pull-right">
              {response?.price.length > 0 && (
                <Button.Group>
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsEdit(!isEdit)
                    }}
                  >
                    <Icon type="edit" />
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => {
                      handleDelete(response?.price[0]._id)
                    }}
                  >
                    <Icon type="delete" />
                  </Button>
                </Button.Group>
              )}
            </div>
          </div>
        </div>
        <div className="card-body">
          {!isEdit && !loading && response?.price && response.price.length > 0 && (
            <DescriptionList title="Product Price" data={data} />
          )}
          {(isEdit || (!loading && response?.price && response.price.length === 0)) && (
            <Form
              onSubmit={handleSubmit}
              initialValues={{ ...response?.price[0], productId: [`${productID}`] }}
              formItems={formItems}
              schema={productPriceSchema}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Countries
