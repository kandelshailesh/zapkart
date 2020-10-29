/* eslint-disable prefer-destructuring */
import React, { useMemo } from 'react'
import { withRouter } from 'react-router'
import { Input, InputNumber, notification, Radio } from 'antd'
import { Helmet } from 'react-helmet'
// import { editGeneralsettings } from 'services'
import { generalSettingsSchema } from 'utils/Schema'
import { CATALOG_API_URL, STRINGS } from '_constants'
import Form from 'components/Form'
import useFetching from 'hooks/useFetchingNoReducers'
import { editGeneralsettings } from 'services'

const GeneralSettings = () => {
  const [{ response }] = useFetching(CATALOG_API_URL.getGeneralSettings)

  const initialValues = useMemo(() => {
    console.log('aasdszfs', response)
    if (response?.data) {
      return {
        ...response?.data,
      }
    }
    return { minCartValue: 100, freeShippingAbove: 1000 }
  }, [response])

  const submitForm = async (vals) => {
    const res = await editGeneralsettings(vals)
    if (res?.success) {
      notification.success({
        message: STRINGS.editSuccess,
      })
      // history.replaceState('/general-sett')
    }
  }

  const formItems = [
    {
      type: <Input />,
      key: 'projectName',
      label: 'Project Name',
    },
    {
      type: <Input />,
      key: 'projectLabel',
      label: 'Project Label',
    },
    {
      type: <InputNumber type="number" min={0} />,
      key: 'shippingAmount',
      label: 'shipping Amount',
    },
    {
      type: <InputNumber type="number" min={1000} />,
      key: 'freeShippingAbove',
      label: 'Free shipping above',
    },
    {
      type: <InputNumber type="number" min={100} />,
      key: 'minCartValue',
      label: 'Min Cart Value',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button key="yes" value={true}>
            Yes
          </Radio.Button>
          <Radio.Button key="no" value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'codEnabled',
      label: 'COD Enabled',
    },
  ]

  // console.log('ljkj', shippingCostFi, shippingTimeFI)
  // console.log('ok', initialValues)

  const form = (
    <Form
      className="general-settings-form"
      initialValues={initialValues}
      formItems={formItems}
      onSubmit={submitForm}
      schema={generalSettingsSchema}
    />
  )

  return (
    <div>
      <Helmet title="General Settings" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>General Settings</strong>
          </div>
        </div>
        <div className="card-body">
          <div className="general-settings-form-wrapper">{form}</div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(GeneralSettings)
