import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet'
// import Query from 'components/Query'
import Form from 'components/Form'
import { connect } from 'react-redux'
import { Input } from 'antd'

const EditProfile = ({ user }) => {
  console.log('editprofile', user)
  // const loader = (
  //   <div className="card-body">
  //     <Skeleton active />
  //   </div>
  // )

  const profileFormItems = [
    {
      type: <Input name="firstName" />,
      key: 'firstName',
      label: 'First Name',
    },
    {
      type: <Input />,
      key: 'lastName',
      label: 'Last Name',
    },
    {
      type: <Input />,
      key: 'email',
      label: 'Email',
    },
    {
      type: <Input type="password" />,
      key: 'password',
      label: 'Password',
    },
    {
      type: <Input type="confirmPassword" />,
      key: 'confirmPassword',
      label: 'Confirm password',
    },
  ]
  const initialValuesProfile = useMemo(() => {
    if (user && user.id && user.id !== '') {
      return {
        firstName: user.firstName,
        lastName: user.lastName,
      }
    }
    return {}
  }, [user])

  // const onHandleSubmit = () => {}

  return (
    <div>
      <Helmet title="Edit Profile" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Edit Profile</strong>
          </div>
        </div>
        <div className="card-body">
          <Form

            initialValues={initialValuesProfile}
            formItems={profileFormItems}
            // onSubmit={() => {
            //   onHandleSubmit()
            // }}
          />
          {/* <Query url={`/api/backend/v1/merchant/${user?.id}`} loader={loader}>
            {({ data }) => {
              const initialValues = useMemo(() => data || {}, [])
              return <Form initialValues={initialValues} />
            }}
          </Query> */}
        </div>
      </div>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(EditProfile)
