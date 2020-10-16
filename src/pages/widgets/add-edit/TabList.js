/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react'
import { generateKey } from 'utils'
import { Tabs, Button, Skeleton } from 'antd'

// import MultipleVariant from '../forms/MultipleVariant'
import useFetching from 'hooks/useFetching'
import Query from 'components/Query'
import TabsForms from './TabsForm'
import WidgetTabTable from './WidgetTabTable'

const { TabPane } = Tabs

const bottomMargin = { marginBottom: '15px' }

const VariantTabPanel = ({ widgetID }) => {
  // const { data } = props
  // console.log(props)

  const [activeKey, setActiveKey] = React.useState('1')
  const [panes, setPanes] = React.useState([])
  const [allTab, setAllTabs] = React.useState([])
  console.log('all tabs', allTab)

  const [{ response, loading, error, refetch }] = useFetching(
    `/api/catalog/v1/widgetTab/query?status=active&widget=${widgetID}`,
    {},
    true,
  )

  const init = useMemo(() => {
    setActiveKey('Listed')
    if (response?.data) {
      setAllTabs(response?.data)
      return response?.data
    }
    return []
  }, [response])

  const onChangeTab = (a) => {
    console.log('onChnageTab', a)
    setActiveKey(a)
  }

  // const initvals = { widget: widgetID, status: 'active', listingType: 'products' }

  const add = () => {
    const newKey = generateKey()
    setPanes((prev) => [
      ...prev,
      {
        key: newKey,
        title: `Widget Tab ${prev.length - 1 + 1}`,
        closable: true,
        content: (
          <TabsForms
            // data={data}
            removeVariant={() => remove(newKey)}
            initialValues={mapValueToInit()}
            // onSuccess={onSuccessVariantForm}
          />
          // <div>{`Variant ${prev.length - 1 + 1}`}hello</div>
        ),
      },
    ])
    setActiveKey(newKey)
  }

  const remove = (targetKey) => {
    setPanes((prev) => {
      const filtered = prev.filter((i) => i.key !== targetKey)
      return filtered
    })
    setActiveKey('Listed')
    refetch()
  }

  const onEdit = (targetKey, action) => {
    console.log(action, targetKey)
    if (action === 'remove') remove(targetKey)
  }

  const mapValueToInit = (value) => {
    if (value) {
      return {
        ...value,
        widget: value.widget._id,
        id: value._id,
      }
    }
    return { widget: widgetID, status: 'active', listingType: 'products' }
  }

  const onEditWIdgetTab = async ({ id, title }) => {
    const newKey = generateKey()
    setPanes((prev) => [
      ...prev,
      {
        key: newKey,
        title: `Edit Tab ${title}`,
        closable: true,
        content: (
          <Query
            url={`/api/catalog/v1/widgetTab/query?status=active&widget=${widgetID}&id=${id}`}
            loader={<Skeleton active />}
          >
            {(res) => {
              if (res?.data)
                return (
                  <TabsForms
                    removeVariant={() => remove(newKey)}
                    initialValues={mapValueToInit(res?.data[0])}
                  />
                )
              return <div>No data!</div>
            }}
          </Query>
        ),
      },
    ])
    setActiveKey(newKey)
  }

  return (
    <>
      <div style={bottomMargin}>
        <Button onClick={add}>Add new Tab</Button>
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
        <TabPane tab="Widget Tab List" key="Listed" closable={false} forceRender>
          <WidgetTabTable
            onEditTab={onEditWIdgetTab}
            loading={loading}
            dataSource={!loading ? init : []}
            error={error}
          />
        </TabPane>
        {panes.map((i) => (
          <TabPane tab={i.title} key={i.key} closable={i.closable} forceRender={i.forceRender}>
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
