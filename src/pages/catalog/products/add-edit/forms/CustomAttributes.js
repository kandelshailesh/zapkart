/* eslint-disable */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import {
  Button,
  Form, // Input,Upload,
  Select,
  Row,
  Col,
  Checkbox,
} from 'antd'
// import _uniqueId from 'lodash/uniqueId'
// import _ from 'lodash'

import { generateKey } from 'utils'

// import useUpload from 'hooks/useUpload'
import PropTypes from 'prop-types'
import { getCustomAttributes } from 'services/customAttributes'
import AddNew from 'components/CustomComponents/AddNew'
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
  const [attrVals, setAttrValues] = React.useState([])
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
      const { data: cData } = await getCustomAttributes()
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
    if (values.cutomAttributes.length > 0) {
      values.cutomAttributes.forEach((i, index) => {
        const aVals = attributesData.filter((m) => m._id === i.attribute)
        console.log('sdfsf', aVals)
        if (aVals.length > 0)
          setAttrValues((a) => {
            // eslint-disable-next-line prefer-destructuring
            a[index] = aVals[0].options
            return [...a]
          })
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
      console.log('attributesData,sdfs', i.label)

      // const filtervalue = _.findIndex(values.attributes, (item) => {
      //   return item.attribute === i._id
      // })
      // let name = {}
      // const { name: iName } = i
      // if (Math.sign(filtervalue) === -1 && values.attributes.length < 2) {
      //   name = iName
      // } else {
      //   name =
      //     Math.sign(filtervalue) !== -1 &&
      //     index !== filtervalue &&
      //     values.attributes[filtervalue] !== 'undefined' &&
      //     values.attributes[filtervalue].attribute !== 'undefined' &&
      //     values.attributes[filtervalue].attribute === i._id
      //       ? null
      //       : iName
      // }
      return (
        <Select.Option key={i._id} value={i._id}>
          {i.label}
        </Select.Option>
      )
    })
  }

  console.log('values', values)

  // const onChangeAvailability = val => setValues(a => ({ ...a, availability: val }))
  // const onChangeAttrGrp = val => setValues(a => ({ ...a, attributes: val }))
  // const onChangeAttrValues = val => setValues(a => ({ ...a, attributesValues: val }))

  const onChangeAttrGrp = (val, index) => {
    const aVals = attributesData.filter((i) => i._id === val)

    setValues((m) => {
      m.cutomAttributes[index] = {}
      m.cutomAttributes[index].attribute = val
      m.cutomAttributes[index].value = null
      m.cutomAttributes[index].inputType = aVals[0].inputType
      return { ...m }
    })
    if (aVals.length > 0)
      setAttrValues((a) => {
        // eslint-disable-next-line prefer-destructuring
        a[index] = aVals[0].options
        return [...a]
      })
  }

  const onChangeAttrValues = (val, index) => {
    setValues((a) => {
      a.cutomAttributes[index].value = val
      return { ...a }
    })
  }

  const onClickAddAttr = () => {
    setValues((a) => {
      const newData = {
        key: generateKey('attr'),
        attribute: null,
        value: null,
      }
      a.cutomAttributes = [...a.cutomAttributes, newData]
      return { ...a }
    })
  }

  const handleDeleteAttr = (ind) => {
    // console.log('delete attr', ind, attrList.length)
    setValues((a) => {
      const filtered = a.cutomAttributes.filter((i, index) => index !== ind)
      console.log('updated', filtered, filtered.length)
      return { ...a, cutomAttributes: filtered }
    })
  }

  // const setAttrValOptions = attributeId => {
  //   const filtered = cutomAttributesData.filter(i => i._id === attributeId)
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
                <strong>Custom Attributes</strong>
              </h4>
            </Col>
          )}
          {
            <Col xs={4} sm={4} md={2} lg={2} xl={2}>
              <AddNew add onClick={onClickAddAttr} attribute="Custom Attributes" />
            </Col>
          }
        </Row>

        {values.cutomAttributes && values.cutomAttributes.length > 0 ? (
          values.cutomAttributes
            .filter((val) => val.value != '')
            .map((i, index, array) => {
              console.log('ffffffffffffff', i)
              if (i.attribute == null && array.length == 2) {
                console.log('Find')
              } else {
                return (
                  <>
                    <Row key={i.key} gutter={10}>
                      <Col span={8}>
                        <Form.Item
                          key={i.key}
                          validateStatus={errors[`cutomAttributes[${index}].attribute`] && 'error'}
                          help={errors[`cutomAttributes[${index}].attribute`]}
                        >
                          <Select
                            // disabled={mandatorycutomAttributes.includes(i.attribute)}
                            value={i.attribute}
                            placeholder="Select Custom group"
                            optionFilterProp="children"
                            onChange={(val) => onChangeAttrGrp(val, index)}
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
                            {selectAttrGrpOptions(index)}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12} style={{ border: '1px solid grey', borderRadius: 3 }}>
                        <Form.Item
                          key={i.key}
                          validateStatus={errors[`cutomAttributes[${index}].value`] && 'error'}
                          help={errors[`cutomAttributes[${index}].value`]}
                        >
                          <Checkbox.Group
                            options={attrVals[index]?.map((w) => ({
                              label: w.value,
                              value: w._id,
                            }))}
                            defaultValue={i.value?.map((w) => w._id)}
                            onChange={(val) => onChangeAttrValues(val, index)}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={2}>
                        <AddNew
                          onRemove={() => handleDeleteAttr(index)}
                          attribute="Custom Attributes"
                        />
                      </Col>
                    </Row>
                  </>
                )
              }
            })
        ) : (
          <>
            <Row>
              <Form.Item
                className={`${errors.cutomAttributes ? 'has-error' : ''}`}
                validateStatus={errors.cutomAttributes}
                help={errors.cutomAttributes}
              />
              {!errors.cutomAttributes && <span>Add some cutomAttributes...</span>}
            </Row>
          </>
        )}

        {values.attrubutes && values.cutomAttributes.length > 0 && !hideSubmit && (
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
