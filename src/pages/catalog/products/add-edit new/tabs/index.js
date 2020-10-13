/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Link } from 'react-router-dom'
import { STRINGS } from '_constants'
import { productSchema } from 'utils/Schema'
import { Tabs, notification, Button } from 'antd'
import Form from 'components/Form'
import { connect } from 'react-redux'
import { editProduct, addProduct, transformProductToForm } from 'services/products'
import General from '../forms/General'
import Shipping from '../forms/Shipping'
import Pricing from '../forms/Pricing'
import SEO from '../forms/SEO'
import ExtraInfo from '../forms/ExtraInfo'
import Attributes from '../forms/Attributes'
import VariantFormTab from './VariantFormTab'

const { TabPane } = Tabs

class ProductTabs extends React.Component {
  state = {
    activeKey: '1',
    transformedData: {
      image: [],
      attributes: [
        {
          attribute: '',
          value: '',
        },
      ],
      featured: false,
      status: 'hold',
      priorityOrder: 0,
      prescriptionNeeded: false,
      startDate: '2020-01-15T05:06:37.163Z',
      endDate: '2020-01-15T05:06:37.163Z',
      // attributes: mandatoryAttributes.map(i => ({
      //   key: i,
      //   attribute: i,
      //   value: null
      // }))
    },
  }

  componentDidMount() {
    const { data } = this.props

    if (data) {
      const transformedData = transformProductToForm(data)

      this.setState({
        transformedData,
      })
    }
  }

  submitForm = async values => {
    const { data } = this.props
    console.log('will submit entire form', values)
    const newData = data ? await editProduct(values, data._id, data) : await addProduct(values)
    // setSubmitting(false)
    console.log('new data', newData)
    if (newData) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      // if (!data) setSuccessId(newData._id)
    }
  }

  onChangeTab = key => {
    this.setState({
      activeKey: key,
    })
  }

  render() {
    const {
      settings: { isMobileView },
    } = this.props
    const { transformedData: data, activeKey } = this.state

    // const loader = <Skeleton paragraph={{ rows: 1 }} />
    return (
      <>
        <Form.Provider
          initialValues={data}
          originalData={data}
          onSubmit={this.submitForm}
          schema={productSchema}
        >
          <Form.Consumer>
            {({ onSubmit, isSubmitting }) => {
              const operations = Number(activeKey) <= 6 && (
                <div className="tab-extra">
                  <Button onClick={onSubmit} disabled={isSubmitting} type="primary">
                    Submit
                  </Button>

                  <Link to="/catalog/products">
                    <Button type="dashed">Cancel</Button>
                  </Link>
                </div>
              )
              return (
                <Tabs
                  tabPosition={isMobileView ? 'top' : 'left'}
                  activeKey={activeKey}
                  onChange={this.onChangeTab}
                  tabBarExtraContent={operations}
                >
                  <TabPane tab="General" key="1">
                    <General />
                  </TabPane>
                  <TabPane tab="Shipping" key="2">
                    <Shipping />
                  </TabPane>
                  <TabPane tab="Pricing" key="3">
                    <Pricing />
                  </TabPane>
                  <TabPane tab="SEO" key="4">
                    <SEO />
                  </TabPane>
                  <TabPane tab="Extra Info" key="5">
                    <ExtraInfo />
                  </TabPane>
                  <TabPane tab="Attributes" key="6">
                    <Attributes initialValues={data} schema={productSchema} />
                  </TabPane>
                  <TabPane tab="VariantFormTab" key="7">
                    <VariantFormTab />
                  </TabPane>
                  {/* <TabPane
                    // tab={<span>{isErrorTabThree && <span style={redStyle}>*</span>} SEO</span>}
                    tab={<span>{errorTabs.seo && <span style={redStyle}>*</span>} SEO & Extra Info</span>}
                    key={2}
                  >
                    <SEO name="seo" hideSubmit />
      
                    <ExtraInfo name="extraInfo" hideSubmit />
                  </TabPane>
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
                    <Attributes name="attributes" hideSubmit />
                  </TabPane>
      
                  {data && !data.parentId && (
                    <TabPane
                      disabled={!data}
                      tab={<span>{errorTabs.variant && <span style={redStyle}>*</span>}Variant</span>}
                      key={4}
                    >
                      // <VariantFormTab name="variant" multipleTabs={data && true} /> 
                      <VariantFormTab name="variant" data={data} />
                    </TabPane> 
                  )} */}
                </Tabs>
              )
            }}
          </Form.Consumer>
        </Form.Provider>
      </>
    )
  }
}

export default connect(({ settings }) => ({ settings }))(ProductTabs)
