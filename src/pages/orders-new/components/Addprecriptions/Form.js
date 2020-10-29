/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import Form from 'components/Form'
import Upload from 'components/Upload'
import { Button, Icon } from 'antd'
import { prescriptionSchema } from 'utils/Schema'

const AddressForm = ({ initialValues, onSubmit }) => {
  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues }
    return {}
  }, [initialValues])

  const formItems = [
    {
      key: 'prescription',
      label: 'Prescription',
      type: (
        <Upload name="prescription" maxCount={0} accept=".pdf,application/pdf,image/*">
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
      ),
    },
  ]

  return (
    <Form
      enableReinitialize
      formItems={formItems}
      initialValues={initialVals}
      schema={prescriptionSchema}
      onSubmit={onSubmit}
    />
  )
}

export default AddressForm
