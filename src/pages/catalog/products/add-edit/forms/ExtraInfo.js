/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'

import PropTypes from 'prop-types'
import AddNew from 'components/CustomComponents/AddNew'
import Editor from 'components/Editor'
import { isEmpty } from 'lodash'
import { FormContext } from '../tabs'
// import { isEmpty } from 'lodash'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 12 },
    // lg: { span: 18 },
  },
}

const CSEO = ({ hideSubmit, hasTitle, formControls }) => {
  const formContext = React.useContext(FormContext)

  const {
    onChange,
    values,
    onSubmit,
    onBlur,
    // errors,
    setValues,
    // setSubmitting,
    isSubmitting,

    // validateForm,
  } = formControls || formContext

  // const [load, setLoad] = useState(false)

  const [formItems, setformItems] = useState([
    {
      _id: 'input[0]',
      title: 'contentTitle[0]',
      data: 'contentData[0]',
    },
  ])

  useEffect(() => {
    const { contents } = values
    if (!isEmpty(contents) && contents?.length > 0) {
      const data = contents.map((i, ind) => ({
        _id: `input[${ind}]`,
        title: `contentTitle[${ind}]`,
        data: `contentData[${ind}]`,
      }))
      setformItems(data)
      setValues((prev) => ({ ...prev, contents: data }))
    }
  }, [])

  // useEffect(() => {
  //   if (load) {
  //     const temp = []
  //     formItems.forEach((i) => {
  //       temp.push(i.title)
  //       temp.push(i.data)
  //     })
  //     setformItems(data2)
  //     setValues(() => result)
  //     setLoad(true)
  //   }
  // }, [values])

  const onAdd = () => {
    const num =
      formItems.length > 0 ? Number(formItems.reverse()[0]?._id.split(/[[\]]{1,2}/)[1]) + 1 : 0
    const temp = formItems
    temp.push({
      _id: `input[${num}]`,
      title: `contentTitle[${num}]`,
      data: `contentData[${num}]`,
    })

    setformItems(() => temp)

    setValues((prev) => ({ ...prev, contents: temp }))
  }

  const onRemove = (id, data, title) => {
    // const result = omit(values, [data, title])
    const data2 = formItems.filter((i) => i._id !== id)
    setformItems(data2)
    setValues((prev) => ({ ...prev, contents: data2 }))
    console.log('before reomve', formItems, id, data, title)
  }

  return (
    <>
      <Form
        onChange={onChange}
        onBlur={onBlur}
        onSubmit={onSubmit}
        labelAlign="right"
        {...formItemLayout}
      >
        {hasTitle && (
          <h4 className="text-black mb-3">
            <strong>Extra Info</strong>
          </h4>
        )}
        <AddNew add attribute="Extra Info" pullRight={false} onClick={onAdd} />
        {!isEmpty(formItems)
          ? formItems.map((item, index) => {
              return (
                <div key={`index${index}`}>
                  <Form.Item
                    label="Title"
                    // validateStatus={item.error && 'error'}
                    // help={item.error}
                  >
                    <Input
                      name={item.title}
                      value={values[item.title] || ''}
                      onChange={(val) =>
                        setValues((prev) => ({ ...prev, [item.title]: val.target.value }))
                      }
                    />
                  </Form.Item>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <AddNew
                      attribute="Extra Info"
                      pullRight
                      onRemove={() => onRemove(item._id, item.data, item.title)}
                    />
                  </div>
                  <Form.Item
                    label="Data"
                    // validateStatus={item.error && 'error'}
                    // help={item.error}
                  >
                    <Editor
                      onChange={(val) => setValues((prev) => ({ ...prev, [item.data]: val }))}
                      name={item.data}
                      placeholder="Write something..."
                      editorHtml={values[item.data] || ''}
                    />
                  </Form.Item>
                </div>
              )
            })
          : ''}
        {!hideSubmit && (
          <Form.Item>
            <Button disabled={isSubmitting} type="primary" htmlType="submit">
              Continue
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  )
}

CSEO.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

CSEO.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default CSEO
