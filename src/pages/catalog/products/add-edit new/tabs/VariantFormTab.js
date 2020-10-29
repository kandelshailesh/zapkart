/* eslint-disable no-underscore-dangle */
import React from 'react'
import { generateKey } from 'utils'
import { Tabs, Button } from 'antd'
import MultipleVariant from '../forms/MultipleVariant'
import VariantList from './VariantList'

const { TabPane } = Tabs

const bottomMargin = { marginBottom: '15px' }

const VariantTabPanel = props => {
  const { data } = props
  console.log(props)

  console.log('data in VariantTabPanel', data)
  const [activeKey, setActiveKey] = React.useState('1')

  // eslint-disable-next-line no-unused-vars
  const handleSubmitForm = (a, isLast = false) => {
    // console.log('handleSubmitFormert', a)
    // if (isLast) formContext.onSubmit(a, true)
    // formContext.onSubmit(a)
  }

  const [panes, setPanes] = React.useState([
    {
      key: '1',
      title: `Variant 1`,
      closable: true,
      content: <MultipleVariant data={data} removeVariant={() => remove('1')} />,
    },
    {
      key: '2',
      title: `Variant List`,
      closable: false,
      content: <VariantList baseProduct={data._id} />,
    },
  ])

  //   const test = (a) => {
  // console.log('test called',a)
  //   }

  const onChangeTab = a => {
    console.log('onChnageTab', a)
    setActiveKey(a)
  }

  const add = () => {
    const newKey = generateKey()
    setPanes(prev => [
      ...prev,
      {
        key: newKey,
        title: `Variant ${prev.length - 1 + 1}`,
        closable: true,
        content: <MultipleVariant data={data} removeVariant={() => remove(newKey)} />,
      },
    ])
    setActiveKey(newKey)
  }

  const remove = targetKey => {
    // const targetIndex = panes.filter(i => i.key === targetKey)[0]
    // const prevPane = panes[targetIndex - 1]
    // console.log(targetIndex, prevPane)

    setPanes(prev => {
      const filtered = prev.filter(i => i.key !== targetKey)

      return filtered
    })
  }

  const onEdit = (targetKey, action) => {
    console.log(action, targetKey)
    if (action === 'add') add()
    if (action === 'remove') remove(targetKey)
  }

  return (
    <>
      <div style={bottomMargin}>
        <Button onClick={add}>Add new variant</Button>
      </div>
      <Tabs
        // animated
        type="editable-card"
        tabPosition="top"
        activeKey={activeKey}
        onChange={onChangeTab}
        onEdit={onEdit}
        hideAdd

        // tabBarExtraContent={<Button onClick={onClickAddNewVariant}>Add new variant</Button>}
      >
        {/* <TabPane key={0} tab="Single" closeable={false}>
        <DPricing onSubmit={handleSubmitForm} />
        <FormD type="fixed" />
      </TabPane> */}
        {panes.map(i => (
          <TabPane tab={i.title} key={i.key} closable={i.closable}>
            {i.content}
          </TabPane>
        ))}
      </Tabs>
    </>
  )
}

export default VariantTabPanel
// for product edit -
// pass multiple variant values in array in form of {shipping:{values}, general:{values}}
// or passthese values from provider
