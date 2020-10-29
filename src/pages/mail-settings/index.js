/* eslint-disable no-underscore-dangle */
import React from 'react'
import { withRouter } from 'react-router'
import { Input, Select, notification, Skeleton } from 'antd'
import { Helmet } from 'react-helmet'
import Query from 'components/Query'
import { editMailSettings } from 'services'
import { mailSettingsSchema } from 'utils/Schema'
import { STRINGS, CATALOG_API_URL } from '_constants'
import Form from 'components/Form'

const mailTypes = [
  {
    value: 'none',
    name: 'None',
  },
  {
    value: 'ssl',
    name: 'SSL',
  },
  {
    value: 'tls',
    name: 'TLS',
  },
]

const FormIndex = () => {
  const submitForm = async data => {
    const a = await editMailSettings(data)
    if (a && a.success)
      notification.success({
        message: STRINGS.editSuccess,
      })
  }

  const formItems = [
    {
      type: (
        <Select
          placeholder="Select security setting"
          optionFilterProp="children"
          // filterOption={(input, option) =>
          //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          // }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {mailTypes.map(i => (
            <Select.Option key={i.value} value={i.value}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'mailSecuritySetting',
      label: 'Mail setting',
    },
    {
      type: <Input />,
      key: 'smtpHost',
      label: 'SMTP Host',
    },
    {
      type: <Input />,
      key: 'smtpUsername',
      label: 'SMTP Username',
    },
    {
      type: <Input type="password" />,
      key: 'smtpPassword',
      label: 'SMTP Password',
    },
    {
      type: <Input />,
      key: 'smtpPort',
      label: 'SMTP Port',
    },
    {
      type: <Input />,
      key: 'smtpTimeout',
      label: 'SMTP Timeout (in seconds) ',
    },
  ]

  const form = (
    <Query url={CATALOG_API_URL.getMailSettings} loader={<Skeleton active />}>
      {({ data }) => {
        if (data)
          return (
            <Form
              initialValues={data}
              formItems={formItems}
              onSubmit={submitForm}
              schema={mailSettingsSchema}
            />
          )
        return null
      }}
    </Query>
  )

  return (
    <div>
      <Helmet title="Mail Settings" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Mail Settings</strong>
          </div>
        </div>
        <div className="card-body">{form}</div>
      </div>
    </div>
  )
}

export default withRouter(FormIndex)

// import React from 'react'
// import { Helmet } from 'react-helmet'
// import Form from 'components/Form'
// import { Input, Select, notification, Skeleton } from 'antd'
// import { editMailSettings } from 'services'
// import { mailSettingsSchema } from 'utils/Schema'
// import { STRINGS, CATALOG_API_URL } from '_constants'
// import Query from 'components/Query'

// const mailTypes = [
//   {
//     value: 'none',
//     name: 'None',
//   },
//   {
//     value: 'ssl',
//     name: 'SSL',
//   },
//   {
//     value: 'tls',
//     name: 'TLS',
//   },
// ]

// const loader = (
//   <div className="card-body">
//     <Skeleton active />
//   </div>
// )

// const MailSettings = ({ user }) => {
//   console.log('MailSettings', user)

//   const formItems = [
//     {
//       type: (
//         <Select
//           placeholder="Select security setting"
//           optionFilterProp="children"
//           // filterOption={(input, option) =>
//           //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//           // }
//         >
//           {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
//           {mailTypes.map((i) => (
//             <Select.Option key={i.value} value={i.value}>
//               {i.name}
//             </Select.Option>
//           ))}
//         </Select>
//       ),
//       key: 'mailSecuritySetting',
//       label: 'Mail setting',
//     },
//     {
//       type: <Input />,
//       key: 'smtpHost',
//       label: 'SMTP Host',
//     },
//     {
//       type: <Input />,
//       key: 'smtUsername',
//       label: 'SMTP Usernae',
//     },
//     {
//       type: <Input type="password" />,
//       key: 'smtpPassword',
//       label: 'SMTP Password',
//     },
//     {
//       type: <Input />,
//       key: 'smtpPort',
//       label: 'SMTP Port',
//     },
//     {
//       type: <Input />,
//       key: 'smtpTimeout',
//       label: 'SMTP Timeout (in seconds) ',
//     },
//   ]

//   const submitForm = async (data) => {
//     const a = await editMailSettings(data)
//     if (a && a.success)
//       notification.success({
//         message: STRINGS.editSuccess,
//       })
//   }

//   return (
//     <div>
//       <Helmet title="Mail Settings" />
//       <div className="card">
//         <div className="card-header">
//           <div className="utils__title">
//             <strong>Mail Settings</strong>
//           </div>
//         </div>
//         <div className="card-body">
//           <Query url={CATALOG_API_URL.getMailSettings} loader={<Skeleton active />}>
//             {({ data }) => {
//               if (data)
//                 return (
//                   <Form
//                     initialValues={data}
//                     formItems={formItems}
//                     onSubmit={submitForm}
//                     schema={mailSettingsSchema}
//                   />
//                 )
//               return null
//             }}
//           </Query>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MailSettings
