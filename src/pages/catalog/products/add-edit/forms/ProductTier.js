import React, { useEffect } from 'react'
import {
  Button,
  Form, // Input,Upload,
  Select,
  Row,
  Col,
  InputNumber,
} from 'antd'
// import _uniqueId from 'lodash/uniqueId'
// import _ from 'lodash'

import { generateKey } from 'utils'

// import useUpload from 'hooks/useUpload'
import PropTypes from 'prop-types'
import AddNew from 'components/CustomComponents/AddNew'
import { getuserGroup } from 'services/usergroups'
import { ROLES } from '_constants'
import { FormContext } from '../tabs'

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//     lg: { span: 5 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//     lg: { span: 12 },
//     // lg: { span: 18 },
//   },
// }

// const mandatoryAttributes = ['5e2812b3052366bc35d52f7c', '5e27f253abc92db82b65a57a']

// const availabilityOptions = [
//   {
//     name: 'In-stock',
//     value: 'in-stock',
//     key: '1',
//   },
//   {
//     name: 'Unavailable',
//     value: 'unavailable',
//     key: '2',
//   },
// ]

const FormD = (props) => {
  console.log('FormD props', props)
  // eslint-disable-next-line no-unused-vars
  const { type, hasTitle, hideSubmit, formControls } = props
  // const [id] = React.useState(_uniqueId('prefix-'));
  const formContext = React.useContext(FormContext)
  const [attributesData, setAttributesData] = React.useState([])
  // const [attributesValues, setAttributesValues] = React.useState([])
  // const [attrVals, setAttrValues] = React.useState([])
  // const [attrList, setAttrList] =
  //   type === 'fixed'
  //     ? React.useState([
  //       {
  //         key: generateKey('attr'),
  //         attribute: null,
  //         value: null,
  //       },
  //     ])
  //     : React.useState([]);

  console.log(attributesData)

  useEffect(() => {
    const fetchAttributes = async () => {
      const cData = await getuserGroup(ROLES.enduser)
      if (cData) setAttributesData(cData)
    }

    fetchAttributes()
  }, [])

  // const initialValues = data || {}

  const {
    onChange,
    values,
    onSubmit,
    onBlur,
    errors,
    // setSubmitting,
    isSubmitting,
    setValues,
    // validateForm,
  } = formControls || formContext

  // const [attrList, setAttrList] = React.useState(values.attributes)

  // useEffect(() => {
  //   setValues(prev => ({ ...prev, attributes: attrList }))
  // }, [attrList])

  useEffect(() => {
    if (values.tierPrice.length > 0) {
      values.tierPrice.forEach((i) => {
        const aVals = attributesData.filter((m) => m.id === i.customerGroup)
        console.log('sdfsf', aVals)
        // if (aVals.length > 0)
        // setAttrValues((a) => {
        //   // eslint-disable-next-line prefer-destructuring
        //   const data = { price: i.price, quantity: i.quantity }
        //   a[index] = {}
        //   a[index] = data
        //   return [...a]
        // })
      })
    }
  }, [attributesData])

  // const selectAttrGrpOptions = (index) => {
  const selectAttrGrpOptions = () => {
    //     code: "test1"
    // comparableOnfrontend: "yes"
    // createdAt: "2020-10-19T13:14:13.391Z"
    // deleted: false
    // inputType: "drop-down"
    // label: "test1"
    // options: (4) [{…}, {…}, {…}, {…}]
    // slug: "test1"
    // status: "active"
    // updatedAt: "2020-10-19T13:14:13.391Z"
    // useInFilter: "yes"
    // useInRecemondation: true
    // __v: 0
    // _id: "5f8d9125f2780f3b6f56da78"
    return attributesData.map((i) => {
      return (
        <Select.Option key={i.id} value={i.id}>
          {i.name}
        </Select.Option>
      )
    })
  }

  console.log('values', values)

  // const onChangeAvailability = val => setValues(a => ({ ...a, availability: val }))
  // const onChangeAttrGrp = val => setValues(a => ({ ...a, attributes: val }))
  // const onChangeAttrValues = val => setValues(a => ({ ...a, attributesValues: val }))

  const onChangeAttrGrp = (val, index) => {
    // const aVals = attributesData.filter((i) => i.id === val)
    setValues((m) => {
      m.tierPrice[index] = {}
      m.tierPrice[index].customerGroup = val
      m.tierPrice[index].price = null
      m.tierPrice[index].quantity = null
      return { ...m }
    })
  }

  const onChangeAttrValues = (val, index, name) => {
    setValues((a) => {
      a.tierPrice[index][name] = val
      return { ...a }
    })
  }

  const onClickAddAttr = () => {
    setValues((a) => {
      const newData = {
        key: generateKey('attr'),
        tierPrice: null,
        price: null,
        quantity: null,
      }
      a.tierPrice = [...a.tierPrice, newData]
      return { ...a }
    })
  }

  const handleDeleteAttr = (ind) => {
    // console.log('delete attr', ind, attrList.length)
    setValues((a) => {
      const filtered = a.tierPrice.filter((i, index) => index !== ind)
      console.log('updated', filtered, filtered.length)
      return { ...a, tierPrice: filtered }
    })
  }

  // const setAttrValOptions = attributeId => {
  //   const filtered = tierPriceData.filter(i => i._id === attributeId)
  //   const index = attrList.indexOf(i => i.attribute === attributeId)
  //   if (index > 0) {
  //     if (filtered.length > 0)
  //       setAttrValues(a => {
  //         a[index] = filtered[0].values
  //         return [...a]
  //       })
  //   }
  // }

  return (
    <>
      <Form onChange={onChange} onBlur={onBlur} onSubmit={onSubmit} labelAlign="right">
        <Row>
          {hasTitle && (
            <Col xs={20} sm={20} md={5} lg={5} xl={5}>
              <h4 className="text-black mb-3">
                <strong>Product Tier</strong>
              </h4>
            </Col>
          )}
          {
            <Col xs={4} sm={4} md={2} lg={2} xl={2}>
              <AddNew add onClick={onClickAddAttr} attribute="more" />
            </Col>
          }
        </Row>

        {values.tierPrice && values.tierPrice.length > 0 ? (
          values.tierPrice.map((i, index) => {
            console.log('ffffffffffffff', values.tierPrice.length)
            return (
              <>
                <Row key={i.key} gutter={10}>
                  <Col span={10}>
                    <Form.Item
                      key={i.key}
                      validateStatus={errors[`tierPrice[${index}].customerGroup`] && 'error'}
                      help={errors[`tierPrice[${index}].customerGroup`]}
                    >
                      <Select
                        // disabled={mandatorytierPrice.includes(i.attribute)}
                        defaultValue={i.customerGroup}
                        placeholder="Select Use Group"
                        onBlur={(val) => onChangeAttrGrp(val, index)}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Select.Option selected value={0}>
                          default
                        </Select.Option>
                        {selectAttrGrpOptions(index)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      key={i.key}
                      validateStatus={errors[`tierPrice[${index}].price`] && 'error'}
                      help={errors[`tierPrice[${index}].price`]}
                    >
                      {
                        <InputNumber
                          defaultValue={i.price}
                          type="number"
                          placeholder="price"
                          onChange={(val) => onChangeAttrValues(val, index, 'price')}
                        />
                      }
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      key={i.key}
                      validateStatus={errors[`tierPrice[${index}].quantity`] && 'error'}
                      help={errors[`tierPrice[${index}].value`]}
                    >
                      {
                        <InputNumber
                          defaultValue={i.quantity}
                          type="number"
                          placeholder="quantity"
                          min={0}
                          onChange={(val) => onChangeAttrValues(val, index, 'quantity')}
                        />
                      }
                    </Form.Item>
                  </Col>
                  {
                    <Col span={2}>
                      <AddNew
                        onRemove={() => handleDeleteAttr(index)}
                        attribute="Custom Attributes"
                      />
                    </Col>
                  }
                </Row>
              </>
            )
          })
        ) : (
          <>
            <Row>
              <Form.Item
                className={`${errors.tierPrice ? 'has-error' : ''}`}
                validateStatus={errors.tierPrice}
                help={errors.tierPrice}
              />
              {!errors.tierPrice && <span>Add some tierPrice...</span>}
            </Row>
          </>
        )}

        {values.customerGroup && values.tierPrice.length > 0 && !hideSubmit && (
          <Button disabled={isSubmitting} type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </Form>
    </>
  )
}

FormD.propTypes = {
  type: PropTypes.string,
  hasTitle: PropTypes.bool,
  hideSubmit: PropTypes.bool,
  formControls: PropTypes.object,
}

FormD.defaultProps = {
  type: 'multiple',
  hasTitle: true,
  hideSubmit: false,
  formControls: null,
}

export default FormD
