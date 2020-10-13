/* eslint-disable no-underscore-dangle */
/* eslint-disable no-global-assign */
/* eslint-disable func-names */
import moment from 'moment'
import convertUnits from 'convert-units'

export const GlobalDebug = (function() {
  const savedConsole = console
  return function(debugOn = true, suppressAll) {
    const suppress = suppressAll || false

    if (debugOn === false) {
      console = {}
      console.log = function() {}
      if (suppress) {
        console.info = function() {}
        console.warn = function() {}
        console.error = function() {}
      } else {
        console.info = savedConsole.info
        console.warn = savedConsole.warn
        console.error = savedConsole.error
      }
    } else {
      console = savedConsole
    }
  }
})()

export function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

export function getFormattedDate(dateJSON) {
  const date = new Date(dateJSON)
  const DD = (date.getDate() < 10 ? '0' : '') + date.getDate()
  const MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1)
  const YYYY = date.getFullYear()

  return `${DD}-${MM}-${YYYY}`
}

export function getFormattedTime(dateJSON) {
  const date = new Date(dateJSON)
  const HH = (date.getHours() < 10 ? '0' : '') + date.getHours()
  const mm = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  const ss = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()

  return `${HH}:${mm}:${ss}`
}

export const unflatten = (array, parent, tree) => {
  tree = typeof tree !== 'undefined' ? tree : []
  parent = typeof parent !== 'undefined' ? parent : { id: 0 }
  // console.log('unflatten', array)
  const children = array.filter(child => {
    return child.parent === parent.id
  })
  console.log(children.length)
  if (children.length !== 0) {
    if (parent.id === 0) {
      tree = children
    } else {
      parent.children = children
    }
    children.forEach(child => {
      unflatten(array, child)
    })
  }

  return tree
}

export const unflattenOrig = (array, parent, tree) => {
  tree = typeof tree !== 'undefined' ? tree : []
  parent = typeof parent !== 'undefined' ? parent : { id: 0 }
  // console.log('unflatten', array)
  const children = array.filter(child => {
    return child.parent === parent.id
  })
  console.log(children.length)
  if (children.length !== 0) {
    if (parent.id === 0) {
      tree = children
    } else {
      parent.children = children
    }
    children.forEach(child => {
      unflatten(array, child)
    })
  }

  return tree
}

export const validateQty = (rule, value, callback) => {
  const reg = /^-?(0|[1-9][0-9]*)?$/
  console.log(value)
  // console.log((Number(value) % 1 === 0))
  // if (Number(value) === value && value % 1 === 0) {
  if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
    //     // props.onChange(changedFields);
    callback()
    return
  }
  callback('Not a valid quantity!')
}

export const validateEndDate = (rule, value, callback, startDate) => {
  console.log(value, startDate)
  callback()
}

export const getBaseName = path => {
  // console.log(path)
  if (path) {
    const parsed = path.split('/')
    return parsed[parsed.length - 1]
  }
  return ''
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    lg: { span: 12 },
    // lg: { span: 18 },
  },
}

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      // span: 16,
      // offset: 8,
      span: 16,
      offset: 4,
    },
  },
}

export const generateCategoryTree = (categories, id) => {
  const categoriesFormatted = categories.map(item => {
    if ((id && id !== item._id) || !id) {
      const parent =
        typeof item.parent === 'object' && item.parent !== null ? item.parent._id : item.parent
      return {
        title: item.name,
        value: item._id,
        key: item._id,
        id: item._id,
        parent: item.parent === null ? 0 : parent,
      }
    }
    return {}
  })
  const tree = unflatten(categoriesFormatted)
  return tree
}

export const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`
}

export const getFormData = (data, fields = []) => {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    if (value && (value.constructor === Array || value.constructor === Object))
      value = JSON.stringify(value)
    if (fields.length === 0) formData.append(key, value)
    else if (fields.includes(key)) {
      if (value) formData.append(key, value)
    }
  })
  return formData
}

/**
 *
 * @param {array} items
 * @param {number} items.weight
 * @param {number} items.unit
 * @param {number} items.quantity
 */
export const calculateWeight = (items, toUnit = 'lb') => {
  console.log('CONVERT UNIT', 'items', items, toUnit)
  try {
    let totalWeight = 0
    items.forEach(i => {
      const weight = parseInt(i.weight, 10)
      const unit = getUnit(i.unit)
      const quantity = parseInt(i.quantity, 10)

      console.log('CONVERT UNIT', weight, unit, quantity)

      const convertedUnit = convertUnits(weight)
        .from(unit)
        .to(toUnit)
        .toFixed(3)
      totalWeight += convertedUnit * quantity
    })
    return totalWeight
  } catch (error) {
    console.error(error)
    return 0
  }
}

const getUnit = i => {
  switch (i) {
    case 'gm':
      return 'g'
    case 'pound':
      return 'lb'
    case 'ounce':
      return 'oz'
    default:
      return i
  }
}

export const getFileExtension = (str = '') => {
  return str.split('.').pop()
}
