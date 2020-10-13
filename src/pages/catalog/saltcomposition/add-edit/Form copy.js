/* eslint-disable no-plusplus */
/* eslint-disable no-throw-literal */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useMemo, useState } from 'react'
import { Form, Input, Button, Radio, notification, Popconfirm, Icon } from 'antd'
import { slatCompositionSchema } from 'utils/Schema'
import { formItemLayout, tailFormItemLayout } from 'utils'
import { withRouter } from 'react-router-dom'
import useFormValidation from 'hooks/useFormValidation'
import { STRINGS, CATALOG_API_URL } from '_constants'
import AddNew from 'components/CustomComponents/AddNew'
// import shortid from 'shortid'
import { editData } from 'services'
import styles from '../../style.module.scss'

const FormA = ({ initialValues, onSuccess }) => {
  const [inputs, setinputs] = useState([])

  const initialVal = useMemo(() => {
    if (initialValues?._id) {
      const { values, ...rest } = initialValues

      const dATA = values?.map((element, item) => {
        return {
          value: element.value,
          _id: element._id,
          name: `name[${item}]`,
        }
      })

      setinputs(dATA)
      return { ...rest }
    }

    return { status: 'active' }
  }, [initialValues])

  useEffect(() => {
    setValues({
      ...initialVal,
    })
  }, [initialVal])

  useEffect(() => {
    console.log('final vals', values)
  }, [values])

  const fetchSubmit = async (value) => {
    const a = initialValues
      ? await editData(`${CATALOG_API_URL.saltComposition}/${initialValues._id}`, value, 'json')
      : await editData(`${CATALOG_API_URL.saltComposition}/create`, value, 'json', 'POST')
    setSubmitting(false)
    if (!a.error) {
      onSuccess()
      notification.success({
        message: STRINGS.success,
        description: initialValues ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
    }
  }

  const submitForm = () => {
    try {
      const value = []
      let count = 0
      console.log('form Values', values, inputs)
      Object.keys(values).forEach((key) => {
        const splited = key.split(/[[\]]{1,2}/)
        if (splited && splited[0] === 'input') {
          value.push(values[key])
          delete values[key]
          count++
        }
      })
      if (count === 0) {
        throw { message: 'Please Add atleast one name' }
      }

      fetchSubmit({ ...values, name: value })
    } catch (err) {
      notification.error({
        message: STRINGS.error,
        description: err.message,
      })
      setSubmitting(false)
    }
  }

  const handleAdd = () => {
    const item = {
      value: '',
      _id: `input[${inputs.length}]`,
      name: `input[${inputs.length}]`,
    }

    setinputs((prev) => {
      return [...prev, { ...item }]
    })
  }

  const handleDelete = (id) => {
    if (id.split(/[[\]]{1,2}/)[0] === 'input') {
      setinputs((prev) => prev.filter((i) => i._id !== id))
    }
  }

  const onInputChnage = (id, value, name) => {
    const newData = inputs?.map((i) => {
      if (i._id === id) {
        return {
          value,
          _id: i._id,
          name,
        }
      }
      return i
    })
    setinputs(newData)
  }
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
  } = useFormValidation(initialVal, slatCompositionSchema, submitForm) // file as object {fileInputName:'icon', maxCount:1}

  const formItems = [
    // {
    //   type: <Input value={values.name} name="name" />,
    //   key: 'name',
    //   label: 'Name',
    //   error: errors.name,
    // },
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
      type: <AddNew pullRight={false} add onClick={handleAdd} attribute="conposition name" />,
      key: 'add test',
      className: 'add-new-test-btn',
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
      {formItems.map((item) => {
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
      <div className={styles.attributesGroup}>
        {inputs?.map((item) => {
          const key = item._id
          return (
            <div key={key}>
              <Input
                onChange={(e) => onInputChnage(item._id, e.target.value, e.target.name)}
                autoFocus
                name={item.name}
                value={item.value}
                addonAfter={
                  <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(item._id)}>
                    <Icon type="close" style={{ color: '#df071a' }} />
                  </Popconfirm>
                }
                defaultValue={item.value}
              />
            </div>
          )
        })}
      </div>
      <Form.Item {...tailFormItemLayout}>
        <Button disabled={isSubmitting} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default withRouter(FormA)
