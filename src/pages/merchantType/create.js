import React from 'react'
import { notification } from 'antd'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { SUCCESS, ADD_SUCCESS_MESSAGE, FAILED } from '_constants'
import MerchantTypeForm from './form'

const merchantTypesUrl = '/api/backend/v1'

class MercentTypeEdit extends React.Component {
  state = {
    fields: {
      name: {
        value: '',
      },
      status: {
        status: '',
      },
    },
    addSuccess: false,
    id: '',
  }

  //   componentDidMount() {
  //     const merchantTypesUrl  = '/api/catalog/v1/merchanttype';
  //     axios.get(merchantTypesUrl).then(
  //       response => {
  //         const { data: responseData } = response
  //         const { data } = responseData
  //         this.setState({
  //             merchanttypes: data,
  //         })
  //         console.log(data)
  //       },
  //       error => {
  //         console.log(error)
  //       },
  //     )
  //   }

  handleDataFormChange = changedFields => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }))
  }

  handleReset = () => {
    this.setState(prevState => {
      const updatedFields = { ...prevState.fields }
      updatedFields.name.value = ''
      updatedFields.status.value = ''
      return {
        ...prevState,
        fields: { ...prevState.fields, updatedFields },
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('handle submit')
    const url = `${merchantTypesUrl}/merchanttype/create`
    const { fields } = this.state
    const formData = new FormData()
    Object.entries(fields).map(([key, value]) => {
      formData.append(key, value.value)
      return ''
    })

    axios.post(url, formData).then(
      response => {
        console.log(response)
        const { data: dataResponse } = response
        const { data } = dataResponse
        const { id } = data
        console.log(data)
        notification.success({
          message: SUCCESS,
          description: ADD_SUCCESS_MESSAGE,
        })
        this.setState({
          addSuccess: true,
          id,
        })
      },
      error => {
        notification.error({
          message: FAILED,
          description: error.message,
        })
        this.setState({
          addSuccess: false,
        })
      },
    )
  }

  render() {
    const { fields, addSuccess, id } = this.state
    const successRedirect = '/merchantType/list'
    console.log('zxcxvcb', this.state)
    if (addSuccess && id) {
      console.log('7777777777777777')
      return <Redirect to={`${successRedirect}`} />
    }
    return (
      // cat parent
      // meta title keywords description
      <div>
        <Helmet title="Add MerchantType" />
        <div className="card">
          <div className="card-header">
            <div className="utils__title">
              <strong>Add MerchantType</strong>
            </div>
          </div>
          <div className="card-body">
            {/* <h4 className='text-black mb-3'>
              <strong>Basic info</strong>
            </h4> */}
            <MerchantTypeForm
              {...fields}
              onChange={this.handleDataFormChange}
              onSubmit={this.handleSubmit}
              onReset={this.handleReset}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MercentTypeEdit
