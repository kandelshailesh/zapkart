import React, { useState, useEffect } from 'react'
import { Input, Tooltip, Icon, Button } from 'antd'

const Demo = (props) => {
  const [inputFields, setInputFields] = useState([{ start: '', end: '' }])
  // const handleChangeInput = (index, event) => {
  //   console.log('index', index, event.target)
  //   const values = [...inputFields]
  //   values[index][event.target.name] = event.target.value
  //   setInputFields(values)
  //   console.log('input', inputFields)
  // }
  useEffect(() => {
    //   if(props.values){
    //     setInputFields(props.values.pincodes)
    //   }
  })

  const handleChangeInput = (index, event) => {
    console.log('index', index, event.target)
    const newArray = [...inputFields]
    newArray[index][event.target.name] = Number(event.target.value)
    setInputFields(newArray)
    // console.log('input', inputFields)
    props.handlePincodes(inputFields)
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { start: '', end: '' }])
  }

  const handleRemoveFields = (index) => {
    const newArray = [...inputFields]
    newArray.splice(index, 1)
    setInputFields(newArray)
  }

  return (
    <>
      {inputFields.map((inputField, index) => {
        console.log(index)
        return (
          <div>
            <br />
            Start:
            <Input
              name="start"
              label="start"
              variant="filled"
              type="number"
              value={inputField.start}
              onChange={(event) => handleChangeInput(index, event)}
            />
            End:
            <Input
              name="end"
              label="end"
              variant="filled"
              type="number"
              value={inputField.end}
              onChange={(event) => handleChangeInput(index, event)}
            />
            <Tooltip title="Add new attribute">
              <Button shape="circle" size="small" onClick={() => handleAddFields()} type="primary">
                <Icon type="plus" />
              </Button>
            </Tooltip>
            <Tooltip title="Delete attribute">
              <Button
                size="small"
                onClick={() => handleRemoveFields(index)}
                shape="circle"
                type="danger"
              >
                <Icon type="minus" />
              </Button>
            </Tooltip>
          </div>
        )
      })}
      {inputFields.length === 0 ? (
        <Tooltip title="Add new attribute">
          <Button shape="circle" size="small" onClick={() => handleAddFields()} type="primary">
            <Icon type="plus" />
          </Button>
        </Tooltip>
      ) : (
        ''
      )}
    </>
  )
}
export default Demo
