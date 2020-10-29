/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState } from 'react'
import { Button, Icon, Input, Radio } from 'antd'
import Form from 'components/Form'
import { manufactureSchema } from 'utils/Schema'
import Upload from 'components/Upload'
// import useFetching from 'hooks/useFetchingNoReducers'
// import { CATALOG_API_URL } from '_constants'

const CountryEditForm = ({ initialValues, onSubmit }) => {
  const [images, setImages] = useState([])
  const initialVals = useMemo(() => {
    if (initialValues) {
      setImages(
        initialValues.image.map((item) => {
          return {
            uid: item._id,
            name: item.url,
            url: item.url,
            thumbnail: item.thumbnail,
          }
        }),
      )
      return { ...initialValues }
    }
    return { status: 'active' }
  }, [initialValues])

  const handleChange = (file, name) => {
    console.log('aaaaanadvjash', file, name)
  }

  const onBeforeSubmit = (data) => {
    const imagesArry = data?.image?.length > 0 ? data?.image?.map((i) => i.uid) : []
    const deletedImage = []
    if (initialVals?.image && initialVals?.image.length > 0) {
      initialVals.image.forEach((element) => {
        if (!imagesArry.includes(element._id)) {
          deletedImage.push(element._id)
        }
      })
    }
    if (onSubmit) onSubmit({ ...data, deletedImage })
  }

  const formItems = [
    //     name:manufacture1234
    // status:hold
    // description:dsfsdfs
    // image:file
    {
      type: <Input />,
      key: 'name',
      label: 'Name',
    },
    {
      type: <Input />,
      key: 'description',
      label: 'Description',
    },
    {
      label: 'Images',
      key: 'image',
      name: 'image',
      type: (
        <Upload
          accept="image/*"
          defaultFileList={images || []}
          // fileList={images || []}
          onChange={handleChange}
        >
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
      ),
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
  ]

  return (
    <Form
      formItems={formItems}
      initialValues={initialVals}
      schema={manufactureSchema}
      onSubmit={onBeforeSubmit}
    />
  )
}

export default CountryEditForm
