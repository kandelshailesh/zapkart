/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { Select, Spin, DatePicker, Typography, Modal, Input } from 'antd'
import Form from 'components/Form'
import { createOrderSchema } from 'utils/Schema'
import useFetching from 'hooks/useFetchingNoReducers'
import { CATALOG_API_URL } from '_constants'
import { getProducts } from 'services/products'
import getAddressByuser from 'services/address'
import AddNew from 'components/CustomComponents/AddNew'
import { isNull } from 'lodash'
import AddNewAddress from 'pages/orders-new/components/addAddress'
import Addprecriptions from 'pages/orders-new/components/Addprecriptions'
import OrderedItemsTable from 'pages/orders-new/create-new/ProductsTable'
import getPrescriptionByAdmin from 'services/orders'
import getuserCart from 'services/cart'

const styles = {
  width: {
    width: '100%',
    height: '100%',
  },
}

const COLUMN_STYLE = { width: 200 }

const CountryEditForm = ({ initialValues, onSubmit }) => {
  const [products, setProducts] = useState([])
  const [isFetchingProds, setFetchingProds] = useState(false)
  const [userID, setUserID] = useState(null)
  const [address, setAddress] = useState([])
  const [prescriptions, setPrescription] = useState([])
  const [orderItems, setorderItems] = useState([])
  const [orderSummaryInfo, setorderSummaryInfo] = useState({})
  const [isModalOpen, setModalOpen] = useState(false)
  const [total, settotal] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [DeliveryCost, setDeliveryCost] = useState(0)
  const [modalType, setModalType] = useState(null)

  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues }
    return {}
  }, [initialValues])

  const [{ response: userList }] = useFetching(`${CATALOG_API_URL.getAllUser}/?userTypeId=2`)
  // const [{ response: generalSetting }] = useFetching(CATALOG_API_URL.getGeneralSettings)

  const fetchProducts = async (value) => {
    setFetchingProds(true)
    const data = await getProducts({
      search: { name: value },
      fields: ['name', '_id', 'images', 'productPricing', 'sku', 'stock'],
    })
    // const data = await getProducts({ search: { name: value }, fields: ['name', '_id'] })
    setFetchingProds(false)
    console.log('prdocysr', data)
    if (data) setProducts(data)
  }

  const onUserSelect = (val) => {
    setUserID(val)
  }

  const setAddr = (user) => {
    getAddressByuser(user).then((value) => {
      setAddress(value)
    })
    getPrescriptionByAdmin(user).then((value) => {
      setPrescription(value?.prescriptions)
    })
    getuserCart(user).then((value) => {
      mapProducts(value?.cartlistDetails)
    })
  }

  useEffect(() => {
    if (userID) {
      setAddr(userID)
    }
  }, [userID])

  useEffect(() => {
    // if (generalSetting?.data) {
    //   const { data } = generalSetting
    //   const { shippingCost } = data
    //   let deliverycost = 0
    //   if (shippingCost) {
    //     shippingCost.forEach((element) => {
    //       if (subtotal > element.minimum && subtotal <= element.maximum) {
    //         deliverycost = element.cost
    //       }
    //     })
    //   }
    setorderSummaryInfo({
      subtotal,
      DeliveryCost: 0,
      totalAmount: subtotal + total,
    })
    // }
  }, [subtotal, DeliveryCost, total])

  const mapProducts = (val) => {
    let subtotalPrice = 0
    setorderItems(
      val?.map((i) => {
        const selected = i.product
        subtotalPrice += selected?.productPricing?.salePrice
        return {
          image:
            selected.images && selected.images && selected.images.length > 0
              ? selected.images[0].thumbnail
              : null,
          sku: selected.sku ? selected.sku : '',
          title: selected.name ? selected.name : '',
          price: {
            listPrice: selected?.productPricing?.listPrice,
            salePrice: selected?.productPricing?.salePrice,
          },
          quantity: 1,
          minOrderQty: selected.minOrderQty ? selected.minOrderQty : 1,
          prescriptionRequired: selected.prescriptionRequired
            ? selected.prescriptionRequired === 'yes'
            : false,
          maxOrderQty: selected.maxOrderQty ? selected.maxOrderQty : null,
          subtotal: selected.subtotal ? selected.subtotal : selected?.productPricing?.salePrice,
          productId: selected._id ? selected._id : '',
          id: selected._id,
          cartId: i.id,
        }
      }),
    )
    setSubtotal(subtotal + subtotalPrice)
  }

  const handleProductSelect = (val) => {
    const selected = products.find((i) => i._id === val.key)
    setorderItems((prev) => {
      return [
        ...prev,
        {
          image:
            selected.images && selected.images && selected.images.length > 0
              ? selected.images[0].thumbnail
              : null,
          sku: selected.sku ? selected.sku : '',
          title: selected.name ? selected.name : '',
          price: {
            listPrice: selected.productPricing.listPrice,
            salePrice: selected.productPricing.salePrice,
          },
          quantity: 1,
          minOrderQty: selected.minOrderQty ? selected.minOrderQty : 1,
          prescriptionRequired: selected.prescriptionRequired
            ? selected.prescriptionRequired === 'yes'
            : false,
          maxOrderQty: selected.maxOrderQty ? selected.maxOrderQty : null,
          subtotal: selected.subtotal ? selected.subtotal : selected.productPricing.salePrice,
          productId: selected._id ? selected._id : '',
          id: selected._id,
        },
      ]
    })

    setSubtotal(subtotal + selected.productPricing.salePrice)
  }

  const updateQantity = useCallback(({ value, key, id }) => {
    let effectivePrice = 0
    let lessprice = 0
    setorderItems((prev) => {
      const data = []
      prev.forEach((i) => {
        if (id === i.id) {
          console.log('match products', i, value)
          effectivePrice = i?.price?.salePrice * value
          lessprice = i?.price?.salePrice
          data.push({ ...i, quantity: value, subtotal: i?.price?.salePrice * value })
        } else {
          // effectivePrice += i?.price?.salePrice
          data.push({ ...i })
        }
      })
      console.log('htisdis page', prev)
      return data
    })
    setSubtotal(subtotal + effectivePrice - lessprice)
  })

  const handleProductDeSelect = (val) => {
    let totalAmt = 0
    const arr = []
    orderItems.forEach((element) => {
      if (element.productId !== val.key) {
        arr.push(element)
      } else {
        totalAmt += element.subtotal
      }
    })

    setorderItems(arr)

    setSubtotal(subtotal - totalAmt)

    // setorderItems(orderItems.filter((i) => i.productId !== val))
  }

  const handleAddrModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const onSubmitAddre = (val) => {
    if (val.success) {
      setModalOpen(false)
      setAddress((prev) => [...prev, { ...val.address }])
    }
  }

  const onSubmitPrescription = (val) => {
    if (val.success) {
      setModalOpen(false)
      setPrescription(val?.prescriptions)
    }
  }

  const onAddresSelect = (val, type) => {
    if (val === 'new') {
      handleAddrModal()
    }
    if (type === 'address') {
      setModalType('address')
    } else {
      setModalType('prescription')
    }
  }

  const handleSubmit = (e) => {
    const data = { ...e, cart: orderItems }
    if (onSubmit) onSubmit(data)
  }

  const handledelete = (val) => {
    let totalAmt = 0
    const arr = []
    orderItems.forEach((element) => {
      if (element.cartId !== val) {
        arr.push(element)
      } else {
        totalAmt += element.subtotal
      }
    })

    setorderItems(arr)

    setSubtotal(subtotal - totalAmt)
    // setorderItems((prev) => prev.filter((i) => i?.cartId !== val))
  }

  const formItems = [
    {
      key: 'userId',
      label: 'User',
      type: (
        <Select placeholder="Select user First" onSelect={onUserSelect}>
          {userList?.users?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {`${i.firstName} ${i.lastName} - ${i.email}`}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      type: (
        <Select
          showSearch
          mode="multiple"
          labelInValue
          placeholder="Search products"
          notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchProducts}
          style={styles.width}
          className="product-image-list-select"
          onSelect={handleProductSelect}
          onDeselect={handleProductDeSelect}
          // onPopupScroll={this.handlePopupScroll} - infinite scroll
        >
          {products.map((d) => (
            <Select.Option key={d._id} value={d._id}>
              {
                <>
                  <span className="thumbnail-area mr-3">
                    <img
                      src={d.images && d.images.length ? d.images[0].thumbnail : ''}
                      alt={d.images && d.images.length ? `Image of ${d.name}` : ''}
                    />
                  </span>
                  <Typography.Text ellipsis style={COLUMN_STYLE}>
                    {d.name}
                  </Typography.Text>
                  <Typography.Text ellipsis>
                    Sale Price - ₹{d.productPricing.salePrice}
                  </Typography.Text>
                </>
              }
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'cart',
      label: 'Products',
    },
    {
      key: 'shippingId',
      label: 'Shipping Addresss',
      type: (
        <Select
          placeholder="Select The Address First"
          onSelect={(e) => onAddresSelect(e, 'address')}
        >
          {address?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {`${i.fullName} ${i.houseNo ? `- ${i.houseNo}` : ''} ${
                i.landmark ? `- ${i.landmark}` : ''
              } ${i.city ? `- ${i.city}` : ''} ${i.state ? `- ${i.state}` : ''}`}
            </Select.Option>
          ))}
          {userID && (
            <Select.Option key="new" value="new">
              Add new Address
            </Select.Option>
          )}
        </Select>
      ),
    },
    {
      key: 'billingId',
      label: 'Billing Addresss',
      type: (
        <Select
          placeholder="Select The Address First"
          onSelect={(e) => onAddresSelect(e, 'address')}
        >
          {address?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {`${i.fullName} ${i.houseNo ? `- ${i.houseNo}` : ''} ${
                i.landmark ? `- ${i.landmark}` : ''
              } ${i.city ? `- ${i.city}` : ''} ${i.state ? `- ${i.state}` : ''}`}
            </Select.Option>
          ))}
          {userID && (
            <Select.Option key="new" value="new">
              Add new Address
            </Select.Option>
          )}
        </Select>
      ),
    },
    {
      key: 'prescriptions',
      label: 'Prescriptions',
      type: (
        <Select
          placeholder="Select The Prescriptions First"
          onSelect={(e) => onAddresSelect(e, 'prescriptions')}
        >
          {prescriptions?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              <>
                <span className="thumbnail-area">
                  <img src={i?.thumbnail || ''} alt={`Image of ${i.thumbnail}` || ''} />
                </span>
              </>
            </Select.Option>
          ))}
          {userID && (
            <Select.Option key="new" value="new">
              Add new prescriptions
            </Select.Option>
          )}
        </Select>
      ),
    },
    {
      type: <Input />,
      key: 'coupen',
      label: 'Coupen Code',
    },
  ]

  return (
    <>
      <Modal
        visible={isModalOpen}
        title="Add New Address"
        destroyOnClose
        onCancel={closeModal}
        footer={null}
      >
        {modalType === 'address' && (
          <AddNewAddress onModalFormSubmit={onSubmitAddre} isModal userId={userID} />
        )}
        {modalType === 'prescription' && (
          <Addprecriptions onModalFormSubmit={onSubmitPrescription} isModal userId={userID} />
        )}
      </Modal>
      {orderItems && (
        <OrderedItemsTable
          title="Select Products"
          // orderId={data.orderNo}
          data={orderItems}
          onEditCell={(e) => {
            updateQantity(e)
          }}
          onDelete={handledelete}
          // onAdd={onAddOrderItem}
          summary={orderSummaryInfo}
        />
      )}
      <Form
        enableReinitialize
        formItems={formItems}
        initialValues={initialVals}
        schema={createOrderSchema}
        onSubmit={handleSubmit}
        // onChange={onUserSelect}
      />
    </>
  )
}

export default CountryEditForm
