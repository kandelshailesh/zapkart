import React, { useState } from 'react'
import { Tabs } from 'antd'
import moment from 'moment'
import Listedtabs from './TabList'
import Widgets from './Form'

// const { widget } = CATALOG_API_URL

const { TabPane } = Tabs

const FormIndex = ({ onSubmitHandle, data, widgetID }) => {
  
  const [isMobile, setIsMobile] = useState(false)
  const checkResize = () => {
    setIsMobile(window.innerWidth <= 767)
    console.log('innerWidth', window.innerWidth)
  }
  React.useEffect(() => {
    if (window.innerWidth <= 767) setIsMobile(true)
    window.addEventListener('resize', checkResize)
  }, [])

  const [activeKey, setActiveKey] = useState('0')

  const onChangeTab = (a) => {
    console.log('onChangeTab', a)
    setActiveKey(a)
  }

  const onWidgetSubmit = async (val) => {
    const dt = {}
    Object.keys(val).forEach((key) => {
      if (key) {
        dt[key] = val[key]
      }
      if (key === 'startDate') {
        dt[key] = moment(val[key]).format('YYYY-MM-DD')
      }
      if (key === 'endDate') {
        dt[key] = moment(val[key]).format('YYYY-MM-DD')
      }
    })
    await onSubmitHandle(dt)
  }

  return (
    <>
      <Tabs tabPosition={isMobile ? 'top' : 'left'} activeKey={activeKey} onChange={onChangeTab}>
        <TabPane tab={<span> Widgets</span>} key={0}>
          <Widgets name="Widgets" initialValues={data} onSubmit={onWidgetSubmit} />
        </TabPane>
        {data && (
          <TabPane tab={<span> tabs </span>} key={1}>
            <Listedtabs widgetID={widgetID} name="tabs" />
          </TabPane>
        )}
      </Tabs>
    </>
  )
}

export default FormIndex
