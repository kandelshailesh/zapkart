import React, { useMemo } from 'react'
import { Input, Radio, Select } from 'antd'
import { USERGROUP_API_URL } from '_constants'
import Form from 'components/Form'
import useFetching from 'hooks/useFetching'
import { editUserSchema } from 'utils/Schema'

const UserForm = ({ initialValues, onSubmit }) => {
  const [{ response: resUserGrps, loading: loadingUserGrps }] = useFetching(
    `${USERGROUP_API_URL.getUserGroup}/list/enduser`,
  )

  const initialVals = useMemo(() => {
    return initialValues
  }, [initialValues])

  const formItems = [
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
      label: 'Mobile',
    },
    {
      type: (
        <Select
          loading={loadingUserGrps}
          showSearch
          placeholder="Select group"
          optionFilterProp="children"
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {resUserGrps?.data?.map((i) => (
            <Select.Option key={i.id} value={i.id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'userGroupId',
      label: 'User Group',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="active" value={1}>
            Active
          </Radio.Button>
          <Radio.Button key="hold" value={0}>
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'active',
      label: 'Status',
    },
  ]

  const schema = editUserSchema

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={schema}
      onSubmit={onSubmit}
    />
  )
}

export default UserForm
