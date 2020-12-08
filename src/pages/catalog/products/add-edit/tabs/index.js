/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { Tabs, notification, Button, Skeleton } from 'antd'
import { Redirect, Link } from 'react-router-dom'
import { addProduct, editProduct, transformProductToForm } from 'services/products'
import useFormValidation from 'hooks/useFormValidation'
import { productSchemaForMerchant } from 'utils/Schema'
import Query from 'components/Query'
import { STRINGS, LINKS, CATALOG_API_URL } from '_constants'
import _ from 'lodash'
import Reviews from 'pages/reviews'
import PlaceholderImage from 'components/PlaceholderImage'
import { connect } from 'react-redux'
import General from '../forms/General'
import Shipping from '../forms/Shipping'
import SEO from '../forms/SEO'
// import Pricing from './Pricing'
import VariantFormTab from './VariantFormTab'
import Pricing from '../forms/Pricing'
import Attributes from '../forms/Attributes'
import ExtraInfo from '../forms/ExtraInfo'
import CustomAttributes from '../forms/CustomAttributes'
import GroupPricing from '../forms/GroupPricing'
import ProductTier from '../forms/ProductTier'

export const FormContext = React.createContext({})
const FormProvider = FormContext.Provider
export const FormConsumer = FormContext.Consumer

// const titleStyle = { display: 'flex', alignItems: 'flexStart' }

const generalFields = [
  'status',
  'featured',
  'priorityOrder',
  'organic',
  'quantity',
  'subtract',
  'outOfStockStatus',
  'name',
  'sku',
  'category',
  'brand',
  'composition',
  'returnable',
  'returnPeriod',
  'image',
  'relatedProducts',
  'frequentlyBought',
]

const pricingFields = ['startDate', 'endDate', 'listPrice', 'salePrice', 'taxId']

const seoFields = ['metaTitle', 'metaDescription', 'metaKeywords']

const extraInfoFields = [
  'description',
  'keyBenefits',
  'directionsForUse',
  'safetyInfo',
  'otherInfo',
]

const shippingFields = ['lengthClass', 'weightClass', 'height', 'length', 'width', 'weight']

const attributesFields = ['attributes']

const { TabPane } = Tabs

const redStyle = { color: 'red' }

// const mandatoryAttributes = ['5e2812b3052366bc35d52f7c', '5e27f253abc92db82b65a57a']

const FormIndex = (props) => {
  const [isMobile, setIsMobile] = useState(false)
  const checkResize = () => {
    setIsMobile(window.innerWidth <= 767)
    console.log('innerWidth', window.innerWidth)
  }
  React.useEffect(() => {
    if (window.innerWidth <= 767) setIsMobile(true)
    window.addEventListener('resize', checkResize)
  }, [])

  console.log('sdfsdfsdfjksbdjk', props)
  const { data, user } = props

  console.log('Data')
  console.log(JSON.stringify(data, null, 2))
  let transformedData = null
  if (data) transformedData = transformProductToForm(data)
  const initialValues = transformedData || {
    image: [],
    attributes: [
      {
        attribute: '',
        value: '',
      },
    ],
    cutomAttributes: [
      {
        attribute: '',
        value: '',
      },
    ],
    // groupPrice: [{ customerGroup: '', price: '' }],
    // tierPrice: [{ customerGroup: '', quantity: '', price: '' }],
    groupPrice: [],
    tierPrice: [],
    featured: false,
    status: 'hold',
    priorityOrder: 0,
    prescriptionNeeded: false,
    startDate: '2020-01-15T05:06:37.163Z',
    endDate: '2020-01-15T05:06:37.163Z',
    linktoBase: 'false',
    contents: [],
    // attributes: mandatoryAttributes.map(i => ({
    //   key: i,
    //   attribute: i,
    //   value: null
    // }))
  }
  let tabLength = 3
  if (data) tabLength = 4
  const [activeKey, setActiveKey] = useState('0')
  // eslint-disable-next-line no-unused-vars
  const [errorTabs, setErrorTabs] = useState({
    shipping: false,
    general: false,
    seo: false,
    variant: false,
    pricing: false,
    attributes: false,
  })

  const submitForm = async () => {
    console.log('will submit entire form', values)
    const newData = data ? await editProduct(values, data._id, data) : await addProduct(values)
    setSubmitting(false)
    console.log('new data', newData)
    if (newData) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      if (!data) setSuccessId(newData._id)
    }
  }

  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    // validateForm,
  } = useFormValidation(initialValues, productSchemaForMerchant, submitForm)

  console.log(values)

  // const onSubmit = React.useCallback((ev) => onNext(ev, { notifyMsg: STRINGS.formsErrors }), [])
  // use useReducers
  // const [isErrorTabOne, setIsErrorTabOne] = useState(false)

  React.useEffect(() => {
    console.log('main useEffect errors', errors)
    const errorKeys = Object.keys(errors)

    if (_.intersection(errorKeys, generalFields).length > 0)
      setErrorTabs((prev) => ({ ...prev, general: true }))
    else setErrorTabs((prev) => ({ ...prev, general: false }))
    if (_.intersection(errorKeys, shippingFields).length > 0)
      setErrorTabs((prev) => ({ ...prev, shipping: true }))
    else setErrorTabs((prev) => ({ ...prev, shipping: false }))
    if (_.intersection(errorKeys, seoFields).length > 0)
      setErrorTabs((prev) => ({ ...prev, seo: true }))
    else setErrorTabs((prev) => ({ ...prev, seo: false }))
    if (_.intersection(errorKeys, pricingFields).length > 0)
      setErrorTabs((prev) => ({ ...prev, pricing: true }))
    else setErrorTabs((prev) => ({ ...prev, pricing: false }))
    if (_.intersection(errorKeys, attributesFields).length > 0)
      setErrorTabs((prev) => ({ ...prev, attributes: true }))
    else setErrorTabs((prev) => ({ ...prev, attributes: false }))
    if (_.intersection(errorKeys, extraInfoFields).length > 0)
      setErrorTabs((prev) => ({ ...prev, extraInfoFields: true }))
    else setErrorTabs((prev) => ({ ...prev, extraInfoFields: false }))
  }, [errors])

  const [formsValues, setformsValues] = useState({})
  const [successId, setSuccessId] = useState(null)
  const [isSubmit, setIsSubmit] = useState(false)
  //  const [isErrorTabThree, setIsErrorTabThree] = useState(false)

  console.log('formsValues', formsValues)
  console.log('isSubmit', isSubmit)

  // eslint-disable-next-line no-unused-vars
  const handleTabNextClick = (vals, isLast = false) => {
    setActiveKey((a) => {
      const no = Number(a)
      console.log(no)
      return Math.min(no + 1, tabLength).toString()
    })
    setformsValues((prev) => ({ ...prev, ...vals }), setIsSubmit(isLast))
  }

  // eslint-disable-next-line no-unused-vars
  const handleTabPrevClick = (vals) => {
    if (Number(activeKey) > 1) {
      setActiveKey(() => {
        return Math.min
      })
    }
  }

  const onChangeTab = (a) => {
    console.log('onChangeTab', a)
    setActiveKey(a)
  }
  console.log(activeKey, typeof activeKey)

  if (successId) return <Redirect to={`/catalog/products/product/${successId}`} />

  const loader = (
    <>
      <div className="border mb-5 p-3 w-75">
        <div className="d-flex align-items-center">
          <div className="thumbnail-area mr-2">
            <PlaceholderImage />
          </div>
          <Skeleton paragraph={{ rows: 1 }} />
        </div>
      </div>
    </>
  )

  return (
    <>
      {data && data.parentId && (
        <Query
          url={`${CATALOG_API_URL.getProducts}/${data.parentId}?fields[]=name&fields[]=images`}
          loader={loader}
        >
          {({ data: parentData }) => {
            console.log(data.parentId, typeof data.parentId)
            // if (data)
            //   return (
            //     <div style={titleStyle}>
            //       <p>
            //         <strong>Variant of: &nbsp;</strong>
            //         <Link
            //           className="utils__link--underlined"
            //           to={`${LINKS.editProduct}/${data.parentId}`}
            //         >
            //           {parentData.name}
            //           {/* <p className="text-muted mb-1"> {data.parentId}</p> */}
            //         </Link>
            //       </p>
            //     </div>
            //   )
            // return null
            if (parentData) {
              const img =
                parentData.images && parentData.images.length && parentData.images.length > 0
                  ? parentData.images[0].thumbnail
                  : null
              return (
                <div className="container">
                  <div className="row no-gutters">
                    <div className="col-md-6">
                      <div className="border mb-5 p-3">
                        <div className="text-info text-uppercase">
                          <strong>Variant of</strong>
                        </div>
                        <Link to={`${LINKS.editProduct}/${data.parentId}`}>
                          <div className="d-flex align-items-center">
                            <div className="mr-4 thumbnail-area">
                              <PlaceholderImage src={img} alt="" />
                            </div>
                            <div className="font-weight-bolder">{parentData.name}</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        </Query>
      )}
      <FormProvider
        value={{
          // onSubmit: handleTabNextClick,
          setIsError: (name, isError) => {
            setErrorTabs((a) => ({ ...a, [name]: isError }))
          },
          originalData: data,
          onChange,
          values,
          setValues,
          onSubmit,
          onBlur,
          errors,
          setSubmitting,
          isSubmitting,
        }}
      >
        {parseInt(activeKey, 10) < 5 && (
          <div className="left-spaced">
            <Button onClick={onSubmit} disabled={isSubmitting} type="primary">
              Submit
            </Button>

            <Link to="/catalog/products">
              <Button type="dashed">Cancel</Button>
            </Link>
          </div>
        )}
        <Tabs tabPosition={isMobile ? 'top' : 'left'} activeKey={activeKey} onChange={onChangeTab}>
          <TabPane
            tab={<span>{errorTabs.general && <span style={redStyle}>*</span>} General</span>}
            key={0}
          >
            <General name="general" isEdit={!!data} userType={user.userTypeId} hideSubmit />
            {/* onSubmit={handleTabClick}
          isError={isErrorTabOne}
          setIsError={val => setIsErrorTabOne(val)} */}
          </TabPane>
          {((values.linktoBase && values.linktoBase === 'false') || !values.linktoBase) && (
            <TabPane
              tab={<span>{errorTabs.shipping && <span style={redStyle}>*</span>} Shipping</span>}
              key={1}
            >
              <Shipping name="shipping" hideSubmit />
            </TabPane>
          )}
          {((values.linktoBase && values.linktoBase === 'false') || !values.linktoBase) && (
            <TabPane
              // tab={<span>{isErrorTabThree && <span style={redStyle}>*</span>} SEO</span>}
              tab={<span>{errorTabs.seo && <span style={redStyle}>*</span>} SEO & Extra Info</span>}
              key={2}
            >
              <SEO name="seo" hideSubmit />

              <ExtraInfo name="extraInfo" hideSubmit />
            </TabPane>
          )}
          <TabPane
            tab={
              <span>
                {(errorTabs.pricing || errorTabs.attributes) && <span style={redStyle}>*</span>}{' '}
                Pricing & Attributes
              </span>
            }
            key={3}
          >
            <Pricing name="pricing" hideSubmit />
            <GroupPricing name="Group Pricing" />
            <ProductTier name="Product Tier" hideSubmit />
            {((values.linktoBase && values.linktoBase === 'false') || !values.linktoBase) && (
              <Attributes name="attributes" hideSubmit />
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                {/* {(errorTabs.pricing || errorTabs.attributes) && <span style={redStyle}>*</span>}{' '} */}
                Custom Attributes
              </span>
            }
            key={4}
          >
            <CustomAttributes name="Custom Attributes" hideSubmit />
          </TabPane>
          {/* {data && (
        <TabPane
          tab={<span>{isErrorTabFour && <span style={redStyle}>*</span>} Variant</span>}
          key={3}
        >
          <Attributes
            onSubmit={handleSubmitForm}
            isError={isErrorTabFour}
            setIsError={val => setIsErrorTabFour(val)}
          />
        </TabPane>
      )} */}

          {data && !data.parentId && user.userTypeId === 1 && (
            <TabPane
              disabled={!data}
              tab={<span>{errorTabs.variant && <span style={redStyle}>*</span>}Variant</span>}
              key={4}
            >
              {/* <VariantFormTab name="variant" multipleTabs={data && true} /> */}
              <VariantFormTab name="variant" data={data} />
            </TabPane>
          )}
          {data && user.userTypeId === 1 && (
            <TabPane tab={<span>Reviews</span>} key={5}>
              {/* <VariantFormTab name="variant" multipleTabs={data && true} /> */}
              <Reviews productId={data ? data._id : null} />
            </TabPane>
          )}
        </Tabs>
      </FormProvider>
    </>
  )
}

export default connect(({ user }) => ({ user }))(FormIndex)

// assodiate each key with name {
// key: '1',
//  name: 'general'
// }
/**
 * if name === 'variant' submit form provided no errors
 * use useReducers
 */
