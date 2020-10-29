// eslint-disable-next-line no-underscore-dangle
/* eslint-disable prefer-destructuring */
import React, { useMemo } from 'react'
import { withRouter } from 'react-router'
import { Input, Radio, Select } from 'antd'
import { geoZoneSchema } from 'utils/Schema'
import { STATE_LIST_API } from '_constants'
import Form from 'components/Form'
import useFetching from 'hooks/useFetchingNoReducers'

const EditCreateGeozone = ({ initialValues, HandleOnSubmit }) => {
  const [{ response: selectSate }] = useFetching(STATE_LIST_API.getStates)

  const initialVal = useMemo(() => {
    if (initialValues) {
      return { ...initialValues }
    }
    return { status: 'active' }
  }, [initialValues])

  const formItems = [
    {
      type: <Input />,
      key: 'name',
      label: 'Name',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="active" value="active">
            Active
          </Radio.Button>
          <Radio.Button key="hold" value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
    },
    {
      key: `zones`,
      label: 'State',
      type: (
        <Select mode="multiple" placeholder="Select State first">
          {selectSate?.data?.map((indx) => (
            // eslint-disable-next-line no-underscore-dangle
            <Select.Option key={indx} value={indx}>
              {`${indx}`}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ]

  return (
    <Form
      className="geozome-form"
      initialValues={initialVal}
      formItems={formItems}
      onSubmit={HandleOnSubmit}
      schema={geoZoneSchema}
    />
  )
}

export default withRouter(EditCreateGeozone)
