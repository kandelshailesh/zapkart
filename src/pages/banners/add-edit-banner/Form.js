/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, InputNumber, notification, Upload, Icon } from 'antd'
import { bannerSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout, getBaseName } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { addBanner,editBanner } from 'services/banners'
import { STRINGS, LINKS } from '_constants'
import useUpload from 'hooks/useUpload'

const FormA = ({ data }) => {
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const initialValues = {
    status: 'hold',
  }

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1)

  useEffect(() => {
    if (data) {
      let himg = []
      if (data.images.length > 0) {
        himg = data.images.map(item => {
          return {
            uid: item._id,
            name: getBaseName(item.url),
            url: item.url,
            thumbUrl: item.thumbnail,
          }
        })
      }
      setValues({
        ...data,
        images: himg,
      })
      console.log(initialValues)
      setFileListImages(himg)
    }
  }, [data])

  useEffect(() => {
      setValues(a => ({ ...a, images: fileListImages }))
  }, [fileListImages])

  

  const propsImages = {
    multiple: true,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages
  }

  const [success, setSuccess] = useState(false)

  const fetchSubmit = async () => {
    const modImgs = values.images.map(i => i.originFileObj)
    console.log(values.images)
    const a = data
      ? await editBanner(data._id, values, data)
      : await addBanner({ ...values, images: modImgs })
    setSubmitting(false)
    if (a) {
      notification.success({
        message: STRINGS.success,
        description: data ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      setSuccess(true)
    }
  }

  const submitForm = () => {
    try {
      console.log('will submitform', values)
      fetchSubmit()
    } catch (err) {
      setSubmitting(false)
    }
  }

  console.log(initialValues)
  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    setSubmitting,
    isSubmitting,
    // validateForm,
    // touched,
    // setTouched,
  } = useFormValidation(initialValues, bannerSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
  console.log(values)

  const formItems = [
    { heading: 'General' },
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
    },
    {
      type: (
        <Radio.Group name="status" defaultValue="hold" buttonStyle="solid">
          <Radio.Button checked={values.status === 'active'} value="active">
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'hold'} value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: <Input value={values.shortDescription} name="shortDescription" />,
      key: 'shortDescription',
      label: 'Text',
      error: errors.shortDescription,
    },
    {
        type: <Input value={values.imglink} name="imglink" />,
        key: 'imglink',
        label: 'Link',
        error: errors.imglink,
      },
    {
      type: (
        <InputNumber
          onChange={e => setValues(a => ({ ...a, priorityOrder: e }))}
          name="priorityOrder"
          value={values.priorityOrder}
          min={0}
        />
      ),
      key: 'priorityOrder',
      label: 'Priority ',
      error: errors.priorityOrder,
    },
    {
      type: <Input value={values.imgtext} name="imgtext" />,
      key: 'imgtext',
      label: 'Image Text',
      error: errors.imgtext,
    },
    {
      label: 'Images',
      error: errors.images,
      key: 'images',
      name: 'images',
      type: (
        <>
          <Upload listType="picture-card" name="image" {...propsImages}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
  ]

  if (success) return <Redirect to={LINKS.banners} />

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map(item => {
        if (item.heading)
          return (
            <h4 key={item.heading} className="text-black mb-3">
              <strong>{item.heading}</strong>
            </h4>
          )
        return (
          <Form.Item
            key={item.key}
            label={item.label}
            validateStatus={item.error && 'error'}
            help={item.error}
          >
            {item.type}
          </Form.Item>
        )
      })}
      <Form.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(FormA)
