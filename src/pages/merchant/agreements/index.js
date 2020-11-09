import { Button, Icon, Modal, notification } from 'antd'
import Form from 'components/Form'
import Upload from 'components/Upload'
import useFetching from 'hooks/useFetching'
/* eslint-disable no-underscore-dangle */
import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import {
  deleteAgreementByAdmin,
  // UpdateAgreementStatusByAdmin,
  uploadAgreementByAdmin,
} from 'services'
import { uploadAdminDOCSchema } from 'utils/Schema'
import { STRINGS } from '_constants'
import List from './list'
// import data from './list/data.json'

// const { TabPane } = Tabs

const BannersList = ({ userId, user }) => {
  const [isModalOpen, setisModalOpen] = useState(false)
  // const [activeTopKey, setActiveTopKey] = useState('a')

  // const onChangeTopTab = (a) => {
  //   console.log('onChangeTopTab', a)
  //   setActiveTopKey(a)
  // }
  const [{ response, loading, error, refetch }] = useFetching(
    `/api/backend/v1/aggrement/admin/${userId}`,
  )

  console.log(error)
  const responseData = useMemo(() => {
    if (response?.data) {
      const { data } = response
      const { adminFiles, merchantFiles, approveStatus } = data
      return { adminFiles, merchantFiles, approveStatus }
    }
    return {}
  }, [response])

  const handleExcelSubmit = async ({ adminFiles }) => {
    const success = await uploadAgreementByAdmin(userId, adminFiles)
    if (success) {
      notification.success({
        message: 'Uploaded successfully',
      })
      setisModalOpen(false)
      refetch()
    }
  }
  // const onStatusChange = async (obj) => {
  //   const success = await UpdateAgreementStatusByAdmin(obj)
  //   if (success) {
  //     notification.success({
  //       message: 'Uploaded successfully',
  //     })
  //     refetch()
  //   }
  // }

  const onDeleteFile = async (val) => {
    const success = await deleteAgreementByAdmin(val)
    if (success) {
      notification.success({
        message: STRINGS.success,
        description: STRINGS.deleteSuccess,
      })
      refetch()
    }
  }
  const excelFI = [
    {
      label: 'File',
      name: 'adminFiles',
      key: 'adminFiles',
      type: (
        <Upload multiple listType="text" accept=".pdf">
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
      ),
    },
  ]

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
        <Form onSubmit={handleExcelSubmit} formItems={excelFI} schema={uploadAdminDOCSchema} />
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
          {/* <Tabs tabPosition="top" activeKey={activeTopKey} onChange={onChangeTopTab}>
            <TabPane key="a" tab="By Admin"> */}
          <List
            response={responseData?.adminFiles}
            editable
            role={user.role}
            userId={userId}
            approveStatus={responseData?.approveStatus}
            loading={loading}
            onDeleteFile={onDeleteFile}
          />
          {/* </TabPane>
            <TabPane key="b" tab="By Merchant ">
              <List
                response={responseData?.merchantFiles}
                approveStatus={responseData?.approveStatus}
                editable={false}
                role={user.role}
                userId={userId}
                onStatusChange={onStatusChange}
                loading={loading}
                onDeleteFile={onDeleteFile}
              />
            </TabPane>
          </Tabs> */}
        </div>
      </div>
    </>
  )
}

export default connect(({ user }) => ({ user }))(BannersList)
