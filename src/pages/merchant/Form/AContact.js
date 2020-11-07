/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Input } from 'antd'
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

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const AContact = ({ hasTitle }) => {
  const formItems = [
    { heading: hasTitle ? 'Contact Details' : undefined },

    {
      type: <Input />,
      key: 'firstName',
      label: 'First Name',
    },
    {
      type: <Input />,
      key: 'lastName',
      label: 'Last Name',
    },
    {
      type: <Input />,
      key: 'email',
      label: 'Email',
    },
    {
      type: <Input />,
      key: 'phone',
      label: 'phone',
    },
    {
      type: <Input.Password />,
      key: 'password',
      label: 'Password',
    },
    {
      type: <Input.Password />,
      key: 'passwordConfirmation',
      label: 'Confirm password',
    },
  ]

  return <Form formItems={formItems} />
}

AContact.propTypes = {
  hasTitle: PropTypes.bool,
}

AContact.defaultProps = {
  hasTitle: true,
}

export default AContact
