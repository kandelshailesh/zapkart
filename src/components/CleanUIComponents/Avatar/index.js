import React from 'react'
import { Link } from 'react-router-dom'
import userIcon from 'assets/images/user.svg'
import './styles.scss'

class Avatar extends React.PureComponent {
  static defaultProps = {
    size: false,
    border: false,
    borderColor: '#d2d9e5',
    src: null,
    to: null,
  }

  render() {
    const { size, borderColor, src, border, to } = this.props
    const styleAv = { borderColor }
    const className = `avatar ${size ? `size${size}` : ''} ${border ? 'border' : ''}`

    const wrapper = elem => {
      if (to)
        return (
          <Link to="/" className={className} style={styleAv}>
            {elem}
          </Link>
        )
      return (
        <div className={className} style={styleAv}>
          {elem}
        </div>
      )
    }

    return wrapper(<img src={src || userIcon} alt="User" />)
  }
}

export default Avatar
