/* eslint-disable no-underscore-dangle */
import React from 'react'
import useFormValidation from 'hooks/useFormValidation'
import { attributeGroupSchema } from 'utils/Schema'
import { Input, Switch, Icon, Button, Popconfirm, Form, InputNumber } from 'antd'
import { formItemLayout, tailFormItemLayout } from 'utils'
import styles from '../style.module.scss'

const addIconStyle = { color: '#df071a' }

const AttrForm = ({ data }) => {
  let initialValues = { values: [] }

  //   React.useEffect(() => {
  //       effect
  //       return () => {
  //           cleanup
  //       };
  //   }, [input])

  if (data) initialValues = data
  console.log(data, initialValues)

  const submitForm = () => {
    console.log('submitting form', values)
  }

  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    // setSubmitting,
    isSubmitting,
    // validateForm,
  } = useFormValidation(initialValues, attributeGroupSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}

  const onStatusChange = React.useCallback(m => {
    console.log(m)
    setValues(a => ({ ...a, status: !a.status }))
  }, [])

  const onPriorityOrderChange = React.useCallback(e => {
    console.log('onPriorityOrderChange', e)
  }, [])

  const handleAddAttribute = () => {
    console.log('add attrVal')
  }

  const handleDeleteAttrVal = () => {
    console.log('delete attrVal')
  }

  const formItems = [
    {
      type: <Input value={values.name} name="name" placeholder="Attribute group" />,
      key: 'name',
      label: 'Attribute group',
      error: errors.error,
    },
    {
      row: true,
      col: 1,
      type: (
        <Switch
          onChange={onStatusChange}
          checked={values.status === 'active'}
          // disabled={record.status === 'inactive'}
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
        />
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      row: true,
      col: 1,
      type: <InputNumber onChange={onPriorityOrderChange} />,
      key: 'priorityOrder',
      label: 'Priority Order',
      error: errors.priorityOrder,
    },
    {
      type: (
        <div className={styles.attributesGroup}>
          {values.values.map((item, index) => {
            // const key = shortid.generate()
            const key = item._id
            // console.log(item)
            return (
              <div key={key}>
                <Input
                  onChange={e => this.onAttributeValChange(e, item._id, key, index)}
                  key={key}
                  // autoFocus='true'
                  addonAfter={
                    <Popconfirm
                      key={key}
                      title="Sure to delete?"
                      onConfirm={() => handleDeleteAttrVal(item._id)}
                    >
                      <Icon key={key} type="close" style={addIconStyle} />
                    </Popconfirm>
                  }
                  defaultValue={item.value}
                />
              </div>
            )
          })}
          <div>
            <Button onClick={handleAddAttribute} shape="circle" icon="plus" />
          </div>
        </div>
      ),
      key: 'values',
      label: 'Attribute values',
      error: errors.values,
    },
  ]

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

export default AttrForm
