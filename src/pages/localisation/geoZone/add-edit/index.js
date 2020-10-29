import React from 'react'
import { Helmet } from 'react-helmet'
import { CATALOG_API_URL, STRINGS } from '_constants'
import { Skeleton, notification } from 'antd'
import Query from 'components/Query'
import { editData } from 'services'
// import { isEmpty } from 'lodash'
import Form from './Form'

const URL = CATALOG_API_URL.geoZone

const GeozoneEditFormIndex = (props) => {
  const { match, history } = props
  const { params } = match
  const { id } = params

  const handleSubmit = (vals) => {
    // const finalVal = {}
    // const zone = []

    // Object.keys(vals).forEach((key) => {
    //   const abc = key.split(/[[\]]{1,2}/)
    //   if (abc.length > 0 && (abc[0] === 'country' || abc[0] === 'state')) {
    //     if (zone[abc[1]]) {
    //       const dd = {}
    //       dd[abc[0]] = vals[key]
    //       zone[abc[1]] = { ...zone[abc[1]], ...dd }
    //     } else {
    //       const dt = {}
    //       dt[abc[0]] = vals[key]
    //       zone.push(dt)
    //     }
    //   } else if (abc.length > 0 && abc[0] === 'name') {
    //     finalVal[abc[0]] = vals[key]
    //   } else if (abc.length > 0 && abc[0] === 'status') {
    //     finalVal[abc[0]] = vals[key]
    //   }
    // })
    const data = vals
    console.log('lmm init', data)

    if (id) {
      const url = `${URL}/${id}`
      submitData(url, data)
    } else {
      const url = `${URL}/create`
      submitData(url, data, 'POST')
    }
  }

  const submitData = async (url, values, method = 'PATCH') => {
    const res = await editData(url, values, 'json', method)
    if (res?.success) {
      notification.success({
        message: STRINGS.success,
        description: id ? STRINGS.editSuccess : STRINGS.addSuccess,
      })
      history.go(-1)
    }
    if (res?.error)
      notification.error({
        message: STRINGS.editError,
        description: res.error,
      })
  }

  let form = <Form HandleOnSubmit={handleSubmit} />
  if (id) {
    form = (
      <Query url={`${URL}/${id}`} loader={<Skeleton active />}>
        {(res) => {
          if (res?.data) return <Form initialValues={res.data} HandleOnSubmit={handleSubmit} />
          return <div>No data!</div>
        }}
      </Query>
    )
  }
  const title = id ? 'Edit Geozone' : 'Add Geozone'
  return (
    <div>
      <Helmet title={title} />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
        <div className="card-body min-height-700">{form}</div>
      </div>
    </div>
  )
}

export default GeozoneEditFormIndex
