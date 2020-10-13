/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
  Input,
  Form,
  // Checkbox,
  Switch,
  Icon,
  Button,
  Skeleton,
  // Row,
  // Col,
  Popconfirm,
  notification,
} from 'antd'
// import Skeleton from 'react-loading-skeleton'
// eslint-disable-next-line no-unused-vars
import shortid from 'shortid'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
// import dataAtr from '../data.json'
import _ from 'lodash'
import { addAttributeGroup } from 'services/attributes'
import { STRINGS } from '_constants'
import styles from '../style.module.scss'

// const { LINKS } = constants

const FormItem = Form.Item
// const { TextArea } = Input

@Form.create()
class AttributesAdd extends React.Component {
  abortController = new AbortController()

  state = {
    // records: dataAtr.data,
    // attributesList: [],
    sendSuccess: false,
    data: '',
    attribute_group_code: '',
    name: '',
    status: 'active',
    loading: false,
    values: [],
  }

  componentDidMount() {
    console.log('HI ADD ATTRIBUTE')
  }

  componentWillUnmount() {
    this.abortController.abort()
  }

  handleDelete = id => {
    console.log(id)
    const { values } = this.state
    const arr = values.filter(item => item._id !== id)

    this.setState({
      values: [...arr],
    })
  }

  handleAddAttribute = e => {
    console.log('in handleAddAttribute')
    console.log(e)
    console.log(e.target.value)
    const { values } = this.state
    const newId = shortid.generate()
    const item = {
      value: '',
      _id: newId,
    }
    this.setState({ values: [...values, item] })
  }

  // eslint-disable-next-line camelcase
  sendEditAttribute = async ({ values, status, name }) => {
    const valuesArray = values.map(item => item.value)
    const sendData = {
      status,
      name,
      values: _.uniq(valuesArray),
      // values,
    }
    const add = await addAttributeGroup(sendData)
    if (add) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.addSuccess,
      })
      this.setState({
        sendSuccess: true,
      })
    }
  }

  handleReset = () => {
    console.log('resetting')
    this.setState({
      name: '',
      status: 'hold',
      attribute_group_code: '',
      values: [],
      loading: false,
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('will submit form')
    // eslint-disable-next-line camelcase
    const { name, status, attribute_group_code, values } = this.state
    const data = {
      name,
      status,
      attribute_group_code,
      values,
    }
    console.log(data)
    this.sendEditAttribute(data)
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

  onAttributeValChange = (e, id) => {
    e.preventDefault()
    const typedInValue = e.target.value
    console.log(typedInValue)

    // check record.values index to check edited values
    // on add attr addedvalues check id here
    // on del attr deletedvalues push id there
    this.setState(prevState => {
      console.log(prevState)
      const updatedValues = [...prevState.values]
      const findIndex = updatedValues.findIndex(x => x._id === id)
      if (findIndex !== -1) {
        updatedValues[findIndex].value = typedInValue
        return {
          ...prevState,
          values: [...updatedValues],
        }
      }
      const newId = shortid.generate()
      const newObj = {
        _id: newId,
        value: typedInValue,
      }
      updatedValues.push(newObj)
      return {
        ...prevState,
        values: [...updatedValues],
      }
    })
    // }
  }

  render() {
    console.log(this.state)

    // eslint-disable-next-line camelcase
    const { loading, values, status, name, sendSuccess } = this.state

    console.log(loading)

    if (sendSuccess) return <Redirect to="/catalog/attributes" />

    return (
      <div>
        <Helmet title="Add Attribute group" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Add Attribute group</strong>
            </div>
          </div>
          {loading && (
            <div className="card-body">
              <Skeleton active />
            </div>
          )}
          {!loading && (
            <div className="card-body">
              {/* <h4 className='text-black mb-3'>
              <strong>Basic info</strong>
            </h4> */}
              <Form onSubmit={this.handleSubmit} layout="vertical">
                <div className="column">
                  <div className="row">
                    <div className="col-lg-4">
                      <FormItem label="Attribute group">
                        <Input
                          value={name}
                          name="name"
                          placeholder="Attribute group"
                          onChange={this.onChange}
                        />
                      </FormItem>
                    </div>
                    {/* <div className="col-lg-4">
                      <FormItem label="Attribute code">
                        <Input
                          // eslint-disable-next-line camelcase
                          value={attribute_group_code}
                          name="attribute_group_code"
                          placeholder="Attribute code"
                          onChange={this.onChange}
                        />
                      </FormItem>
                    </div> */}
                    <div className="col-lg-4">
                      <FormItem label="Status">
                        <Switch
                          onChange={this.onStatusChange}
                          checked={status === 'active'}
                          // disabled={record.status === 'inactive'}
                          checkedChildren={<Icon type="check" />}
                          unCheckedChildren={<Icon type="close" />}
                        />
                      </FormItem>
                    </div>
                  </div>
                  <div>
                    <div className="form-group">
                      <FormItem label="Attribute group options">
                        {/* {form.getFieldDecorator('parentCategory')( */}
                        <div className={styles.attributesGroup}>
                          {values.map((item, index) => {
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
                      {/* <Button
                        type="ghost"
                        onClick={() => this.handleReset()}
                        className="btn-margins"
                      >
                        Reset
                      </Button> */}
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

export default AttributesAdd
