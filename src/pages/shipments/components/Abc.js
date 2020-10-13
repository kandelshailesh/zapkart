import React from 'react'
import { FormContext } from 'components/Form'

const Abc = () => {
  const context = React.useContext(FormContext)
  console.log('FORMDET', 'Abc', context)
  return <div>hello</div>
}

export default Abc
