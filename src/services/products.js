/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { notification } from 'antd'
import { ERROR_TRY_LATER, CATALOG_API_URL } from '_constants'
import difference from 'lodash/difference'
import callApi from 'utils/callApi'
import { isEmpty } from 'lodash'

const requiredFields = [
  'name',
  'sku',
  'prescriptionNeeded',
  'brand',
  'returnable',
  'returnPeriod',
  'featured',
  'startDate',
  'endDate',
  'listPrice',
  'salePrice',
  'weight',
  'height',
  'length',
  'width',
  'metaTitle',
  'metaDescription',
  'metaKeywords',
  'taxId',
  'status',
  'lengthClass',
  'weightClass',
  'outOfStockStatus',
  'subtract',
  'outOfStockStatus',
  'quantity',
  'minOrderQty',
  'codEnabled',
  'maxOrderQty',
  'priorityOrder',
  'description',
  // 'keyBenefits',
  // 'directionsForUse',
  // 'safetyInfo',
  // 'otherInfo',
  'relatedProducts',
  'frequentlyBought',
  'sizeChart',
  'offerOverride',
  'disclaimerOverride',
  'manufacture',
  'storageDiscription',
  'linktoBase',
  'saleCommision',
  'productId',
  'merchantId',
  'price_include_tax',
]

export async function getProducts(query) {
  // itemsPerPage, currentPage, limit, sortField, sortOrder
  console.log(query)
  let appendQuery = ''
  if (query)
    Object.entries(query).forEach(([key, val]) => {
      switch (key) {
        case 'itemsPerPage':
          appendQuery += `limit=${val}&`
          break
        case 'currentPage':
          appendQuery += `page=${val}&`
          break
        case 'sortField':
          appendQuery += `sortField=${val}&`
          break
        case 'sortOrder':
          appendQuery += `sortOrder=${val}&`
          break
        case 'search':
          Object.entries(val).forEach(([k, v]) => {
            console.log(val, k, v)
            appendQuery += `${key}[${k}]=${v}&`
          })
          break
        case 'fields':
          val.forEach((i) => {
            appendQuery += `fields[]=${i}&`
          })
          break
        default:
          break
      }
    })

  const url = `${CATALOG_API_URL.getProducts}${appendQuery.length > 0 ? `?${appendQuery}&` : ''}`
  try {
    const res = await callApi(url)
    // const { products } = res
    const { data } = res
    console.log(data)
    if (data) return data
    notification.error({
      message: 'No products',
    })
  } catch (error) {
    console.error(error)
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export async function deleteProduct(id) {
  const url = `${CATALOG_API_URL.getProducts}/${id}`
  const options = {
    method: 'DELETE',
  }
  try {
    const res = await callApi(url, options)
    if (res && res.success) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}

export async function addProduct(values, parentId) {
  const url = CATALOG_API_URL.createProduct

  const formData = new FormData()
  const tempVideoLink = []
  const st = []
  const required = []
  if (values?.contents && values?.contents.length > 0) {
    values.contents.forEach((element) => {
      required.push(element.title)
      required.push(element.data)
    })
  }

  Object.entries(values).forEach(([key, value]) => {
    if (
      key !== 'vediolink' &&
      key.split('_')[0] === 'vediolink' &&
      typeof Number(key.split('_')[1]) === 'number'
    ) {
      tempVideoLink.push(value)
    }
    const abc = key.split(/[[\]]{1,2}/)
    if (required.includes(key)) {
      if (abc.length > 0 && (abc[0] === 'contentTitle' || abc[0] === 'contentData')) {
        let name = ''
        if (abc[0] === 'contentTitle') {
          name = 'title'
        } else if (abc[0] === 'contentData') {
          name = 'data'
        }

        if (st[abc[1]]) {
          const dd = {}
          dd[name] = value
          st[abc[1]] = { ...st[abc[1]], ...dd }
        } else {
          const dt = {}
          dt[name] = value
          st.push(dt)
        }
      }
    }
    switch (key) {
      case 'tags':
        if (value.length === 0) {
          formData.append(`${key}`, null)
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'customeOffer':
        if (value.length === 0) {
          formData.append(`${key}`, null)
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'disclaimer':
        if (value.length === 0) {
          formData.append(`${key}`, null)
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'saltComposition':
        if (value.length === 0) {
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'saltSynonyms':
        if (value.length === 0) {
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'medicinetype':
        formData.append(
          'medicinetype',
          JSON.stringify({
            medicinetype: values.medicinetype,
            midleText: values.midleText,
            containervalue: values.containervalue,
          }),
        )
        break
      case 'attributes':
        formData.append(
          'attributes',
          JSON.stringify(value.map((i) => ({ attributeGroup: i.attribute, value: i.value }))),
        )
        break
      case 'cutomAttributes':
        if (!isEmpty(value) && value[0]?.attribute !== '') {
          formData.append(
            'cutomAttributes',
            JSON.stringify(
              value
                .filter((val) => val.value)
                .map((i) => ({
                  // attribute: i.attribute._id,
                  // values: i.value.map((va) => va._id),
                  // inputType: i.inputType,
                  attribute: i.attribute,
                  values: i.value,
                  inputType: i.inputType,
                })),
            ),
          )
          value
            .filter((val) => val.inputType === 'file')
            .map((val) => formData.append('cutomAttributeFile', val.value.originFileObj))
        } else {
          formData.append('cutomAttributes', [])
        }

        break
      case 'groupPrice':
        if (!isEmpty(value) && value[0]?.customerGroup !== '') {
          formData.append(
            'groupPrice',
            JSON.stringify(
              value.map((i) => ({
                customerGroup: i.customerGroup,
                price: i.price,
              })),
            ),
          )
        } else {
          formData.append('groupPrice', [])
        }

        break

      case 'tierPrice':
        if (!isEmpty(value) && value[0]?.customerGroup !== '') {
          formData.append(
            'tierPrice',
            JSON.stringify(
              value.map((i) => ({
                customerGroup: i.customerGroup,
                price: i.price,
                quantity: i.quantity,
              })),
            ),
          )
        } else {
          formData.append('tierPrice', [])
        }

        break

      case 'returnPeriod': {
        console.log('is returnable', values.returnable)
        if (values.returnable) formData.append(key, value)
        else formData.append(key, null)
        break
      }
      case 'composition':
      case 'organic':
      case 'category':
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'relatedProducts':
      case 'frequentlyBought':
        value.map((i) => formData.append(`${key}[]`, i.key))
        break
      case 'image': {
        console.log('new product images', value)
        value.filter((i) => i.originFileObj).map((i) => formData.append('image', i.originFileObj))
        if (parentId) value.filter((i) => i.url).map((i) => formData.append('imageUrl[]', i.url))
        break
      }
      case 'parentId':
        formData.append('parentId', value)
        formData.append('variantType', value ? 'multiple' : 'single')
        break

      default:
        if (requiredFields.includes(key)) formData.append(key, value)
        break
    }
  })
  formData.append('contents', JSON.stringify(st))
  formData.append('vediolink', JSON.stringify(tempVideoLink))
  formData.append('purchaseCount', 0)
  const options = {
    method: 'POST',
    body: formData,
  }

  try {
    const res = await callApi(url, options)
    const { data } = res
    console.log(res)
    if (data) return data
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

/**
 * edit product; compare images with original datas' for deletion
 * @param {Object} values
 * @param {string} id
 * @param {Object} originalData
 * @param {string} parentId
 */
export async function editProduct(values, id, originalData) {
  const url = `${CATALOG_API_URL.getProducts}/${id}`
  const formData = new FormData()

  const origImgIds = originalData.images.map((i) => i._id)
  const formImgsIds = values.image.filter((i) => !i.originFileObj).map((i) => i.uid)
  const deletedImages = difference(origImgIds, formImgsIds)

  console.log('values', values)
  console.log('originalData', originalData)
  const tempVideoLink = []
  const st = []
  const required = []
  if (values?.contents && values?.contents.length > 0) {
    values.contents.forEach((element) => {
      required.push(element.title)
      required.push(element.data)
    })
  }
  Object.entries(values).forEach(([key, value]) => {
    if (
      key !== 'vediolink' &&
      key.split('_')[0] === 'vediolink' &&
      typeof Number(key.split('_')[1]) === 'number'
    ) {
      console.log('keykey', key)
      tempVideoLink.push(value)
    }

    const abc = key.split(/[[\]]{1,2}/)
    if (required.includes(key)) {
      if (abc.length > 0 && (abc[0] === 'contentTitle' || abc[0] === 'contentData')) {
        let name = ''
        if (abc[0] === 'contentTitle') {
          name = 'title'
        } else if (abc[0] === 'contentData') {
          name = 'data'
        }

        if (st[abc[1]]) {
          const dd = {}
          dd[name] = value
          st[abc[1]] = { ...st[abc[1]], ...dd }
        } else {
          const dt = {}
          dt[name] = value
          st.push(dt)
        }
      }
    }

    switch (key) {
      case 'tags':
        if (value.length === 0) {
          formData.append(`${key}`, null)
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'customeOffer':
        if (value.length === 0) {
          formData.append(`${key}`, null)
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'disclaimer':
        if (value.length === 0) {
          formData.append(`${key}`, null)
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'saltComposition':
        if (value.length === 0) {
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'saltSynonyms':
        if (value.length === 0) {
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'medicinetype':
        formData.append(
          'medicinetype',
          JSON.stringify({
            medicinetype: values.medicinetype,
            midleText: values.midleText,
            containervalue: values.containervalue,
          }),
        )
        break

      case 'attributes':
        formData.append(
          'attributes',
          JSON.stringify(value.map((i) => ({ attributeGroup: i.attribute, value: i.value }))),
        )
        break
      case 'cutomAttributes':
        if (!isEmpty(value) && value[0]?.attribute !== '') {
          formData.append(
            'cutomAttributes',
            JSON.stringify(
              value.map((i) => ({
                attribute: i.attribute,
                values: i.value,
                inputType: i.inputType,
              })),
            ),
          )
          value
            .filter((val) => val.inputType === 'file')
            .map((val) => formData.append('cutomAttributeFile', val.value.originFileObj))
        } else {
          formData.append('cutomAttributes', [])
        }

        break
      case 'groupPrice':
        if (!isEmpty(value) && value[0]?.customerGroup !== '') {
          formData.append(
            'groupPrice',
            JSON.stringify(
              value.map((i) => ({
                customerGroup: i.customerGroup,
                price: i.price,
              })),
            ),
          )
        } else {
          formData.append('groupPrice[]', null)
        }

        break

      case 'tierPrice':
        if (!isEmpty(value) && value[0]?.customerGroup !== '') {
          formData.append(
            'tierPrice',
            JSON.stringify(
              value.map((i) => ({
                customerGroup: i.customerGroup,
                price: i.price,
                quantity: i.quantity,
              })),
            ),
          )
        } else {
          formData.append('tierPrice[]', null)
        }

        break

      case 'composition':
      case 'organic':
        if (value.length === 0) {
          formData.append(`${key}`, null)
          break
        }
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'category':
        value.map((i) => formData.append(`${key}[]`, i))
        break
      case 'relatedProducts':
      case 'frequentlyBought':
        if (value.length === 0) {
          formData.append(`${key}`, null)
          break
        }
        value.map((i) => formData.append(`${key}[]`, i.key))
        break
      case 'image':
        value.map((i) => formData.append('image', i.originFileObj))
        break
      case 'quantity':
        if (requiredFields.includes(key)) formData.append(key, value)
        break
      case 'slug':
        formData.append(key, value)
        break
      case 'parentId':
        formData.append('parentId', value)
        formData.append('variantType', value ? 'multiple' : 'single')
        break
      default:
        console.log(key, value)

        if (value && value !== 'undefined') {
          if (requiredFields.includes(key)) formData.append(key, value)
        }
        break
    }
  })
  if (deletedImages.length > 0) {
    deletedImages.forEach((i) => formData.append('deletedImages[]', i))
  }
  formData.append('vediolink', JSON.stringify(tempVideoLink))
  formData.append('contents', JSON.stringify(st))
  formData.append('purchaseCount', 0)

  const options = {
    method: 'PATCH',
    body: formData,
  }
  try {
    const res = await callApi(url, options)
    const { data } = res
    console.log(res)
    if (data) return data
  } catch (error) {
    notification.error({
      error: 'Error',
      message: error.message || ERROR_TRY_LATER,
    })
  }
  return null
}

export function transformProductToForm(data) {
  console.log(data.minOrderQty, data.maxOrderQty)
  const {
    shipping,
    seo,
    category,
    productPricing,
    images,
    brand,
    stock,
    attributes,
    minOrderQty,
    maxOrderQty,
    relatedProducts,
    frequentlyBought,
    productExtraInfo = {},
    customeOffer,
    disclaimer,
    medicinetype,
    saltComposition,
    saltSynonyms,
    composition,
    organic,
    vediolink,
    manufacture,
    sizeChart,
    cutomAttributes,
    groupPrice,
    tierPrice,
  } = data
  const { containervalue, medicinetype: temp, midleText } = medicinetype
  const {
    listPrice,
    salePrice,
    startDate,
    endDate,
    saleCommision,
    taxId,
    merchantId,
    price_include_tax,
  } = productPricing
  const { _id } = taxId
  const { contents } = productExtraInfo
  const temp2 = {}
  if (vediolink.length > 0) {
    vediolink.forEach((i, ind) => {
      temp2[`vediolink_${ind}`] = i
    })
  }
  const temp3 = {}
  if (contents.length > 0) {
    contents.forEach((i, ind) => {
      console.log('watch', i)
      temp3[`contentTitle[${ind}]`] = i.title
      temp3[`contentData[${ind}]`] = i.data
    })
  }
  return {
    ...data,
    ...temp2,
    ...temp3,
    listPrice,
    salePrice,
    startDate,
    price_include_tax,
    endDate,
    taxId: _id,
    merchantId,
    sizeChart: sizeChart?._id,
    manufacture: manufacture?._id,
    saleCommision,
    containervalue: containervalue._id,
    medicinetype: temp._id,
    midleText,
    organic: organic?.map((i) => i._id),
    saltSynonyms: saltSynonyms?.map((i) => i._id),
    saltComposition: saltComposition?.map((i) => i._id),
    disclaimer: disclaimer?.map((i) => i._id),
    customeOffer: customeOffer?.map((i) => i._id),
    composition: composition?.map((i) => i._id),
    image: images.map((i) => ({
      uid: i._id,
      url: i.url,
    })),
    brand: brand._id,
    relatedProducts:
      relatedProducts && relatedProducts.length && relatedProducts.length > 0
        ? relatedProducts.map((i) => ({ key: i._id, label: i.name, value: i._id }))
        : [],
    frequentlyBought:
      frequentlyBought && frequentlyBought.length && frequentlyBought.length > 0
        ? frequentlyBought.map((i) => ({ key: i._id, label: i.name, value: i._id }))
        : [],
    category: category && category.length && category.length > 0 ? category.map((i) => i._id) : [],
    metaTitle: seo.metaTitle,
    metaDescription: seo.metaDescription,
    metaKeywords: seo.metaKeywords,
    lengthClass: shipping.dimensions.length.unit,
    weightClass: shipping.weight.unit,
    height: shipping.dimensions.height.value,
    length: shipping.dimensions.length.value,
    width: shipping.dimensions.width.value,
    weight: shipping.weight.value,
    subtract: stock.subtract,
    outOfStockStatus: stock.outOfStockStatus,
    quantity: stock.quantity,
    minOrderQty,
    maxOrderQty,
    // description,
    // keyBenefits,
    // directionsForUse,
    // safetyInfo,
    // otherInfo,
    contents,
    attributes:
      attributes && attributes.length && attributes.length > 0 && attributes.length > 0
        ? attributes.map((i) => ({
            attribute: i.attributeGroup._id,
            value: i.value._id,
          }))
        : [],
    cutomAttributes:
      // cutomAttributes && cutomAttributes.length && attributes.length > 0 && attributes.length > 0
      cutomAttributes && cutomAttributes.length > 0
        ? cutomAttributes.map((i) => ({
            attribute: i.attribute?._id ? i.attribute._id : '',
            values: Array.isArray(i.values) ? i.values.map((va) => va._id) : i.values,
            inputType: i.inputType,
          }))
        : [],
    groupPrice,
    tierPrice,
  }
}

export async function editStatus(id, status) {
  const url = `${CATALOG_API_URL.getProducts}/${id}?status=${status}`
  const options = {
    method: 'PATCH',
  }
  try {
    const res = await callApi(url, options)
    if (res.data && res.data.status === status) return true
    return false
  } catch (error) {
    notification.error({
      message: 'Error!',
      description: error.message,
    })
    return false
  }
}
