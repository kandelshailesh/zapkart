import React, { useState, useEffect } from 'react'
import { Select } from 'antd'
import { getAllMerchnats } from 'services'

const { Option } = Select
function AdminDetails(props) {
  const [merchants, setMerchants] = useState([])
  const [merchantId, setMerchantId] = useState('')
  useEffect(() => {
    const fetchMerchants = async () => {
      const cData = await getAllMerchnats()
      if (cData) {
        setMerchants(cData)
      }
    }
    fetchMerchants()
  }, [])

  const onChange = (e) => {
    console.log('e', e)
    setMerchantId(e)
    props.fetchAdminDetails(e)
    // setValues((prev) => ({ ...prev, merchantId: a }))
  }
  console.log('merchant', merchantId)
  return (
    <div>
      <Select
        name="merchantId"
        value={merchantId}
        placeholder="Select Merchant"
        onChange={(a) => onChange(a)}
        style={{ width: '30%' }}
        // onPopupScroll={this.handlePopupScroll}
      >
        {merchants.map((d) => (
          <Option key={d.userId} value={d.userId}>
            {d.name}
          </Option>
        ))}
      </Select>
    </div>
  )
}

export default AdminDetails
