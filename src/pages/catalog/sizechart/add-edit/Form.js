/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import { Input, Radio } from 'antd'
import Form from 'components/Form'
import { sizechartSchema } from 'utils/Schema'
import Editor from 'components/Editor'
// import useFetching from 'hooks/useFetchingNoReducers'
// import { CATALOG_API_URL } from '_constants'

const CountryEditForm = ({ initialValues, onSubmit }) => {
  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues }
    return { status: 'active' }
  }, [initialValues])

  const formItems = [
    // "name":"size qwwss",
    //     "content":"sdasdsa",
    //   "status":"active"

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
      schema={sizechartSchema}
      onSubmit={onSubmit}
    />
  )
}

export default CountryEditForm
