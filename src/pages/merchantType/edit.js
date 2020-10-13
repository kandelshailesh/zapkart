import React from 'react'
import { notification } from 'antd'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { SUCCESS, EDIT_SUCCESS_MESSAGE, FAILED } from '_constants'
import MerchantTypeForm from './form'

const editMerchantTypeUrl = '/api/backend/v1'

class MerchantTypeEdit extends React.Component {
  state = {
    fields: {
      name: {
        value: '',
      },
      status: {
        status: '',
      },
    },
    merchanttypes: [],
    merchanttype: {},
  }

  componentDidMount() {
    const { match } = this.props
    const { params } = match
    const { id } = params

    axios
      .all([
        axios.get(`${editMerchantTypeUrl}/merchanttype/${id}`),
        axios.get('/api/backend/v1/merchanttype'),
      ])
      .then(
        axios.spread((merchanttypeResp, merchanttypes) => {
          console.log('uuu', merchanttypeResp)
          const merchanttype = merchanttypeResp.data.merchanttypelistDetails
          this.setState(prevState => {
            const updatedFields = { ...prevState.fields }
            console.log(updatedFields)
            this.updateFields(updatedFields, merchanttype)
            return {
              ...prevState,
              merchanttypes: merchanttypes.data.data,
              fields: {
                ...prevState.fields,
                updatedFields,
              },
              merchanttype,
            }
          })
        }),
      )
      .catch(error => console.log(error))
  }

  updateFields = (updatedFields, merchanttype) => {
    Object.entries(merchanttype).map(([key, value]) => {
      console.log(key, value)
      if (updatedFields[key]) {
        console.log('gvvgh', updatedFields[key])
        updatedFields[key].value = value
      }
      return ''
    })
  }

  handleDataFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }))
  }

  handleReset = () => {
    this.setState(prevState => {
      const updatedFields = { ...prevState.fields }
      const { merchanttype } = prevState
      console.log(updatedFields, merchanttype)
      const { name, status } = merchanttype
      updatedFields.name.value = name
      updatedFields.status = status
      return {
        ...prevState,
        fields: { ...prevState.fields, updatedFields },
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const updateurl = 'updatemerchanttype'
    console.log('handle submit', this.state)
    const { merchanttype } = this.state
    const { id } = merchanttype
    const url = `${editMerchantTypeUrl}/${updateurl}/${id}`
    const { fields } = this.state
    const formData = new FormData()
    Object.entries(fields).map(([key, value]) => {
      formData.append(key, value.value)
      return ''
    })
    axios.patch(url, formData).then(
      response => {
        console.log(response)
        notification.success({
          message: SUCCESS,
          description: EDIT_SUCCESS_MESSAGE,
        })
      },
      error => {
        notification.error({
          message: FAILED,
          description: error.message,
        })
      },
    )
  }

  render() {
    const { fields, merchanttypes } = this.state
    console.log(this.state)

    return (
      // cat parent
      // meta title keywords description
      <div>
        <Helmet title="Edit MerchantType" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Edit MerchantType</strong>
            </div>
          </div>
          <div className="card-body">
            {/* <h4 className='text-black mb-3'>
              <strong>Basic info</strong>
            </h4> */}
            <MerchantTypeForm
              {...fields}
              onChange={this.handleDataFormChange}
              merchanttypes={merchanttypes}
              onSubmit={this.handleSubmit}
              onReset={this.handleReset}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MerchantTypeEdit
