import React from 'react'
import Avatar from 'components/CleanUIComponents/Avatar'
import styles from './style.module.scss'

class UserCard extends React.Component {
  render () {
    const { user } = this.props
    return (
      <div
        className={`card ${styles.header}`}
        style={{ backgroundImage: `url('resources/images/photos/4.jpeg')` }}
      >
        <div>
          <div className='card-body text-center'>
            <Avatar
              src={user.avatar}
              size='110'
              border='true'
              borderColor='white'
            />
            <br />
            <br />
            <h2>
              <span className='text-black mr-2'>
                <strong>{user.name}</strong>
              </span>
            </h2>
            <p className='text-white mt-2'><strong>Gender: </strong>{user.gender}</p>
            <p className='text-white mt-2'><strong>Email: </strong>{user.email}</p>
            <p className='text-white mt-2'><strong>Phone No: </strong>{user.phoneno}</p>
            <p className='text-white mt-2'><strong>Joined at: </strong>{user.joinedAt}</p>
            <p className='text-white mt-2'><strong>IP: </strong>{user.ip}</p>
            {/* <dl className={`text-white mt-2 ${styles.inlineElements}`}>
              <dt>Gender</dt>
              <dd>{user.gender}</dd>
            </dl>
            <dl className={`text-white mt-2 ${styles.inlineElements}`}>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </dl> */}
          </div>
        </div>
      </div>
    )
  }
}

export default UserCard
