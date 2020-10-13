/* eslint-disable no-underscore-dangle */
import React, { useReducer } from 'react'
import Form from 'components/Form'
import { Select, InputNumber, Spin } from 'antd'
import { orderItemSchema } from 'utils/Schema'
import { getProducts } from 'services/products'
import find from 'lodash/find'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },

    // lg: { span: 18 },
  },
}

const styles = {
  width: {
    width: '100%',
    height: '100%',
  },
}

const initialValues = {
  isFetching: false,
  products: [],
  minOrderQty: 1,
  maxOrderQty: undefined,
}

function reducer(state, action) {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload }
    case 'setProducts':
      return { ...state, products: action.payload }
    case 'setState':
      return { ...state, ...action.payload }
    default:
      return { ...state }
  }
}

const OrderAddressForm = ({ onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialValues)

  const { isFetching, products } = state

  const fetchProducts = async value => {
    dispatch({ type: 'setFetching', payload: true })
    const data = await getProducts({
      search: { name: value },
      fields: ['name', '_id', 'images', 'minOrderQty', 'maxOrderQty'],
    })
    dispatch({ type: 'setFetching', payload: false })
    if (data) dispatch({ type: 'setProducts', payload: data })
  }

  const handleSubmit = values => {
    onSubmit(values)
  }

  const onChange = values => {
    console.log('onChange', values)
    if (values.productId) {
      const product = find(products, i => i._id === values.productId)
      console.log('selected product', product)
      if (product)
        dispatch({
          type: 'setState',
          payload: {
            minOrderQty: product.minOrderQty,
            maxOrderQty: product.maxOrderQty,
          },
        })
    }
  }

  const formItems = [
    {
      type: (
        <Select
          showSearch
          placeholder="Search products"
          notFoundContent={isFetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchProducts}
          style={styles.width}
          className="product-image-list-select"
          // onPopupScroll={this.handlePopupScroll} - infinite scroll
        >
          {products.map(d => (
            <Select.Option key={d._id} value={d._id}>
              {
                <div>
                  <span className="thumbnail-area mr-3">
                    <img
                      src={d.images && d.images.length ? d.images[0].thumbnail : ''}
                      alt={d.images && d.images.length ? `Image of ${d.name}` : ''}
                    />
                  </span>
                  {d.name}
                </div>
              }
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'productId',
      label: 'Product',
    },
    {
      type: <InputNumber name="quantity" min={state.minOrderQty} max={state.maxOrderQty} />,
      key: 'quantity',
      label: 'Quantity',
    },
  ]
  return (
    <Form
      formItemLayout={formItemLayout}
      formItems={formItems}
      onSubmit={handleSubmit}
      schema={orderItemSchema}
      onChange={onChange}
    />
  )
}

export default OrderAddressForm
