import React from 'react'
import { Icon, Table, Form, Input, Select, Button, Switch } from 'antd'
import { getFormattedDate, getFormattedTime } from 'utils'
import valuesJson from '../values.json'
import ordersData from '../data.json'

const FormItem = Form.Item
const { TextArea } = Input
const { Option } = Select

const styles = {
  icon: {
    margin: '0.5rem',
  },
}

const orderHistoryColumns = [
  {
    title: 'Date added',
    dataIndex: 'date_added',
    render: (text, record) =>
      `${getFormattedDate(record.date_added)} ${getFormattedTime(record.date_added)}`,
  },
  {
    title: 'Comments',
    dataIndex: 'comments',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Notified customer',
    dataIndex: 'customer_notify',
    render: (text, record) => {
      return (
        record.customer_notify && (
          <span className="badge badge-primary badge-collapsed-hidden ml-2 center">Notified</span>
        )
      )
    },
  },
]

const CustomizedForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    console.log(props)
    return {
      history_id: Form.createFormField({
        ...props.history_id,
        value: props.history_id.value,
      }),
      date_added: Form.createFormField({
        ...props.date_added,
        value: props.date_added.value,
      }),
      comments: Form.createFormField({
        ...props.comments,
        value: props.comments.value,
      }),
      status: Form.createFormField({
        ...props.status,
        value: props.status.value,
      }),
      customer_notify: Form.createFormField({
        ...props.customer_notify,
        value: props.customer_notify.value,
      }),
    }
  },
  onValuesChange(_, values) {
    console.log(values)
  },
})(props => {
  console.log(props)
  const {
    getFieldDecorator,
    // getFieldValue
  } = props.form

  return (
    <Form onSubmit={props.onSubmit}>
      <div className="row">
        <div className="col-lg-6">
          <FormItem label="Status">
            {getFieldDecorator('status')(
              <Select id="status" placeholder="Select status">
                {valuesJson.order_status.map(item => (
                  <Option key={item.key} value={item.value}>
                    {item.value}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>

          <FormItem label="Notify customer">
            {getFieldDecorator('customer_notify')(<Switch />)}
          </FormItem>
        </div>

        <div className="col-lg-6">
          <FormItem label="Comments">
            {getFieldDecorator('comments')(<TextArea rows={6} placeholder="Comments" />)}
          </FormItem>
        </div>
      </div>

      <FormItem>
        <Button htmlType="submit" className="mr-2" type="primary" style={{ width: 200 }}>
          <i className="fa fa-send mr-2" />
          Submit
        </Button>
      </FormItem>
    </Form>
  )
})

const OrderHistory = () => {
  const { history } = ordersData.data[0].history
  const fields = {
    history_id: {
      value: '',
    },
    date_added: {
      value: '',
    },
    comments: {
      value: '',
    },
    status: {
      value: '',
    },
    customer_notify: {
      value: true,
    },
  }

  const handleFormChange = () => {
    console.log('hi')
  }

  const handleSubmit = () => {
    console.log('bye')
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="utils__title">
          <Icon className={styles.icon} type="shopping-cart" />
          <strong>Order history</strong>
        </div>
        <div className="utils__titleDescription">Order history</div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-xl-12">
            <Table
              className="utils__scrollTable"
              scroll={{ x: '100%' }}
              columns={orderHistoryColumns}
              dataSource={history}
              rowKey={record => record.history_id}
              pagination={false}
            />
          </div>
        </div>
      </div>
      <div className="card-header">
        <div className="utils__title">
          <Icon className={styles.icon} type="shopping-cart" />
          <strong>Add order history</strong>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-xl-12">
            <CustomizedForm {...fields} onChange={handleFormChange} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderHistory
