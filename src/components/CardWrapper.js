import React from 'react'

const CardWrapper = ({ title, children, className, padding }) => {
  const leftPadding = padding.left ? `pl-${padding.left}` : ''
  const rightPadding = padding.right ? `pr-${padding.right}` : ''
  console.log('PADDING', padding.left, leftPadding)
  console.log('PADDING', padding.right, rightPadding)
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className={`card-header ${leftPadding} ${rightPadding}`}>
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
      )}
      <div className={`card-body ${leftPadding} ${rightPadding}`}>{children}</div>
    </div>
  )
}

CardWrapper.defaultProps = {
  className: '',
  padding: {},
}

export default CardWrapper
