/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Input, Form, Switch, Icon, Button, Skeleton, Popconfirm, notification } from 'antd'
import shortid from 'shortid'
import { Helmet } from 'react-helmet'
import { EDIT_SUCCESS_MESSAGE, SUCCESS, API_URL } from '_constants'
import uniqBy from 'lodash/uniqBy'
import differenceBy from 'lodash/differenceBy'

import styles from '../style.module.scss'

const FormItem = Form.Item

@Form.create()
class AttributesEdit extends React.Component {
  abortController = new AbortController()

  state = {
    attribute_group_code: '',
    name: '',
    status: '',
    record: '',
    loading: false,
    values: '',

    editedValues: [],

    newValues: [],

    deletedValues: [],
  }

  componentDidMount() {
    const { match } = this.props
    const { params } = match
    const { id } = params
    console.log(id)
    this.fetchDetails(id)
    // const record = dataAtr.data.find(item => item.id === id)
    // const attributesList = record.values;
    // this.setState({ record, attributesList, loading: false })
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  fetchDetails = async id => {
    this.setState({
      loading: true,
    })
    const url = `${API_URL.attributeUrl}/${id}`
    const options = {
      METHOD: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(url, options, { signal: this.abortController.signal })
    console.log(response)
    if (response.ok) {
      const responseJSON = await response.json()
      console.log(responseJSON)
      const { data } = responseJSON
      console.log(data)
      this.setState({
        record: data,
        loading: false,
        values: data.values,
        origValues: data.values,
        attribute_group_code: data.attribute_group_code,
        status: data.status,
        name: data.name,
      })
    }
  }

  handleDelete = id => {
    console.log(id)
    const { values, newValues, editedValues, record } = this.state
    let deletedValues
    const arr = values.filter(item => item._id !== id)
    const deletedValueObj = {
      _id: id,
    }
    const add = record.values.findIndex(a => a._id === id) > -1

    const newValuesFilter = newValues.filter(item => item._id !== id)
    const editedFilter = editedValues.filter(item => item._id !== id)
    this.setState(prevState => {
      if (add) {
        deletedValues = [...prevState.deletedValues, deletedValueObj]
      } else {
        deletedValues = [...prevState.deletedValues]
      }
      return {
        values: [...arr],
        deletedValues: [...deletedValues],
        newValues: [...newValuesFilter],
        editedValues: [...editedFilter],
      }
    })
  }

  handleAddAttribute = e => {
    console.log('in handleAddAttribute')
    console.log(e)
    console.log(e.target.value)
    const { values, newValues } = this.state
    const newId = shortid.generate()
    const item = {
      value: '',
      _id: newId,
    }
    this.setState({ values: [...values, item], newValues: [...newValues, item] })
  }

  sendEditAttribute = async () => {
    const { editedValues, deletedValues, newValues, record, status, name, origValues } = this.state
    const { _id } = record
    const url = `${API_URL.attributeUrl}/${_id}`
    // const uniqueNewValues = uniqBy(newValues, 'value');
    let uniqueNewValues = uniqBy(
      newValues.map(i => ({ ...i, value: i.value.toLowerCase() })),
      'value',
    )
    console.log(
      uniqueNewValues,
      origValues.map(i => ({ ...i, value: i.value.toLowerCase() })),
    )
    uniqueNewValues = differenceBy(
      uniqueNewValues,
      origValues.map(i => ({ value: i.value.toLowerCase() })),
      'value',
    )

    console.log(uniqueNewValues)
    const sendData = {
      editedValues,
      deletedValues,
      // newValues,
      newValues: uniqueNewValues,
      status,
      name,
      // attribute_group_code,
    }
    console.log(JSON.stringify(sendData))
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    }
    this.setState({
      loading: true,
    })
    const response = await fetch(url, options)
    const responseJSON = await response.json()
    console.log(responseJSON)

    if (response.ok) {
      const { data } = responseJSON
      this.setState({
        record: data,
        loading: false,
        values: data.values,
        origValues: data.values,
        editedValues: [],
        deletedValues: [],
        newValues: [],
      })
      notification.success({
        message: SUCCESS,
        description: EDIT_SUCCESS_MESSAGE,
      })
    } else {
      notification.warning({
        message: response.status,
        description: responseJSON.message,
      })
      this.setState({
        loading: false,
      })
    }
  }

  handleReset = () => {
    console.log('resetting')
    const { record } = this.state
    this.setState({
      name: record.name,
      status: record.status,
      attribute_group_code: record.attribute_group_code,
      values: record.values,
      editedValues: [],
      newValues: [],
      deletedValues: [],
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('will submit form')
    this.sendEditAttribute()
  }

  onStatusChange = () => {
    console.log('changing status')
    this.setState(prevState => {
      const status = prevState.status === 'active' ? 'hold' : 'active'
      return { status }
    })
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value,
    })
  }

  onAttributeValChange = (e, id = null, key, index) => {
    console.log(index)
    e.preventDefault()
    // console.log(e)
    const typedInValue = e.target.value
    console.log(typedInValue)
    console.log(id, key)
    this.setState(prevState => {
      console.log(prevState)
      const updatedValues = [...prevState.values]
      const editedValues = [...prevState.editedValues]
      console.log(editedValues)
      const findIndex = updatedValues.findIndex(x => x._id === id)
      if (findIndex !== -1) {
        updatedValues[findIndex].value = typedInValue
        const findIndexEditedinRecord = prevState.record.values.findIndex(x => x._id === id)
        console.log(findIndexEditedinRecord)
        if (findIndexEditedinRecord !== -1) {
          const b = editedValues.findIndex(item => item._id === id)
          console.log(b)
          if (b === -1) {
            editedValues.push({
              _id: id,
              value: typedInValue,
            })
            console.log(editedValues)
          } else {
            console.log('found in editedValues array')
            editedValues[b].value = typedInValue
            // }
          }
        }
        console.log(editedValues)
        return {
          ...prevState,
          values: [...updatedValues],
          editedValues: [...editedValues],
        }
      }

      const updatedNewValues = [...prevState.newValues]
      const newId = shortid.generate()
      const newObj = {
        _id: newId,
        value: typedInValue,
      }
      updatedNewValues.push(newObj)
      updatedValues.push(newObj)
      console.log(updatedNewValues)
      return {
        ...prevState,
        values: [...updatedValues],
        newValues: [...updatedNewValues],
      }
    })
    // }
  }

  render() {
    console.log(this.state)

    const { record, loading, values, status, name } = this.state
    const { form } = this.props
    console.log(loading)
    console.log(record)
    const { getFieldDecorator } = form
    return (
      <div>
        <Helmet title="Edit Attribute group" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Edit Attribute group</strong>
            </div>
          </div>
          {loading && (
            <div className="card-body">
              <Skeleton active />
            </div>
          )}
          {!loading && record && (
            <div className="card-body">
              <Form onSubmit={this.handleSubmit} layout="vertical">
                <div className="column">
                  <div className="row">
                    <div className="col-lg-4">
                      <FormItem label="Attribute group" hasFeedback name="name">
                        <Input
                          value={name}
                          name="name"
                          placeholder="Attribute group"
                          onChange={this.onChange}
                        />
                        ,
                      </FormItem>
                    </div>

                    <div className="col-lg-4">
                      <FormItem label="Status">
                        <Switch
                          onChange={this.onStatusChange}
                          checked={status === 'active'}
                          checkedChildren={<Icon type="check" />}
                          unCheckedChildren={<Icon type="close" />}
                        />
                      </FormItem>
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <FormItem
                        label="Attribute group options"
                        rules={[{ required: true, message: 'Required' }]}
                      >
                        <div className={styles.attributesGroup}>
                          {values.map((item, index) => {
                            const key = item._id

                            return (
                              <div key={key}>
                                <Input
                                  onChange={e => this.onAttributeValChange(e, item._id, key, index)}
                                  key={key}
                                  addonAfter={
                                    <Popconfirm
                                      key={key}
                                      title="Sure to delete?"
                                      onConfirm={() => this.handleDelete(item._id)}
                                    >
                                      <Icon key={key} type="close" style={{ color: '#df071a' }} />
                                    </Popconfirm>
                                  }
                                  defaultValue={item.value}
                                />
                              </div>
                            )
                          })}

                          <div>
                            <Button onClick={this.handleAddAttribute} shape="circle" icon="plus" />
                          </div>
                        </div>
                      </FormItem>
                    </div>

                    <Form.Item wrapperCol={{ span: 12, offset: 0 }}>
                      <Button type="primary" htmlType="submit" className="btn-margins">
                        Save
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default AttributesEdit
