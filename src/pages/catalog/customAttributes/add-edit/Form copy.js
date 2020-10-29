/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import { customAttrubitesSchema } from 'utils/Schema'
import useFormValidation from 'hooks/useFormValidation'
import BasicForm from './BasicForm'

export const FormContext = React.createContext({})
const FormProvider = FormContext.Provider

const CustomAttributes = ({ initialValues, handleSubmit }) => {
  const initialVals = useMemo(() => {
    if (initialValues) return { ...initialValues }
    return { status: 'active' }
  }, [initialValues])

  const submit = (val) => {
    console.log('final Data is coming', values, val)
    if (handleSubmit) handleSubmit()
  }

  console.log('values', values)

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
  } = useFormValidation(initialVals, customAttrubitesSchema, submit, false)

  // const formItems = [
  //   {
  //     type: (
  //       <Input
  //         name="label"
  //         value={values.label}
  //         onChange={(e) => {
  //           setValues((prev) => ({ ...prev, label: e.target.value }))
  //         }}
  //       />
  //     ),
  //     key: 'label',
  //     label: 'Lebal',
  //   },
  //   {
  //     type: <Input />,
  //     key: 'code',
  //     label: 'Code',
  //   },
  //   {
  //     type: (
  //       <Select defaultValue="lucy">
  //         <Option value="" selected="selected">
  //           Select
  //         </Option>
  //         <OptGroup label="Text">
  //           <Option value="textbox">Field</Option>
  //           <Option value="textarea">Area</Option>
  //         </OptGroup>
  //         <OptGroup label="Select">
  //           <Option value="select">Drop-down</Option>
  //           <Option value="multiselect">Multiple Select</Option>
  //         </OptGroup>
  //         <OptGroup label="Date">
  //           <Option value="date">Date</Option>
  //           <Option value="datetime">Date &amp; Time</Option>
  //           <Option value="time">Time</Option>
  //         </OptGroup>
  //         <OptGroup label="File">
  //           <Option value="file">File</Option>
  //         </OptGroup>
  //       </Select>
  //     ),
  //     key: 'inputType',
  //     label: 'Input Type',
  //   },
  //   {
  //     type: (
  //       <Radio.Group buttonStyle="solid">
  //         <Radio.Button key="yes" value="yes">
  //           Yes
  //         </Radio.Button>
  //         <Radio.Button key="no" value="no">
  //           No
  //         </Radio.Button>
  //         <Radio.Button key="none" value="none">
  //           None
  //         </Radio.Button>
  //       </Radio.Group>
  //     ),
  //     key: 'useInFilter',
  //     label: 'Use In Filter',
  //   },
  //   {
  //     type: (
  //       <Radio.Group buttonStyle="solid">
  //         <Radio.Button key="active" value="active">
  //           Active
  //         </Radio.Button>
  //         <Radio.Button key="hold" value="hold">
  //           Hold
  //         </Radio.Button>
  //       </Radio.Group>
  //     ),
  //     key: 'status',
  //     label: 'Status',
  //   },
  //   {
  //     type: (
  //       <Radio.Group buttonStyle="solid">
  //         <Radio.Button key="yes" value="yes">
  //           Yes
  //         </Radio.Button>
  //         <Radio.Button key="no" value="no">
  //           No
  //         </Radio.Button>
  //         <Radio.Button key="none" value="none">
  //           None
  //         </Radio.Button>
  //       </Radio.Group>
  //     ),
  //     key: 'comparableOnfrontend',
  //     label: 'Comparable On Frontend',
  //   },
  //   {
  //     type: (
  //       <Radio.Group buttonStyle="solid">
  //         <Radio.Button key="true" value={true || 'true'}>
  //           True
  //         </Radio.Button>
  //         <Radio.Button key="false" value={false || 'false'}>
  //           False
  //         </Radio.Button>
  //       </Radio.Group>
  //     ),
  //     key: 'useInRecemondation',
  //     label: 'Use In Recemondation',
  //   },
  // ]

  return (
    <FormProvider
      value={{
        // setErrors,
        values,
        setValues,
        onChange,
        onSubmit,
        onBlur,
        isSubmitting,
        errors,
        setSubmitting,
        // validateForm,
      }}
    >
      <BasicForm />
      {/* <Form
        enableReinitialize
        formItems={formItems}
        initialValues={initialVals}
        schema={customAttrubitesSchema}
        // onSubmit={onSubmit}
      /> */}
      {/* <Form
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

          if (item.dependency) {
            if (values[item.dependency] === 'true' || values[item.dependency] === true) {
              console.log(values[item.dependency], typeof values[item.dependency])
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
            }
            return null
          }

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
        {
          <Form.Item>
            <Button onClick={onSubmit} disabled={isSubmitting} type="primary">
              Submit
            </Button>
          </Form.Item>
        }
      </Form> */}
    </FormProvider>
  )
}

export default CustomAttributes
