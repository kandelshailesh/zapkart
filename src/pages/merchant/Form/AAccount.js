/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Input, Select } from 'antd'
import Form from 'components/Form'
import PropTypes from 'prop-types'

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
const widthStyle = { width: 300 }
// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const AAccount = ({ hasTitle }) => {
  const formItems = [
    { heading: hasTitle ? 'Account Details' : undefined },

    {
      type: (
        <Select
          // labelInValue
          // defaultValue={values.accounttype}
          showSearch
          style={widthStyle}
          placeholder="Select Account Type"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          // onChange={onChangeAccountType}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Select.Option key="saving" value="Saving">
            Saving
          </Select.Option>
          <Select.Option key="current" value="Current">
            Current
          </Select.Option>
        </Select>
      ),
      key: 'accounttype',
      label: 'Account Type',
    },
    {
      type: <Input name="nameonaccount" />,
      key: 'nameonaccount',
      label: 'Name on Account',
    },
    {
      type: <Input.TextArea name="accountdetails" />,
      key: 'accountdetails',
      label: 'Account Details',
    },
  ]

  return <Form formItems={formItems} />
}

AAccount.propTypes = {
  hasTitle: PropTypes.bool,
}

AAccount.defaultProps = {
  hasTitle: true,
}

export default AAccount
