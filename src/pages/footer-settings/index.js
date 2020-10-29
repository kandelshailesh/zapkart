import React, { useMemo, useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import { editFooterSettings } from 'services'
import { footerSettingsSchema } from 'utils/Schema'
import Form from 'components/Form'
import useFetching from 'hooks/useFetchingNoReducers'
import { Input, Button, notification } from 'antd'
import { CATALOG_API_URL, STRINGS } from '_constants'
import AddNew from 'components/CustomComponents/AddNew'
import { isEmpty } from 'lodash'

const GeneralSettings = () => {
  const [{ response }] = useFetching(CATALOG_API_URL.getFooterSettings)
  const [socialMedia, setsocialMedia] = useState([])
  const [contact, setcontact] = useState([])
  const [formInitValues, setformInitValues] = useState([])

  useEffect(() => {
    if (response?.data?.socialmedia.length > 0) setsocialMedia(response.data.socialmedia)
    if (response?.data?.contacts.length > 0) setcontact(response.data.contacts)
  }, [response])

  useEffect(() => {
    const { projectName, text } = formInitValues

    const obj = {}
    if (socialMedia.length > 0) {
      socialMedia.forEach((i, index) => {
        obj[`sname[${index}]`] = i.name
        obj[`slink[${index}]`] = i.link
        obj[`siconclass[${index}]`] = i.iconclass
      })
      // setfinalSocialMediaLink(obj)
    }
    const obj1 = {}
    if (contact.length > 0) {
      contact.forEach((i, index) => {
        obj1[`cname[${index}]`] = i.name
        obj1[`cdata[${index}]`] = i.data
        obj1[`ciconclass[${index}]`] = i.iconclass
      })
      // setfinalContactLink(obj1)
    }
    setformInitValues({
      projectName,
      text,
      ...obj,
      ...obj1,
    })
  }, [socialMedia, contact])

  useMemo(() => {
    if (response?.data) {
      // eslint-disable-next-line no-shadow
      const { socialmedia, contacts, ...rest } = response.data
      const obj = {}
      if (socialmedia.length > 0) {
        socialmedia.forEach((i, index) => {
          obj[`sname[${index}]`] = i.name
          obj[`slink[${index}]`] = i.link
          obj[`siconclass[${index}]`] = i.iconclass
        })
        // setfinalSocialMediaLink(obj)
      }
      const obj1 = {}
      if (contacts.length > 0) {
        contacts.forEach((i, index) => {
          obj1[`cname[${index}]`] = i.name
          obj1[`cdata[${index}]`] = i.data
          obj1[`ciconclass[${index}]`] = i.iconclass
        })
        // setfinalContactLink(obj1)
      }
      setformInitValues({
        ...rest,
        ...obj,
        ...obj1,
      })
      // return {
      //   ...rest,
      //   ...obj,
      //   ...obj1,
      // }
    }
    // return {}
  }, [response])

  const addMediaLinks = () => {
    setsocialMedia((prev) => [
      ...prev,
      {
        sname: '',
        slink: '',
        siconClass: '',
      },
    ])
  }
  const addContactsLinks = () => {
    setcontact((prev) => {
      return [
        ...prev,
        {
          cname: '',
          cdata: '',
          ciconClass: '',
        },
      ]
    })
  }
  const onRemoveLink = (ind) => () =>
    setsocialMedia((prev) => prev.filter((i, index) => index !== ind))

  const onRemoveContactLink = (ind) => () =>
    setcontact((prev) => prev.filter((i, index) => index !== ind))

  const submitForm = async (formValue) => {
    const vals = formInitValues
    console.log('ss')
    let sc = [{}]
    let st = [{}]
    Object.keys(vals).forEach((key) => {
      const abc = key.split(/[[\]]{1,2}/)
      if (abc.length > 0 && (abc[0] === 'sname' || abc[0] === 'slink' || abc[0] === 'siconclass')) {
        if (st[abc[1]]) {
          const dd = {}
          dd[abc[0]] = formValue[key]
          st[abc[1]] = { ...st[abc[1]], ...dd }
        } else {
          const dt = {}
          dt[abc[0]] = formValue[key]
          st.push(dt)
        }
        console.log('lmm init', sc)
      }
      if (abc.length > 0 && (abc[0] === 'cname' || abc[0] === 'cdata' || abc[0] === 'ciconclass')) {
        if (sc[abc[1]]) {
          const dd = {}
          dd[abc[0]] = formValue[key]
          sc[abc[1]] = { ...sc[abc[1]], ...dd }
        } else {
          const dt = {}
          dt[abc[0]] = formValue[key]
          sc.push(dt)
        }
      }
    })
    st = st
      .filter((i) => !isEmpty(i))
      .map((i) => ({
        name: i.sname,
        link: i.slink,
        iconclass: i.siconclass,
      }))
    sc = sc
      .filter((i) => !isEmpty(i))
      .map((i) => ({
        name: i.cname,
        data: i.cdata,
        iconclass: i.ciconclass,
      }))
    const submitVals = {
      projectName: formValue.projectName,
      socialmedia: st || [],
      contacts: sc || [],
      text: formValue.text,
    }
    console.log('lsksk s', submitVals)
    const res = await editFooterSettings(submitVals)
    if (res?.success) {
      notification.success({
        message: STRINGS.editSuccess,
      })
    }
  }
  const socialMediaFi = socialMedia.map((i, index) => [
    {
      type: <Input />,
      key: `sname[${index}]`,
      label: 'Social Media Name',
    },
    {
      type: <Input />,
      key: `slink[${index}]`,
      label: 'Link',
    },
    {
      type: <Input />,
      key: `siconclass[${index}]`,
      label: 'Icon Class',
    },
    {
      type: <AddNew pullRight={false} onRemove={onRemoveLink(index)} attribute="Social Media" />,
      key: `removeMediaLink[${index}]`,
    },
  ])
  const contactsFI = contact.map((i, index) => [
    {
      type: <Input />,
      key: `cname[${index}]`,
      label: 'type',
    },
    {
      type: <Input />,
      key: `cdata[${index}]`,
      label: 'value',
    },
    {
      type: <Input />,
      key: `ciconclass[${index}]`,
      label: 'Icon Class',
    },
    {
      type: (
        <AddNew pullRight={false} onRemove={onRemoveContactLink(index)} attribute="Remove This" />
      ),
      key: `removeContactLink[${index}]`,
    },
  ])
  const formItems = [
    {
      type: <Input />,
      key: 'projectName',
      label: 'Project Name',
    },
    {
      type: <Input />,
      key: 'text',
      label: 'Text',
    },
    {
      type: <AddNew pullRight={false} add onClick={addMediaLinks} attribute="Social Media Links" />,
      key: 'addShipping',
      className: 'add-new-shipping-btn',
    },
    {
      type: <AddNew pullRight={false} add onClick={addContactsLinks} attribute="Contact" />,
      key: 'addTimes',
      className: 'add-new-time-btn',
    },
  ]
  const form = (
    <Form.Provider
      className="general-settings-form"
      initialValues={formInitValues}
      onSubmit={submitForm}
      schema={footerSettingsSchema}
      onChnage={(e) => {
        console.log('dsfddfg', e)
      }}
    >
      <Form.Consumer>
        {({ onSubmit }) => (
          <>
            <Form className="shipping-cost-form" formItems={formItems} />
            {socialMediaFi.map((i, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Form key={`links${index}`} formItems={i} />
            ))}
            {contactsFI.map((i, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Form key={`contacts_link${index}`} formItems={i} />
            ))}
            <Button type="primary" onClick={onSubmit}>
              Submit
            </Button>
          </>
        )}
      </Form.Consumer>
    </Form.Provider>
  )
  return (
    <div>
      <Helmet title="General Settings" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Footer Settings</strong>
          </div>
        </div>
        <div className="card-body">
          <div className="general-settings-form-wrapper">{form}</div>
        </div>
      </div>
    </div>
  )
}
export default withRouter(GeneralSettings)
