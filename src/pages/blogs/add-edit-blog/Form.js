/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Radio, InputNumber, notification, Upload, Icon } from 'antd'
import { blogSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout, getBaseName } from 'utils'
import { withRouter, Redirect } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { addBlog,editBlog } from 'services/blogs'
import { STRINGS, LINKS } from '_constants'
import Editor from 'components/Editor'
import useUpload from 'hooks/useUpload'

const FormA = ({ data }) => {
  useEffect(() => {
    console.log(values, errors)
  }, [values, errors])

  const initialValues = {
    status: 'hold',
    feature: 'hold',
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
        metaTitle: data.seo.metaTitle,
        metaKeywords: data.seo.metaKeywords,
        metaDescription: data.seo.metaDescription,
      })
      console.log(initialValues)
      setFileListImages(himg)
    }
  }, [data])

  useEffect(() => {
      setValues(a => ({ ...a, images: fileListImages }))
  }, [fileListImages])

  const handleEditorChange = e => {
    setValues(a => ({
      ...a,
      htmlContent: e,
    }))
  }

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
      ? await editBlog(data._id, values, data)
      : await addBlog({ ...values, images: modImgs })
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
  } = useFormValidation(initialValues, blogSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}
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
        type: (
          <Radio.Group name="feature" defaultValue="hold" buttonStyle="solid">
            <Radio.Button checked={values.feature === 'active'} value="active">
              Active
            </Radio.Button>
            <Radio.Button checked={values.feature === 'hold'} value="hold">
              Hold
            </Radio.Button>
          </Radio.Group>
        ),
        key: 'feature',
        label: 'Featured',
        error: errors.feature,
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
      type: <Input value={values.shortDescription} name="shortDescription" />,
      key: 'shortDescription',
      label: 'Short Description',
      error: errors.shortDescription,
    },
    {
      type: <Input value={values.imgtext_data} name="imgtext_data" />,
      key: 'imgtext_data',
      label: 'Image Text',
      error: errors.imgtext_data,
    },
    {
      label: 'Images',
      error: errors.images,
      key: 'image',
      name: 'image',
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
    {
      type: (
        <Editor
          placeholder="Write something..."
          editorHtml={values.htmlContent || ''}
          onChange={handleEditorChange}
        />
      ),
      label: 'Content',
      error: errors.htmlContent,
      key: 'htmlContent',
    },
    {
      heading: 'SEO',
    },
    {
      type: <Input value={values.metaTitle} name="metaTitle" />,
      key: 'metaTitle',
      label: 'Meta Title',
      error: errors.metaTitle,
    },
    {
      type: <Input value={values.metaDescription} name="metaDescription" />,
      key: 'metaDescription',
      label: 'Meta Description',
      error: errors.metaDescription,
    },
    {
      type: <Input value={values.metaKeywords} name="metaKeywords" />,
      key: 'metaKeywords',
      label: 'Meta Keywords',
      error: errors.metaKeywords,
    },
  ]

  if (success) return <Redirect to={LINKS.blogs} />

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
