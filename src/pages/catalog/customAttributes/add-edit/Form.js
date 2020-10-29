/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useMemo, useState } from 'react'
import { withRouter } from 'react-router'
import { customAttrubitesSchema } from 'utils/Schema'
import Form from 'components/Form'
// import { Input, Button } from 'antd'
import { Input, Radio, Select, Button, Icon } from 'antd'
import Upload from 'components/Upload'
import AddNew from 'components/CustomComponents/AddNew'
import { isEmpty, isUndefined } from 'lodash'

const { Option, OptGroup } = Select

const CustomAttributes = ({ initialValues, handleSubmit }) => {
  const [formItemsData, setformItemsData] = useState([{ _id: 'index[0]', deleted: false }])
  const [imageList, setimageList] = useState({})

  const initialVals = useMemo(() => {
    if (initialValues) {
      const { options } = initialValues
      const data = {}
      const imageListtemp = []
      const formcount = []
      if (!isEmpty(options)) {
        options.forEach((e, ind) => {
          const { value, filename, imagePath, _id } = e
          imageListtemp.push({ [`value[${ind}]`]: { filename, imagePath, _id } })
          data[`image[${ind}]`] = [
            {
              uid: _id,
              url: imagePath,
              filename,
            },
          ]
          data[`value[${ind}]`] = value
          formcount.push({ _id: `index[${ind}]`, deleted: false })
        })
        setformItemsData(formcount)
        setimageList(imageListtemp)
        return { ...initialValues, ...data }
      }
      return { ...initialValues }
    }
    return { status: 'active' }
  }, [initialValues])

  const submitForm = async (formValue) => {
    console.log('formValue', formValue, imageList)
    if (conditions.includes(formValue.inputType)) {
      const { mainValues } = formValue
      const values = []
      const image = []
      mainValues.forEach((e) => {
        if (e.deleted === false) {
          const abc = e._id.split(/[[\]]{1,2}/)
          image.push(imageList[`value[${abc[1]}]`])
          const { name } = imageList[`value[${abc[1]}]`]
          const value = formValue[`value[${abc[1]}]`]

          values.push({ value, image: name })

          delete formValue[`value[${abc[1]}]`]
          delete formValue[`image[${abc[1]}]`]
        }
      })
      delete formValue.mainValues

      console.log('value form', { ...formValue, values, image })
      const data = { ...formValue, values, image }
      if (handleSubmit) handleSubmit(data)
    } else {
      const data = { ...formValue }
      if (handleSubmit) handleSubmit(data) //
    }
  }

  const formItems = [
    {
      type: <Input name="label" />,
      key: 'label',
      label: 'Lebal',
    },
    {
      type: <Input />,
      key: 'code',
      label: 'Code',
    },
    {
      type: (
        <Select defaultValue="lucy">
          <Option value="" selected="selected">
            Select
          </Option>
          <OptGroup label="Text">
            <Option value="field">Field</Option>
            <Option value="area">Area</Option>
          </OptGroup>
          <OptGroup label="Select">
            <Option value="drop-down">Drop-down</Option>
            <Option value="multiple-select">Multiple Select</Option>
          </OptGroup>
          <OptGroup label="Date">
            <Option value="date">Date</Option>
            <Option value="date&time">Date &amp; Time</Option>
            <Option value="time">Time</Option>
          </OptGroup>
          <OptGroup label="File">
            <Option value="file">File</Option>
          </OptGroup>
        </Select>
      ),
      key: 'inputType',
      label: 'Input Type',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="yes" value="yes">
            Yes
          </Radio.Button>
          <Radio.Button key="no" value="no">
            No
          </Radio.Button>
          <Radio.Button key="none" value="none">
            None
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'useInFilter',
      label: 'Use In Filter',
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
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="yes" value="yes">
            Yes
          </Radio.Button>
          <Radio.Button key="no" value="no">
            No
          </Radio.Button>
          <Radio.Button key="none" value="none">
            None
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'comparableOnfrontend',
      label: 'Comparable On Frontend',
    },
    {
      type: (
        <Radio.Group buttonStyle="solid">
          <Radio.Button key="true" value={true || 'true'}>
            True
          </Radio.Button>
          <Radio.Button key="false" value={false || 'false'}>
            False
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'useInRecemondation',
      label: 'Use In Recemondation',
    },
  ]

  const onRemove = (i) => {
    const data = formItemsData.map((e) => {
      if (e._id === i._id) {
        return { ...e, deleted: true }
      }
      return { ...e }
    })
    console.log('sasfs', data, i)
    setformItemsData(data)
  }

  const fromItems2 = formItemsData.map((i, ind) => {
    return [
      {
        type: (
          <div>
            <Input name={`value[${ind}]`} width="auto" />
            <Upload
              name={`image[${ind}]`}
              maxCount={1}
              onChange={(e) => {
                console.log('onimage change', e)
                setimageList((prev) => ({ ...prev, [`value[${ind}]`]: e[0] }))
              }}
              accept="image/*"
            >
              <Button>
                <Icon type="upload" /> Select File
              </Button>
            </Upload>
            <AddNew onRemove={() => onRemove(i)} attribute="" />
          </div>
        ),
        key: `image[${ind}]`,
        label: 'Value',
        deleted: i.deleted,
        className: 'w-100',
      },
    ]
  })

  const form = (
    <Form.Provider
      initialValues={initialVals}
      onSubmit={submitForm}
      schema={customAttrubitesSchema}
    >
      <Form.Consumer>
        {({ onSubmit, setValues, values }) => {
          useEffect(() => {
            if (conditions.includes(values.inputType)) {
              setValues((e) => ({ ...e, mainValues: formItemsData }))
            }
          }, [values.inputType])

          useEffect(() => {
            setValues((e) => ({ ...e, mainValues: formItemsData }))
          }, [formItemsData])

          let from2 = ''
          if (!isUndefined(values.inputType) && conditions.includes(values.inputType)) {
            from2 = (
              <>
                <AddNew
                  pullRight={false}
                  add
                  onClick={() => {
                    setformItemsData((e) => [...e, { _id: `index[${e.length}]`, deleted: false }])
                  }}
                  attribute=""
                />
                {fromItems2.map((i, index) => {
                  return (
                    <Form
                      // formItemLayout={{ ...formItemLayout }}
                      initialValues={initialVals}
                      key={`links${index}`}
                      formItems={i.filter((j) => j.deleted === false)}
                    />
                  )
                })}
              </>
            )
          }

          return (
            <>
              <Form formItems={formItems} />
              {from2}
              <Button type="primary" onClick={onSubmit}>
                Submit
              </Button>
            </>
          )
        }}
      </Form.Consumer>
    </Form.Provider>
  )
  return form
}

const conditions = ['drop-down', 'multiple-select']

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 5 },
//     lg: { span: 5 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 9 },
//     lg: { span: 6 },
//     // lg: { span: 18 },
//   },
// }
export default withRouter(CustomAttributes)
