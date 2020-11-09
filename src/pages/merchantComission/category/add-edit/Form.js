/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState, useEffect } from 'react'
import { InputNumber, Radio, Select } from 'antd'
import Form from 'components/Form'
import { commissionByadminschema, commissionByadminschemaedit } from 'utils/Schema'
// import { CATALOG_API_URL } from '_constants'
// import useFetching from 'hooks/useFetching'
import { isEmpty } from 'lodash'
import { getCategories } from 'services/categories'
import { getAllMerchnats } from 'services'
import { connect } from 'react-redux'

const ZoneEditForm = ({ initialValues, onSubmit, user }) => {
  const [catagoryList, setcatagoryList] = useState([])
  const [merchantList, setmerchantList] = useState([])

  const initialVals = useMemo(() => {
    return { ...initialValues }
  }, [initialValues])

  useEffect(() => {
    const cData = async () => {
      const data = await getCategories()
      if (!isEmpty(data)) {
        setcatagoryList(data)
      }
      const lst = await getAllMerchnats()
      if (!isEmpty(lst)) setmerchantList(lst)
    }
    cData()
  }, [])

  const formItems = [
    //     type:enum: ["brand", "category"],
    // commission:int
    // typedetail[]: id
    // typedetail[]: id
    // typedetail[]: id
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="active" value="brand">
            Brand
          </Radio.Button>
          <Radio.Button key="hold" value="category">
            Category
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'type',
      label: 'Type',
    },
    {
      type: <InputNumber type="number" />,
      key: 'commission',
      label: 'Commission',
    },
    {
      type: (
        <Select
          mode={!initialValues ? 'multiple' : 'default'}
          // value={values.composition}
          showSearch
          placeholder="Select category"
          optionFilterProp="children"
          name="typedetail"
          // onChange={(e) => setValues((a) => ({ ...a, composition: e }))}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {catagoryList.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'typedetail',
      label: 'Category',
    },
  ]

  if (user.userTypeId === 1) {
    if (isEmpty(initialValues)) {
      formItems.push({
        label: 'Merchant',
        key: 'merchantId',
        name: 'merchantId',
        type: (
          <Select
            name="merchantId"
            placeholder="Select Merchant"
            // style={{ width: '100%' }}
            // onPopupScroll={this.handlePopupScroll}
          >
            {merchantList.map((d) => (
              <Select.Option key={d.userId} value={d.userId}>
                {d.name}
              </Select.Option>
            ))}
          </Select>
        ),
      })
    }
  }

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={initialValues ? commissionByadminschemaedit : commissionByadminschema}
      onSubmit={onSubmit}
    />
  )
}

export default connect(({ user }) => ({ user }))(ZoneEditForm)
