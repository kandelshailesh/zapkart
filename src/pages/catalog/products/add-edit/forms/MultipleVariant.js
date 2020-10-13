/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import {
  Checkbox,
  notification,
  Button,
  Collapse,
  // TreeSelect, Select
} from 'antd'
import _ from 'lodash'
import { transformProductToForm, addProduct } from 'services/products'
import useFormValidation from 'hooks/useFormValidation'
import { productSchema } from 'utils/Schema'
import { STRINGS } from '_constants'
import SEO from './SEO'
import Shipping from './Shipping'
import General from './General'
import Pricing from './Pricing'
import Attributes from './Attributes'

const { Panel } = Collapse

const redStyle = { color: 'red' }

const generalFields = [
  'status',
  'featured',
  'name',
  'sku',
  'category',
  'brand',
  'composition',
  'returnable',
  'returnPeriod',
  'image',
]

const pricingFields = ['startDate', 'endDate', 'listPrice', 'salePrice', 'taxId']

const seoFields = ['metaTitle', 'metaDescription', 'metaKeywords']

const shippingFields = ['lengthClass', 'weightClass', 'height', 'length', 'width', 'weight']

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const MultipleVariantForm = ({ data, removeVariant, onSuccess }) => {
  const initialValues = { ...transformProductToForm(data), name: '', sku: '' } || {}
  console.log(data)
  // eslint-disable-next-line no-unused-vars
  const [variants, setVariants] = React.useState([])
  const [successId, setSuccessId] = React.useState(null)
  const [errorTabs, setErrorTabs] = useState({
    shipping: false,
    general: false,
    seo: false,
    variant: false,
    pricing: false,
    attributes: false,
  })

  const submitForm = async () => {
    console.log('in submit form', formControls.values, variants)
    const newVariant = await addProduct(formControls.values, formControls.values._id)
    console.log(newVariant)
    if (newVariant) {
      onSuccess()
      setSuccessId(newVariant._id)
      notification.success({
        message: STRINGS.success,
        description: STRINGS.addSuccess,
      })
    }
  }

  const formControls = useFormValidation(initialValues, productSchema, submitForm)
  formControls.originalData = data
  formControls.type = 'variant'

  useEffect(() => {
    console.log('main useEffect errors', formControls.errors)
    const errorKeys = Object.keys(formControls.errors)

    if (_.intersection(errorKeys, generalFields).length > 0)
      setErrorTabs(prev => ({ ...prev, general: true }))
    else setErrorTabs(prev => ({ ...prev, general: false }))
    if (_.intersection(errorKeys, shippingFields).length > 0)
      setErrorTabs(prev => ({ ...prev, shipping: true }))
    else setErrorTabs(prev => ({ ...prev, shipping: false }))
    if (_.intersection(errorKeys, seoFields).length > 0)
      setErrorTabs(prev => ({ ...prev, seo: true }))
    else setErrorTabs(prev => ({ ...prev, seo: false }))
    if (_.intersection(errorKeys, pricingFields).length > 0)
      setErrorTabs(prev => ({ ...prev, pricing: true }))
    else setErrorTabs(prev => ({ ...prev, pricing: false }))
  }, [formControls.errors])

  function callback(key) {
    console.log(key)
  }

  // const onClickAddVariant = () => React.useCallback(() => addVariant(), [])

  // const {
  //   onChange,
  //   values,
  //   setValues,
  //   onSubmit,
  //   onBlur,
  //   errors,
  //   setSubmitting,
  //   isSubmitting,

  //   // validateForm,
  // } = useFormValidation(data, productSchema, submitForm)

  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) setIsError(true)
  //   return () => {
  //     console.log('cleanup!', isError)
  //     if (isError) setIsError(false)
  //   }
  // }, [errors])

  const genExtra = (
    <span
      role="presentation"
      onClick={event => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation()
      }}
    >
      Same as main product <Checkbox defaultChecked />
    </span>
  )

  return (
    <div className="card">
      {/* <Row>
        <Col span={6}>
          <div className="card-header">
            <div className="utils__title">
              <strong>{variants.length > 0 ? 'Variants' : 'Add new Variant'}</strong>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <Tooltip title="Add variant">
            <Button onClick={addVariant}>
              <Icon type="plus" />
            </Button>
          </Tooltip>
        </Col>
      </Row> */}

      <Collapse bordered={false} defaultActiveKey={['1']} onChange={callback}>
        <Panel
          header={<span>{errorTabs.general && <span style={redStyle}>*</span>} General</span>}
          key="1"
          extra={genExtra}
        >
          <General hideSubmit hasTitle={false} formControls={{ ...formControls }} />
        </Panel>
        <Panel
          header={<span>{errorTabs.shipping && <span style={redStyle}>*</span>} Shipping</span>}
          key="2"
          extra={genExtra}
        >
          <Shipping hideSubmit hasTitle={false} formControls={{ ...formControls }} />
        </Panel>
        <Panel
          header={<span>{errorTabs.seo && <span style={redStyle}>*</span>} SEO</span>}
          key="3"
          extra={genExtra}
        >
          <SEO hideSubmit hasTitle={false} formControls={{ ...formControls }} />
        </Panel>
        <Panel
          header={<span>{errorTabs.pricing && <span style={redStyle}>*</span>} Pricing</span>}
          key="4"
          extra={genExtra}
        >
          <Pricing hideSubmit hasTitle={false} formControls={{ ...formControls }} />
        </Panel>
        <Panel
          header={<span>{errorTabs.attributes && <span style={redStyle}>*</span>} Attributes</span>}
          key="5"
        >
          <Attributes hideSubmit hasTitle={false} formControls={{ ...formControls }} />
        </Panel>
      </Collapse>
      {!successId && (
        <div className="spaced">
          <Button onClick={formControls.onSubmit} type="primary">
            Submit
          </Button>
          <Button onClick={removeVariant} type="dashed">
            Cancel
          </Button>
        </div>
      )}
    </div>
  )
}

export default MultipleVariantForm
