import React from 'react'
import isEmpty from 'lodash/isEmpty'

const PlaceholderImage = ({ src, alt, ...rest }) => {
  return (
    <img {...rest} alt={alt} src={!isEmpty(src) ? src : 'resources/images/ecommerce-empty.jpg'} />
  )
}

PlaceholderImage.defaultProps = {
  alt: '',
  src: 'resources/images/ecommerce-empty.jpg',
}

export default PlaceholderImage
