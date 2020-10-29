import { Button, Icon, Modal, notification, Tabs } from 'antd'
import Form from 'components/Form'
import Upload from 'components/Upload'
import useFetching from 'hooks/useFetching'
/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { uploadAgreement } from 'services'
import { uploadDOCSchema } from 'utils/Schema'
import { STRINGS } from '_constants'
import List from './list'
// import data from './list/data.json'

const { TabPane } = Tabs

const BannersList = ({ user }) => {
  const [isModalOpen, setisModalOpen] = useState(false)
  const [activeTopKey, setActiveTopKey] = useState('a')
  const onChangeTopTab = (a) => {
    console.log('onChangeTopTab', a)
    setActiveTopKey(a)
  }

  const [{ response, loading, error, refetch }] = useFetching('/api/backend/v1/aggrement/merchant')
  console.log(error)
  const responseData = useMemo(() => {
    if (response?.data) {
      const { data } = response
      const { adminFiles, merchantFiles, approveStatus } = data
      return { adminFiles, merchantFiles, approveStatus }
    }
    return {}
  }, [response])

  const handleExcelSubmit = async ({ file }) => {
    console.log('consoele', file)
    const success = await uploadAgreement(file)
    console.log('aaaa', success)
    if (success) {
      notification.success({
        message: 'Uploaded successfully',
      })
      setisModalOpen(false)
      refetch()
    }
  }

  const excelFI = [
    {
      label: 'Merchant Files',
      name: 'file',
      key: 'file',
      type: (
        <Upload name="file" multiple listType="text" accept=".pdf,application/pdf,image/*">
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
      ),
    },
  ]
  const ondelete = () => {
    notification.success({
      message: STRINGS.success,
      description: STRINGS.deleteSuccess,
    })
    refetch()
  }

  return (
    <>
      <Modal
        visible={isModalOpen}
        closable
        onCancel={() => {
          setisModalOpen(false)
        }}
        destroyOnClose
      >
        <Form onSubmit={handleExcelSubmit} formItems={excelFI} schema={uploadDOCSchema} />
      </Modal>
      <Helmet title="Agreements" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Upload Agreements</strong>
            <div className="pull-right">
              <Button
                type="ghost"
                // selectedRowKeys={selectedRowKeys}
                // handleDelete={handleDelete}
                attribute="Agreement"
                onClick={() => {
                  setisModalOpen(true)
                }}
              >
                <Icon type="plus" />
                upload Agreements
              </Button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <Tabs tabPosition="top" activeKey={activeTopKey} onChange={onChangeTopTab}>
            <TabPane key="a" tab="By Admin">
              <List
                loading={loading}
                response={responseData?.adminFiles}
                approveStatus={responseData?.approveStatus}
                editable={false}
                role={user.role}
                ondelete={ondelete}
              />
            </TabPane>

            <TabPane key="b" tab="By You">
              <List
                loading={loading}
                response={responseData?.merchantFiles}
                approveStatus={responseData?.approveStatus}
                editable
                role={user.role}
                ondelete={ondelete}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default connect(({ user }) => ({ user }))(BannersList)
