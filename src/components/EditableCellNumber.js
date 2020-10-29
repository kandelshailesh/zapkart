/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react'
import { InputNumber, Icon } from 'antd'

class EditableCell extends Component {
  state = {
    value: this.props.value,
    editable: false,
  }

  handleChange = e => {
    // const value = e.target.value
    this.setState({ value: e })
  }

  check = async () => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      const changed = await this.props.onChange(this.state.value)
      console.log(' check change', changed)
      if (!changed) this.setState({ value: this.props.value })
    }
  }

  edit = () => {
    this.setState({ editable: true })
  }

  render() {
    const { value, editable } = this.state
    const { min, max } = this.props
    return (
      <div className="editable-cell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <InputNumber
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
              width="50"
              min={min}
              max={max}
            />
            <Icon type="check" className="editable-cell-icon-check" onClick={this.check} />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper">
            <span className="mr-2">{value || ' '}</span>
            <Icon type="edit" className="editable-cell-icon" onClick={this.edit} />
          </div>
        )}
      </div>
    )
  }
}

export default EditableCell
