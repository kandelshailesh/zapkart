import React, { useState } from 'react'
import { Avatar, Rate, Radio, InputNumber, Icon, Tooltip, Button, Input } from 'antd'
import Form from 'components/Form'
import { getFormattedDate } from 'utils'
import pick from 'lodash/pick'
import { reviewSchema } from 'utils/Schema'
import styles from './style.module.scss'

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 18,
    },
  },
}

const ReviewViewEdit = ({ selectedReview, onSubmit }) => {
  const [isEdit, setEdit] = useState(false)
  const avatarProps = {
    icon: !selectedReview.user.avatarlocation ? 'user' : null,
    src: selectedReview.user.avatarlocation || null,
  }

  let formItems = [
    {
      type: (
        <Radio.Group name="status" defaultValue="pending" buttonStyle="solid">
          <Radio.Button value="active">Active</Radio.Button>
          <Radio.Button value="pending">Pending</Radio.Button>
          <Radio.Button value="disabled">Disabled</Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
    },
    {
      type: <InputNumber name="priorityOrder" min={0} />,
      key: 'priorityOrder',
      label: 'Priority ',
    },
  ]

  if (isEdit) {
    formItems = [
      {
        type: <Rate defaultValue={selectedReview.rating} />,
        key: 'rating',
        label: 'Rating',
      },
      {
        type: <Input />,
        key: 'title',
        label: 'Title',
      },
      {
        type: <Input.TextArea autosize={{ minRows: 5 }} />,
        key: 'text',
        label: 'Review',
      },

      ...formItems,
    ]
  }

  const handleEditToggle = () => {
    // setEdit(prev => !prev)
    setEdit(true)
  }

  const handleSubmit = values => {
    console.log('in handleSubmit')
    if (onSubmit) {
      if (isEdit) onSubmit(values)
      else {
        const otherValues = pick(values, ['status', 'priorityOrder'])
        onSubmit(otherValues)
      }
    }
  }

  return (
    <>
      {/* <div className="d-flex justify-content-end mb-2">
        <Tooltip title="Edit review">
          <Button onClick={handleEditToggle}>
            <Icon type="edit" />
          </Button>
        </Tooltip>
      </div> */}
      {!isEdit && (
        <div className={`clearfix ${styles.commentItem} pb-0 mt-0`}>
          <div className="d-flex justify-content-end mb-2">
            <Tooltip title="Edit review">
              <Button onClick={handleEditToggle}>
                <Icon type="edit" />
              </Button>
            </Tooltip>
          </div>
          <div className={styles.commentAvatar}>
            <Avatar size="50" {...avatarProps} border="false" />
          </div>

          <div className={styles.commentContent}>
            <div className="clearfix">
              <div className="pull-left">
                <strong>
                  {selectedReview.user.firstName}&nbsp;{selectedReview.user.lastName}
                </strong>{' '}
                posted:
                <br />
                <small className="text-muted">{getFormattedDate(selectedReview.createdAt)}</small>
              </div>
              <div className="pull-right">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={selectedReview.rating}
                  className="white-space-no-wrap"
                />
              </div>
            </div>
            <div>
              <div className={styles.commentsTitle}>{selectedReview.title}</div>
              {selectedReview.text}
            </div>
            <br />
          </div>
        </div>
      )}
      {isEdit && (
        <div className={`clearfix ${styles.commentItem} pb-0 mt-0`}>
          <div className={styles.commentAvatar}>
            <Avatar size="50" {...avatarProps} border="false" />
          </div>

          <div className={styles.commentContent}>
            <div className="clearfix">
              <div className="pull-left">
                <strong>
                  {selectedReview.user.firstName}&nbsp;{selectedReview.user.lastName}
                </strong>{' '}
                posted on&nbsp;
                <small className="text-muted">{getFormattedDate(selectedReview.createdAt)}</small>
              </div>
            </div>
            <br />
          </div>
        </div>
      )}
      {/* <div className="d-flex justify-content-between"> */}
      <Form
        formItems={formItems}
        initialValues={{
          status: selectedReview.status,
          priorityOrder: selectedReview.priorityOrder,
          isEdit,
          text: selectedReview.text,
          rating: selectedReview.rating,
          title: selectedReview.title,
        }}
        onSubmit={handleSubmit}
        tailFormItemLayout={tailFormItemLayout}
        schema={reviewSchema}
        // onCancel={() => console.log('will cancel')}
      />
      {/* </div> */}
    </>
  )
}

export default ReviewViewEdit
