import React from 'react'
import CardWrapper from 'components/CardWrapper'
import { Button, Icon, notification } from 'antd'
import Upload from 'components/Upload'
import Form from 'components/Form'
import { excelUploadSchema, prodImgsSchema } from 'utils/Schema'
import { uploadExcel, uploadProdImgs } from 'services'
// import Redirect from 'react-router-dom/Redirect'

const UploadData = () => {
  const handleExcelSubmit = async ({ file }) => {
    const success = await uploadExcel(file[0].originFileObj)
    if (success)
      notification.success({
        message: 'Uploaded successfully',
      })
  }

  const handleImgsSubmit = async ({ file }) => {
    const success = await uploadProdImgs(file.map(i => i.originFileObj))
    if (success)
      notification.success({
        message: 'Uploaded successfully',
      })
  }

  const excelFI = [
    {
      label: '',
      name: 'file',
      key: 'file',
      type: (
        <Upload name="image" multiple={false} maxCount={1}>
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
      ),
    },
  ]

  const prodImagesFI = [
    {
      label: '',
      name: 'file',
      key: 'file',
      type: (
        <Upload name="image" multiple>
          <Button>
            <Icon type="upload" /> Select File(s)
          </Button>
        </Upload>
      ),
    },
  ]
  return (
    <>
      <CardWrapper title="Upload Excel">
        <Form onSubmit={handleExcelSubmit} formItems={excelFI} schema={excelUploadSchema} />
      </CardWrapper>
      <CardWrapper title="Upload Product Images">
        <Form onSubmit={handleImgsSubmit} formItems={prodImagesFI} schema={prodImgsSchema} />
      </CardWrapper>
    </>
  )
}

export default UploadData
