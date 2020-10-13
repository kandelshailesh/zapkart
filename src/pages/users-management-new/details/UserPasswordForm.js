import React, { useMemo } from 'react'
import { Input } from 'antd'
// import { USERGROUP_API_URL } from '_constants'
import Form from 'components/Form'
// import useFetching from 'hooks/useFetching'
import { passwordSchema } from 'utils/Schema'

const UserForm = ({ initialValues, onSubmit }) => {
  const initialVals = useMemo(() => {
    return initialValues
  }, [initialValues])

  const formItems = [
    {
      type: <Input />,
      key: 'password',
      label: 'Password',
    },
    {
      type: <Input />,
      key: 'confirmPassword',
      label: 'confirm Password',
    },
  ]

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={passwordSchema}
      onSubmit={onSubmit}
    />
  )
}

export default UserForm
