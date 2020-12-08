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
import Axios from 'axios'
import { getFormData } from '../../../../utils/index'

const { Option, OptGroup } = Select

const CustomAttributes = ({ initialValues, handleSubmit }) => {
  const [formItemsData, setformItemsData] = useState([{ _id: 'index[0]', deleted: false }])
  const [imageList, setimageList] = useState({})
  const [customImage, setcustomImage] = useState([])
  const [editValue, seteditValue] = useState([])
  const [editImage, seteditImage] = useState([])

  const initialVals = useMemo(() => {
    if (initialValues) {
      console.log(editValue)
      console.log(editImage)
      const { options } = initialValues
      const data = {}
      const imageListtemp = []
      const formcount = []
      if (!isEmpty(options)) {
        // alert('not empty')
        options.forEach((e, ind) => {
          const { value, filename, imagePath, _id } = e
          imageListtemp.push({ [`value[${ind}]`]: { filename, imagePath, _id } })
          seteditImage((prev) => [
            ...prev,
            [
              {
                uid: _id,
                url: imagePath,
                filename,
              },
            ],
          ])
          data[`image[${ind}]`] = [
            {
              uid: _id,
              url: imagePath,
              filename,
            },
          ]

          data[`value[${ind}]`] = value
          seteditValue((prev) => [...prev, value])
          formcount.push({ _id: `index[${ind}]`, deleted: false, ...data })
        })
        setformItemsData(formcount)
        setimageList(imageListtemp)
        // const testing = { ...initialValues, ...data }
        // console.log(JSON.stringify(testing, null, 2))
        return { ...initialValues, ...data }
      }
      return { ...initialValues }
    }
    return { status: 'active' }
  }, [initialValues])

  const submitForm = async (formValue) => {
    console.log('formValue', formValue, imageList, customImage)
    if (conditions.includes(formValue.inputType)) {
      const { mainValues } = formValue
      const values = []
      const image = []
      mainValues.forEach((e) => {
        if (e.deleted === false) {
          const abc = e._id.split(/[[\]]{1,2}/)
          if (imageList) {
            image.push(imageList[`value[${abc[1]}]`].originFileObj)
          }
          const { name = '' } = imageList[`value[${abc[1]}]`]
          const value = formValue[`value[${abc[1]}]`]
          values.push({ value, image: name })
          delete formValue[`value[${abc[1]}]`]
          delete formValue[`image[${abc[1]}]`]
        }
      })
      delete formValue.mainValues
      if (formValue['']) {
        delete formValue['']
      }

      console.log('value form', { ...formValue, values })

      if (handleSubmit) {
        const data = { ...formValue, values }
        // const finalImage = Object.keys(customImage).map((value) => ({
        //   customImage: customImage[value],
        // }))
        // console.log('Final Image', finalImage)

        const formData = getFormData(data)

        // console.log('formdata', formData)
        // Object.keys(customImage).forEach((key) => {
        //   // console.log(key,value)
        //   formData.append('customImage', customImage[key])
        // })
        customImage.forEach((key) => {
          // console.log(key,value)
          formData.append('customImage', customImage[key].originFileObj)
        })
        // handleSubmit(formData)
        Axios.post(
          'http://zapkartbackend.riolabz.com/api/catalog/v1/customattributes/create',
          // 'http://localhost:5002/testing',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )
          .then((result) => console.log(result))
          .catch((err) => console.log(err))
      } else {
        const data = { ...formValue }
        if (handleSubmit) handleSubmit(data) //
      }
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

  // const handleChnage = () => {}

  const fromItems2 = formItemsData.map((i, ind) => {
    return [
      {
        type: (
          <div>
            <Input
              name={`value[${ind}]`}
              defaultValue={editValue.length > 0 ? editValue[ind] : ''}
              onBlur={(e, w) => console.log('aaaa anshu', e, w)}
              width="auto"
            />
            <Upload
              name={`image[${ind}]`}
              defaultFileList={editImage.length > 0 ? editImage[ind] : []}
              // name="customImage"
              maxCount={1}
              // onChange={(value, name) => {
              //   console.log('hello', name, value)
              //   setimageList((prev) => ({ ...prev, [name]: value }))
              // }}
              onChange={(file) => {
                // setimageList((prev) => ({ ...prev, [`value[${ind}]`]: e[0] }))
                // if (file[0]) {
                //   setCustomImage((prev) => ({}))
                // }
                setimageList((prev) => ({ ...prev, [`value[${ind}]`]: file[0] }))
                setcustomImage((prev) => ({ ...prev, [`value[${ind}]`]: file[0] }))
              }}
              // name: file[0].originFileObj,
              // [`value[${ind}]`]: file[0].originFileObj

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
          /* useEffect(() => {
          //   setValues((e) => ({ ...e, mainValues: formItemsData }))
          // }, [formItemsData]) */

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
