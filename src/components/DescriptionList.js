import React from 'react'
import PropTypes from 'prop-types'
import startCase from 'lodash/startCase'

const Wrapper = ({ card, title, children }) => {
  if (!card) return children
  return (
    <div className="card">
      {title && (
        <div className="card-header">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  )
}

const DescriptionList = (props) => {
  let { data } = props
  const { className, rowClassName, card, title } = props
  if (data.constructor === Object)
    data = Object.entries(data).map(([key, value]) => {
      return {
        label: startCase(key),
        description: value,
      }
    })
  return (
    <Wrapper card={card} title={title}>
      <dl className={`${className} col`}>
        {data.map((i) => (
          <div className={`${rowClassName} row mb-2`} key={i.label}>
            <dt className="col col-sm-6 text-right text-capitalize font-size-14">{i.label}</dt>
            <dd className="col col-sm-6 mb-0 font-size-14 text-capitalize">{i.description}</dd>
          </div>
          // <div className="row" key={i.label}>
          //   <dt className="col-lg-5 col-md-6 col-sm-6 order-head text-right text-capitalize">{i.label}</dt>
          //   <dd className="col-lg-7 col-md-6 col-sm-6">{i.description}</dd>
          // </div>
        ))}
      </dl>
    </Wrapper>
  )
}

DescriptionList.propTypes = {
  className: PropTypes.string,
  rowClassName: PropTypes.string,
  card: PropTypes.bool,
  title: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.any.isRequired,
        description: PropTypes.any.isRequired,
      }),
    ),
    PropTypes.object,
  ]).isRequired,
}

DescriptionList.defaultProps = {
  className: '',
  rowClassName: '',
  card: false,
  title: null,
}

export default DescriptionList
