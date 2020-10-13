/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState, useEffect } from 'react'
import {
  Input,
  Radio,
  InputNumber,
  Select,
  Button,
  Modal,
  notification,
  Popconfirm,
  Empty,
} from 'antd'
import Form from 'components/Form'
import { WidgetTypeSchema } from 'utils/Schema'
import { Link } from 'react-router-dom'
import Table from 'components/Table'
// import useFetching from 'hooks/useFetchingNoReducers'
// import { CATALOG_API_URL } from '_constants'
import { STRINGS } from '_constants'
import { editData } from 'services'
import { isEmpty } from 'lodash'
import Editor from 'components/Editor'
import TextArea from 'antd/lib/input/TextArea'
import FormItem from 'antd/lib/form/FormItem'
import AddList from './ListingTypes'
import SortTable from './SortTable'

const listingType = [
  {
    key: 'brands',
    label: 'brands',
  },
  {
    key: 'banner',
    label: 'banner',
  },
  {
    key: 'category',
    label: 'categories',
  },
  {
    key: 'products',
    label: 'Products',
  },
  {
    key: 'static',
    label: 'Static',
  },
]

const CountryEditForm = ({ initialValues, onSuccess, removeVariant }) => {
  const [ListType, setType] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const [typeList, setTypeList] = useState([])
  const [widgetTabID, setID] = useState(null)
  const [widgetID, setWidgetID] = useState(null)
  const [finalTypeList, setFinalTypeList] = useState([])
  const [editorvalue, setEditorValue] = useState(null)

  const initialVals = useMemo(() => {
    const { id, typeDetails, widget } = initialValues
    if (id) setID(id)
    if (widget) setWidgetID(widget)
    if (typeDetails && typeDetails.length > 0) {
      if (initialValues.listingType === 'static') {
        return { ...initialValues, static: typeDetails[0] }
      }
      const dt = typeDetails?.map((element) => ({
        title: element.name,
        image: element?.image ? element?.image[0]?.thumbnail : element?.images[0]?.thumbnail,
        key: element._id,
      }))
      setTypeList(dt)
    }
    return { ...initialValues }
  }, [initialValues])

  const mapFinalList = (array) => {
    return array?.map((element) => ({
      title: element?.name,
      image: element?.image ? element?.image[0]?.thumbnail : element?.images[0]?.thumbnail,
      key: element?._id,
    }))
  }

  const handleSortedItems = (items) => {
    setFinalTypeList(items)
  }

  const handleOnSubmit = async (submit) => {
    try {
      const dt = {}
      if (submit.listingType === 'static') {
        dt.widget = widgetID

        Object.keys(submit).forEach((key) => {
          if (key && key !== 'static') {
            dt[key] = submit[key]
          }
          if (key === 'static') {
            dt.typeDetails = [submit[key]]
          }
        })
      } else {
        if (finalTypeList.length < 7) {
          if (submit.listingType !== 'banner') throw `Please Add Atlest 7 ${submit.listingType}`

          // throw `Please Add Atlest 7 ${submit.listingType}`
        }

        dt.typeDetails = finalTypeList.map((i, index) => {
          if (typeof i === 'string') {
            return i
          }
          return i.key
        })

        dt.widget = widgetID

        Object.keys(submit).forEach((key) => {
          if (key && key !== 'typeDetails') {
            dt[key] = submit[key]
          }
        })
      }

      if (widgetTabID) {
        const url = `/api/catalog/v1/widgetTab/${widgetTabID}`
        await submitData(url, dt)
        removeVariant()
      } else {
        const url = `/api/catalog/v1/widgetTab/create`
        await submitData(url, dt, 'POST')
        removeVariant()
      }
    } catch (error) {
      notification.error({
        message: STRINGS.editError,
        description: error,
      })
    }
  }

  const submitData = async (url, values, method = 'PATCH') => {
    const res = await editData(url, values, 'json', method)
    if (res?.success) {
      notification.success({
        message: STRINGS.success,
        description: widgetTabID ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      // history.go(-1)
    }
    if (res?.error)
      notification.error({
        message: STRINGS.editError,
        description: res.error,
      })
  }

  const handleSelect = (val) => {
    setType(val)
    setTypeList([])
    setFinalTypeList([])
    if (val === 'static') {
      formItems.push({
        type: <Input />,
        key: 'data',
        label: 'Tab Title',
      })
    }
  }

  const handleModal = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleOnAdd = (list) => {
    const dt = mapFinalList(list)
    setTypeList([...dt, ...typeList])
    setOpen(false)
  }

  const handleRemoveItem = (key) => {
    const dt = typeList.filter((i) => i.key !== key)
    setTypeList(dt)
    setFinalTypeList(dt)
  }

  const formItems = [
    {
      type: <Input />,
      key: 'title',
      label: 'Tab Title',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button key="yes" value={true}>
            yes
          </Radio.Button>
          <Radio.Button key="no" value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'showTitle',
      label: 'Show Title',
    },
    {
      type: <InputNumber type="priorityOrder" min={0} />,
      key: 'priorityOrder',
      label: 'Priority Order',
    },
    {
      type: <InputNumber type="number" min={0} />,
      key: 'numberOfItems',
      label: 'Number Of Items',
    },

    {
      type: (
        <Select placeholder="Select Listing Type First" onSelect={handleSelect}>
          {listingType?.map((i) => (
            <Select.Option key={i.key} value={i.key}>
              {`${i.label}`}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'listingType',
      label: 'Listing Tpye',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="active" value="active">
            Active
          </Radio.Button>
          <Radio.Button key="hold" value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
    },
  ]

  const col = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <div className="thumbnail-area">
          <img src={record.image ? record.image : ''} alt="" />
        </div>
      ),
    },
    {
      title: 'title',
      dataIndex: 'title',
      className: 'drag-visible',
    },
    {
      title: 'Action',
      render: (_, record) => (
        <span>
          <Button icon="close" size="small" onClick={() => handleRemoveItem(record.key)} />
        </span>
      ),
    },
  ]

  const staticItem = [
    {
      key: 'static',
      label: 'Static',
      type: (
        <TextArea
          onChange={(val, name) => {}}
          placeholder="Write something..."
          // editorHtml={item.data || ''}
        />
      ),
    },
  ]
  return (
    <>
      <Modal
        onOk={() => setOpen(false)}
        visible={isOpen}
        onCancel={handleClose}
        footer={null}
        destroyOnClose
      >
        <AddList
          onAdd={handleOnAdd}
          onCancel={handleClose}
          listType={ListType || initialVals.listingType}
        />
      </Modal>
      <Form.Provider
        // enableReinitialize
        // formItems={formItems}
        initialValues={initialVals}
        schema={WidgetTypeSchema}
        onSubmit={handleOnSubmit}
      >
        <Form.Consumer>
          {({ onSubmit, isSubmitting }) => {
            return (
              <>
                <Form schema={WidgetTypeSchema} formItems={formItems} />
                {(ListType || initialVals.listingType) === 'static' ? (
                  <Form schema={WidgetTypeSchema} formItems={staticItem} />
                ) : (
                  <div className="row py-5">
                    <div className="col-lg-10 offset-2 mb-4">
                      <Button type="primary" onClick={handleModal}>
                        {`Add ${ListType || initialVals.listingType}`}{' '}
                      </Button>
                    </div>
                    <div className="col-lg-12">
                      {typeList.length > 0 && (
                        <SortTable data={typeList} columns={col} sortedItems={handleSortedItems} />
                      )}
                    </div>
                  </div>
                )}

                <div className="row py-5">
                  <div className="col-lg-12 mx-auto">
                    <Button
                      className="mr-4"
                      onClick={onSubmit}
                      disabled={isSubmitting}
                      type="primary"
                    >
                      Submit
                    </Button>

                    <Link to="/catalog/products">
                      <Button type="dashed">Cancel</Button>
                    </Link>
                  </div>
                </div>
              </>
            )
          }}
        </Form.Consumer>
      </Form.Provider>
    </>
  )
}

export default CountryEditForm
