/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import { Input, Radio } from 'antd'
import Form from 'components/Form'
import { customOfferSchema } from 'utils/Schema'
import TextArea from 'antd/lib/input/TextArea'
import Editor from 'components/Editor'
// import useFetching from 'hooks/useFetchingNoReducers'
// import { CATALOG_API_URL } from '_constants'

const CountryEditForm = ({ initialValues, onSubmit }) => {
  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues }
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
      type: <TextArea />,
      key: 'description',
      label: 'Description',
    },
    {
      type: (
        <Editor
          // onChange={handleEditorChange}
          placeholder="Write something..."
          name="content"
          // editorHtml={values.keyBenefits || ''}
        />
      ),
      key: 'content',
      label: 'Content',
    },
  ]

  return (
    <Form
      formItems={formItems}
      initialValues={initialVals}
      schema={customOfferSchema}
      onSubmit={onSubmit}
    />
  )
}

export default CountryEditForm
