import React from 'react'
import { Radio, Button, Popconfirm, notification } from 'antd'
import { CATALOG_API_URL, STRINGS } from '_constants'
import callApi from 'utils/callApi'
import Avatar from '../Avatar'
import styles from './style.module.scss'

const URL = CATALOG_API_URL.verifyUser

class UserCard extends React.Component {
  confirm = async () => {
    const { user } = this.props
    const { userID } = user
    try {
      const options = {
        method: 'PATCH',
      }
      const res = await callApi(`${URL}/${userID}`, options)
      if (res?.success) {
        notification.success({
          message: STRINGS.Verified,
        })
      }
      if (res?.error) throw new Error(res.error)
    } catch (error) {
      notification.error({
        message: STRINGS.deleteError,
        description: error.message,
      })
    }
  }

  render() {
    // Referral  destrucuter form props and u can user referer url
    const { type, editable, user, onEdit } = this.props
    const { phoneVerified } = user
    return (
      <div
        className={`${styles.userCard} px-3 py-5 ${
          type.length > 0 ? `${styles.typed} bg-${type}` : ''
        }`}
      >
        {editable && (
          <button type="button" className={styles.plusBtn}>
            Add
          </button>
        )}
        <Avatar
          src={user.avatar}
          border
          borderColor={`${type.length > 0 ? 'white' : ''}`}
          size="90"
        />
        <div className="my-3 text-center">
          <div className={`${styles.userName} font-size-18`}>{user.name}</div>
          {/* <div className={styles.post}>{user.post}</div> */}
          <div className={styles.post}>
            {user.phone}
            &nbsp;&nbsp;&nbsp;
            {phoneVerified && phoneVerified === 1 ? (
              <i className="icmn icmn-checkmark" style={{ color: '#0190fe' }} />
            ) : (
              <Popconfirm
                placement="top"
                title="do you confirm you mobile"
                onConfirm={this.confirm}
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" shape="round" icon="edit" title="Edit" />
              </Popconfirm>
            )}
          </div>
          <div className={styles.post}>{user.email}</div>
          {/* <div className={styles.post}>
            <strong>Referral Url:</strong>
            {referralUrl}
          </div> */}
        </div>
        {editable && (
          <div className="text-center">
            <div className="btn-group text-center">
              <Radio.Group size="small">
                <Radio.Button value="large">Add</Radio.Button>
                <Radio.Button value="default">Remove</Radio.Button>
              </Radio.Group>
            </div>
          </div>
        )}
        {onEdit && <Button className={styles.editBtn} icon="edit" title="Edit" onClick={onEdit} />}
      </div>
    )
  }
}

UserCard.defaultProps = {
  type: '',
  editable: false,
  referralUrl: 'www.zapkart.com/referra/l11202',
  user: {},
}

export default UserCard
