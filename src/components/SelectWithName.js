import React from 'react'
import { Select } from 'antd'

const { Option: SelectOption } = Select

const SelectWithName = props => {
  const { children, style, defaultValue, placeholder, name } = props
  console.log(props)
  // children.forEach(i => console.log(i.type.displayName))
  const handleChange = e => {
    console.log(e, name)
    props.onChange(e, name)
  }
  return (
    <Select
      // labelInValue
      {...props}
      defaultValue={defaultValue}
      showSearch
      style={style}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={handleChange}
      // onFocus={onFocus}
      // onBlur={onBlur}
      // onSearch={onSearch}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {children}
    </Select>
  )
}

SelectWithName.Option = SelectOption
export default SelectWithName
