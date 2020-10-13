/* eslint-disable no-underscore-dangle */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react'
import {
  Button,
  Form, // Input,Upload,
  Select,
  Icon,
  Row,
  Col,
  Tooltip,
} from 'antd'
// import _uniqueId from 'lodash/uniqueId'
import _ from 'lodash'

import { generateKey } from 'utils'

// import useUpload from 'hooks/useUpload'
import { getAttributeGroups } from 'services/attributes'
import PropTypes from 'prop-types'
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

const FormD = props => {
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
      const { data: cData } = await getAttributeGroups()
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

  console.log('values', values)
  console.log('errors', errors.attributes)
  console.log('attributesData', attributesData)

  // useEffect(() => {
  //   setValues(prev => ({ ...prev, attributes: attrList }))
  // }, [attrList])

  useEffect(() => {
    if (values.attributes.length > 0) {
      values.attributes.forEach((i, index) => {
        const aVals = attributesData.filter(m => m._id === i.attribute)
        console.log(values.attributes, attributesData, aVals)
        if (aVals.length > 0)
          setAttrValues(a => {
            // eslint-disable-next-line prefer-destructuring
            a[index] = aVals[0].values
            return [...a]
          })
      })
    }
  }, [attributesData])

  const selectAttrGrpOptions = index =>
    attributesData.map(i => {
      const filtervalue = _.findIndex(values.attributes, item => {
        return item.attribute === i._id
      })
      let name = {}
      const { name: iName } = i
      if (Math.sign(filtervalue) === -1 && values.attributes.length < 2) {
        name = iName
      } else {
        name =
          Math.sign(filtervalue) !== -1 &&
          index !== filtervalue &&
          values.attributes[filtervalue] !== 'undefined' &&
          values.attributes[filtervalue].attribute !== 'undefined' &&
          values.attributes[filtervalue].attribute === i._id
            ? null
            : iName
      }
      return (
        <Select.Option key={i._id} value={i._id}>
          {name}
        </Select.Option>
      )
    })

  console.log('values', values)

  // const onChangeAvailability = val => setValues(a => ({ ...a, availability: val }))
  // const onChangeAttrGrp = val => setValues(a => ({ ...a, attributes: val }))
  // const onChangeAttrValues = val => setValues(a => ({ ...a, attributesValues: val }))

  const onChangeAttrGrp = (val, index) => {
    // console.log('attrList', attrList)
    console.log('attrVals', attrVals)
    console.log('val', val)
    console.log('index', index)
    setValues(m => {
      m.attributes[index].attribute = val
      m.attributes[index].value = null
      return { ...m }
    })
    const aVals = attributesData.filter(i => i._id === val)
    if (aVals.length > 0)
      setAttrValues(a => {
        // eslint-disable-next-line prefer-destructuring
        a[index] = aVals[0].values
        return [...a]
      })
  }

  const onChangeAttrValues = (val, index) => {
    setValues(a => {
      a.attributes[index].value = val
      return { ...a }
    })
  }

  const onClickAddAttr = () => {
    setValues(a => {
      const newData = {
        key: generateKey('attr'),
        attribute: null,
        value: null,
      }
      console.log('ggggggg', a.attributes)
      a.attributes = [...a.attributes, newData]
      return { ...a }
    })
    console.log('add new attr')
  }

  const handleDeleteAttr = ind => {
    // console.log('delete attr', ind, attrList.length)
    setValues(a => {
      const filtered = a.attributes.filter((i, index) => index !== ind)
      console.log('updated', filtered, filtered.length)
      return { ...a, attributes: filtered }
    })
  }

  // const setAttrValOptions = attributeId => {
  //   const filtered = attributesData.filter(i => i._id === attributeId)
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
                <strong>Attributes</strong>
              </h4>
            </Col>
          )}
          {
            <Col xs={4} sm={4} md={2} lg={2} xl={2}>
              <Tooltip title="Add new attribute">
                <Button shape="circle" size="small" type="primary" onClick={onClickAddAttr}>
                  <Icon type="plus" />
                </Button>
              </Tooltip>
            </Col>
          }
        </Row>

        {values.attributes && values.attributes.length > 0 ? (
          values.attributes.map((i, index) => {
            console.log('ffffffffffffff', values.attributes.length)
            return (
              <>
                <Row key={i.key} gutter={10}>
                  <Col span={10}>
                    <Form.Item
                      key={i.key}
                      validateStatus={errors[`attributes[${index}].attribute`] && 'error'}
                      help={errors[`attributes[${index}].attribute`]}
                    >
                      <Select
                        // disabled={mandatoryAttributes.includes(i.attribute)}
                        value={i.attribute}
                        placeholder="Select attribute group"
                        optionFilterProp="children"
                        onChange={val => onChangeAttrGrp(val, index)}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
                        {selectAttrGrpOptions(index)}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      key={i.key}
                      validateStatus={errors[`attributes[${index}].value`] && 'error'}
                      help={errors[`attributes[${index}].value`]}
                    >
                      <Select
                        value={i.value}
                        placeholder="Select attribute value"
                        optionFilterProp="children"
                        onChange={val => onChangeAttrValues(val, index)}
                        filterOption={(input, option) =>
                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
                        {attrVals[index]
                          ? attrVals[index].map(m => {
                              return (
                                <Select.Option key={m._id} value={m._id}>
                                  {m.value}
                                </Select.Option>
                              )
                            })
                          : ''}
                      </Select>
                    </Form.Item>
                  </Col>
                  {
                    <Col span={2}>
                      <Tooltip title="Delete attribute">
                        <Button
                          size="small"
                          shape="circle"
                          type="primary"
                          onClick={() => handleDeleteAttr(index)}
                        >
                          <Icon type="minus" />
                        </Button>
                      </Tooltip>
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
                className={`${errors.attributes ? 'has-error' : ''}`}
                validateStatus={errors.attributes}
                help={errors.attributes}
              />
              {!errors.attributes && <span>Add some attributes...</span>}
            </Row>
          </>
        )}

        {values.attrubutes && values.attributes.length > 0 && !hideSubmit && (
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
