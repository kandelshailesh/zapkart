/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup'

export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  // 'image/gif',
  'image/png',
  // 'image/svg+xml',
]

const EXCEL_FORMAT = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
const PDF_FORMAT = SUPPORTED_FORMATS.concat('application/pdf')

const NUMBER_ERROR_MSG = 'Must be a number'

const regExMobNo = /[6-9]\d{9}$/

// eslint-disable-next-line func-names
Yup.addMethod(Yup.string, 'phone', function () {
  return this.test('phone', 'Phone number is not valid', (value) => regExMobNo.test(value))
})

const checkFileType = (files, supportedFormats) => {
  let valid = true
  const formatReq = supportedFormats || SUPPORTED_FORMATS

  console.log('aaa', files)
  if (files && files.length > 0) {
    files.map((file) => {
      // console.log("file.type",file.type)
      if (file.type && !formatReq.includes(file.type)) {
        valid = false
      } else if (!file.type && !file.url) valid = false
      return ''
    })
  }
  return valid
}

export const brandSchemaA = Yup.object().shape({
  title: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  priorityOrder: Yup.string().nullable().required('Required'),
  imageTag: Yup.string().required('Required'),
  mainImage: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
  // .test('fileDimensions', 'Image should be min 450x338', files => {
  //   const a = checkImgDimensionsA(files, 450, 338)
  //   console.log(a)
  //   return a
  // })
  // .test('aspectRatio', 'Image should have aspect ratio 1.30 - 1.60', files =>
  //   checkAspectRatioA(files, 450, 338),
  // ),
  image: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
  // .test('fileDimensions', 'Image should be min 450x338', async files => {
  //   const a = await checkImgDimensionsA(files, 450, 338)
  //   console.log(a)
  //   return a
  // })
  // .test('aspectRatio', 'Image should have aspect ratio 1.30 - 1.60', async files =>
  //   checkAspectRatioA(files, 450, 338),
  // ),
  // .test('fileSize', 'File too large', value => value && value.size <= FILE_SIZE)
})

export const excelUploadSchema = Yup.object().shape({
  file: Yup.array()
    .test('fileFormat', 'Unsupported Format. Required: xlsx', (files) =>
      checkFileType(files, EXCEL_FORMAT),
    )
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
})

export const uploadDOCSchema = Yup.object().shape({
  file: Yup.array()
    .test('fileFormat', 'Unsupported Format. Required: pdf or image', (files) =>
      checkFileType(files, PDF_FORMAT),
    )
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
})

export const uploadAdminDOCSchema = Yup.object().shape({
  adminFiles: Yup.array()
    .test('fileFormat', 'Unsupported Format. Required: pdf or image', (files) =>
      checkFileType(files, PDF_FORMAT),
    )
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
})

export const prodImgsSchema = Yup.object().shape({
  file: Yup.array()
    .test('fileFormat', 'Unsupported Format. Required: jpg/ jpeg/ png', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
})

export const catalogbannerSchema = Yup.object().shape({
  name: Yup.string().required(),
  imglink: Yup.string(),
  status: Yup.string().required(),
  priorityOrder: Yup.number().required('Required'),
  image: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('Image(s) is required'),
  mobileimage: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('Image(s) is required'),
})

export const departmentsSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  priorityOrder: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  appointmentStatus: Yup.boolean().required('Required'),
})
export const editUserSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().nullable().required('Required'),
  email: Yup.string().email('Email is not valid').required('Required'),
  phone: Yup.string().phone('Invalid phone no').required('Required'),
  active: Yup.number().required('Required'),
  userGroupId: Yup.number(),
})

export const passwordSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  // password: Yup.string()
  //   .password(
  //     'Password must be between 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter',
  //   )
  //   .required('Required'),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //   .required('Required'),
})

export const editUserPassSchema = editUserSchema.concat(passwordSchema)

export const productGeneralSchema = Yup.object().shape({
  status: Yup.string().required('Required'),
  textDescription: Yup.string(),
  featured: Yup.boolean().required('Required'),
  name: Yup.string().required('Required'),
  sku: Yup.string().required('Required'),
  category: Yup.array().required('Required'),
  brand: Yup.string(),
  returnable: Yup.boolean().required('Required'),
  // codEnabled: Yup.boolean().required('Required'),
  quantity: Yup.number().required('Required').typeError(NUMBER_ERROR_MSG),
  minOrderQty: Yup.number().required('Required').typeError(NUMBER_ERROR_MSG),
  maxOrderQty: Yup.number()
    .typeError(NUMBER_ERROR_MSG)
    .required('Required')
    .when('minOrderQty', (st, schema) => {
      console.log('validating minOrderQty', st, schema)
      return schema.min(st, 'Value must be greater than Min Order Quantity')
    }),
  subtract: Yup.boolean().required('Required'),
  outOfStockStatus: Yup.string().required('Required'),
  returnPeriod: Yup.number().when('returnable', {
    is: (val) => {
      console.log(val)
      return val === true
    },
    then: Yup.number()
      .required('Required')
      .transform((value) => {
        console.log('in transform typeof', value)
        console.log('isNan?', Number.isNaN(value))
        return Number.isNaN(value) ? undefined : value
      })
      .typeError(NUMBER_ERROR_MSG),
    // otherwise: Yup.number().notRequired(),
    otherwise: Yup.number()
      .transform((value) => {
        console.log('in transform typeof', value)
        console.log('isNan?', Number.isNaN(value))
        return Number.isNaN(value) ? undefined : value
      })
      .notRequired(),
  }),
  image: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
  // metaTitle: Yup.string().required('Required'),
  // metaTags: Yup.string().required('Required'),
  // metaDescription: Yup.string().required('Required'),
})

export const pricingSchema = Yup.object().shape({
  // startDate: Yup.date().required('Required'),
  // endDate: Yup.date()
  //   .required('Required')
  //   .when('startDate', (st, schema) => {
  //     console.log('validating date', st, schema)
  //     return schema.min(st, 'End date must be after Start date')
  //   }),
  listPrice: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
  salePrice: Yup.number()
    .typeError(NUMBER_ERROR_MSG)
    .required('Required')
    .when('listPrice', (st, schema) => {
      console.log('validating salePrice', st, schema)
      return schema.max(st, 'Must be less than List Price')
    }),
  taxId: Yup.string().nullable(),
})

export const getSchemaFields = (schema) => {
  return Object.keys(Yup.reach(schema)?.fields)
}

export const seoSchema = Yup.object().shape({
  metaTitle: Yup.string().required('Required'),
  metaDescription: Yup.string().required('Required'),
  metaKeywords: Yup.string().required('Required'),
})

export const zoneSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  country: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  pincodes: Yup.string().required('Required'),
})

export const taxRateSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  rate: Yup.number().required('Required'),
})

export const taxClassSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  taxes: Yup.array().nullable().required('Required'),
})

export const attributeGroupSchema = Yup.object().shape({
  name: Yup.string(),
  priorityOrder: Yup.number(),
  values: Yup.array(),
  status: Yup.string(),
})
// attributes:[{attribute:'111',value:'111}]
export const attributesListSchema = Yup.object().shape({
  attributes: Yup.array().of(
    Yup.object().shape({
      attribute: Yup.string().nullable().required('Attribute group required'),
      value: Yup.string().nullable().required('Attribute value required'),
    }),
  ),
  // .required('Required'),
})

export const variantSchema = Yup.object().shape({
  // name: Yup.string().required('Required'),
  // status: Yup.string().required('Required'),
  // purchaseCount: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
  // availability: Yup.string().required('Required'),
  // attributes: Yup.string().required('Required'),
  // attributesValues: Yup.string(),
  // image: Yup.array()
  // .nullable()
  // .test('fileFormat', 'Unsupported Format', checkFileType)
  // .test('emptyArray', 'A file is required', a => a && a.length !== 0)
  // .required('A file is required'),
})

export const categorySchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  parent: Yup.string().nullable(),
  image: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0),
  // .required('Image(s) is required'),
  description: Yup.string(),
  metaTitle: Yup.string().required('Required'),
  metaDescription: Yup.string().required('Required'),
  metaKeywords: Yup.string().required('Required'),
  status: Yup.string().required(),
  priorityOrder: Yup.number().required('Required'),
})

export const prodDescrSchema = Yup.object().shape({
  description: Yup.string(),
  // keyBenefits: Yup.string(),
  // safetyInfo: Yup.string(),
  // otherInfo: Yup.string(),
  // directionsForUse: Yup.string(),
})

export const brandSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  image: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('Image(s) is required'),
  metaTitle: Yup.string(),
  metaDescription: Yup.string(),
  metaKeywords: Yup.string(),
  status: Yup.string().required(),
  priorityOrder: Yup.number().required('Required'),
})

export const manufactureSchema = Yup.object().shape({
  status: Yup.string().required('Required'),
})

export const sizechartSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  content: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
})

export const slatCompositionSchema = Yup.object().shape({
  status: Yup.string().required('Required'),
})

export const slatsysnonmsSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
})

export const containerValueSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
})

export const medicineTypeSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
})

export const disclemerSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
  content: Yup.string().required('Required'),
})

export const customOfferSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  content: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
})

export const userGroupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
})

export const infoSchema = Yup.object().shape({
  name: Yup.string().required(),
  shortDescription: Yup.string(),
  htmlContent: Yup.string().required(),
  metaTitle: Yup.string(),
  metaDescription: Yup.string(),
  metaKeywords: Yup.string(),
  status: Yup.string().required(),
  priorityOrder: Yup.number().required('Required'),
})

export const blogSchema = Yup.object().shape({
  name: Yup.string().required(),
  shortDescription: Yup.string(),
  htmlContent: Yup.string().required(),
  metaTitle: Yup.string(),
  metaDescription: Yup.string(),
  metaKeywords: Yup.string(),
  status: Yup.string().required(),
  imgtext_data: Yup.string(),
  priorityOrder: Yup.number().required('Required'),
  images: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('Image(s) is required'),
})

export const bannerSchema = Yup.object().shape({
  name: Yup.string().required(),
  shortDescription: Yup.string(),
  imglink: Yup.string(),
  imgtext: Yup.string(),
  status: Yup.string().required(),
  priorityOrder: Yup.number().required('Required'),
  images: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format. Required:(.jpg,.png,.jpeg)', checkFileType)
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('Image(s) is required'),
})

export const productShippingSchema = Yup.object().shape({
  lengthClass: Yup.string().required('Required'),
  weightClass: Yup.string().required('Required'),

  height: Yup.number().required('Required').typeError(NUMBER_ERROR_MSG),
  length: Yup.number().required('Required').typeError(NUMBER_ERROR_MSG),
  width: Yup.number().required('Required').typeError(NUMBER_ERROR_MSG),
  weight: Yup.number().required('Required').typeError(NUMBER_ERROR_MSG),
})

export const productSchema = productGeneralSchema
  .concat(productShippingSchema)
  .concat(seoSchema)
  .concat(pricingSchema)
  .concat(attributesListSchema)
  .concat(prodDescrSchema)

export const productSchemaForMerchant = Yup.object().shape({
  status: Yup.string().required('Required'),
  quantity: Yup.number().required('Required').typeError(NUMBER_ERROR_MSG),
  subtract: Yup.boolean().required('Required'),
  outOfStockStatus: Yup.string().required('Required'),
  salePrice: Yup.number().required('Required'),
  saleCommision: Yup.number().required('Required'),
  // productId: Yup.string().required('Required'),
})

export const merchantGeneralSchema = Yup.object().shape({
  status: Yup.string().required('Required'),
  merchantTypeId: Yup.string().required('Required'),
  commissionslab: Yup.string().required('Required'),
  establishdate: Yup.date().required('Required'),
  name: Yup.string().nullable().required('Required'),
  regnumber: Yup.string().nullable().required('Required'),
  address: Yup.string().nullable(),
  countryId: Yup.string().nullable(),
  stateId: Yup.string().nullable(),
  cityId: Yup.string().nullable(),
  zipcode: Yup.string().nullable(),
  profiledescription: Yup.string().nullable(),
  latitude: Yup.number('Must be a valid value').nullable().typeError(NUMBER_ERROR_MSG),
  longitude: Yup.number('Must be a valid value').nullable().typeError(NUMBER_ERROR_MSG),
  designation: Yup.string().nullable(),
  website: Yup.string().nullable(),
  // image: Yup.array()
  //   .nullable()
  //   .test('fileFormat', 'Unsupported Format', checkFileType),
})

export const merchantContactSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string(),
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export const merchantAcSchema = Yup.object().shape({
  accounttype: Yup.string().required('Required'),
  nameonaccount: Yup.string().required('Required'),
  accountdetails: Yup.string().required('Required'),
})

export const coupenSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  coupenCode: Yup.string().required('Required'),
  validFrom: Yup.string().required('Required'),
  validTo: Yup.string().required('Required'),
})

export const reviewSchema = Yup.object().shape({
  priorityOrder: Yup.number(),
  status: Yup.string(),
  rating: Yup.number().nullable(),
  text: Yup.string().nullable(),
  title: Yup.string().nullable(),
})

export const orderAddressSchema = Yup.object().shape({
  houseNo: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  landmark: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  pincode: Yup.string().required('Required'),
})

export const orderFormSchema = Yup.object().shape({
  paymentStatus: Yup.string().required('Required'),
  orderStatus: Yup.string().required('Required'),
})

export const orderItemSchema = Yup.object().shape({
  productId: Yup.string().required('Required'),
  quantity: Yup.string().required('Required').nullable(),
})

export const shippingPickupSchema = Yup.object().shape({
  isPickup: Yup.boolean(),
  pickupDateTime: Yup.date().when('isPickup', {
    is: (val) => {
      return val === true
    },
    then: Yup.date().required('Required'),
    otherwise: Yup.date().notRequired(),
  }),
  pickupClosingTime: Yup.date().when('isPickup', {
    is: (val) => {
      return val === true
    },
    then: Yup.date().required('Required'),
    otherwise: Yup.date().notRequired(),
  }),
})

export const shippingDispatchSchema = Yup.object().shape({
  isDispatch: Yup.boolean(),
  dispatchExpDeliveryDate: Yup.date().when('isDispatch', {
    is: (val) => {
      return val === true
    },
    then: Yup.date().nullable().required('Required'),
    otherwise: Yup.date().nullable().notRequired(),
  }),
  dispatchDate: Yup.date()
    .nullable()
    .when('isDispatch', {
      is: (val) => {
        return val === true
      },
      then: Yup.date().nullable().required('Required'),
      otherwise: Yup.date().nullable().notRequired(),
    }),
  dispatchStatusDetails: Yup.string().nullable(),
})

export const shippingDeliveredSchema = Yup.object().shape({
  isDelivered: Yup.boolean(),
  deliveredDate: Yup.date()
    .nullable()
    .when('isDelivered', {
      is: (val) => {
        return val === true
      },
      then: Yup.date().nullable().required('Required'),
      otherwise: Yup.date().nullable().notRequired(),
    }),
  deliveredComment: Yup.string().nullable(),
})

export const selectedItemsSchema = Yup.object().shape({
  selectedItems: Yup.array().required('At least one item must be selected'),
})

export const shipmentSchema = Yup.object().shape({
  // origin address
  merchantName: Yup.string().nullable().required('Required'),
  merchantAddress1: Yup.string().nullable().required('Required'),
  merchantAddress2: Yup.string().nullable(),
  city: Yup.string().nullable().required('Required'),
  country: Yup.string().nullable().required('Required'),
  state: Yup.string().nullable().required('Required'),
  zip: Yup.string().nullable().required('Required'),
  // shipping address
  shippingName: Yup.string().nullable().required('Required'),
  shippingAddress1: Yup.string().nullable().required('Required'),
  shippingAddress2: Yup.string().nullable(),
  shippingCity: Yup.string().nullable().required('Required'),
  shippingZip: Yup.string().nullable().required('Required'),
  shippingState: Yup.string().nullable().required('Required'),
  shippingCountry: Yup.string().nullable().required('Required'),
  shippingPhone: Yup.string().nullable().required('Required'),
  shippingEmail: Yup.string().nullable().required('Required'),
})

export const shipmentInfoSchema = Yup.object().shape({
  shippingStatus: Yup.string().nullable(),
  grossWeight: Yup.number()
    .nullable()
    .required('Required')
    .moreThan(0, 'Enter valid value')
    .typeError(NUMBER_ERROR_MSG),
  otherLogisticPartner: Yup.string().nullable().required('Required'),
  otherTrackingUrl: Yup.string().nullable().required('Required'),
  packageDetails: Yup.string().nullable(),
  dropOffType: Yup.string().nullable().required('Required'),
  comment: Yup.string().nullable(),
  trackingNumber: Yup.string().nullable().required('Required'),
})

export const mailSettingsSchema = Yup.object().shape({
  mailSecuritySetting: Yup.string().required('Required'),
  smtpHost: Yup.string().required('Required'),
  smtpUsername: Yup.string().required('Required'),
  smtpPassword: Yup.string().required('Required'),
  smtpPort: Yup.string().required('Required'),
  smtpTimeout: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
})

export const generalSettingsSchema = Yup.object().shape({
  projectName: Yup.string().required('Required'),
  projectLabel: Yup.string().required('Required'),
  shippingCost: Yup.number().typeError(NUMBER_ERROR_MSG),
  shippingAmount: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
  minCartValue: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
  codEnabled: Yup.boolean().required('Required'),
})

export const footerSettingsSchema = Yup.object().shape({
  projectName: Yup.string().required('Required'),
  socialmedia: Yup.array(),
  contacts: Yup.array(),
  text: Yup.string().required('Required'),
})

export const profileSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string(),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Required'),
})

export const stateSchema = Yup.object().shape({
  country: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
})

export const geoZoneSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
})

export const productPriceSchema = Yup.object().shape({
  productId: Yup.array().required('Required'),
  price: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
  quantity: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
  commission: Yup.number().typeError(NUMBER_ERROR_MSG).required('Required'),
})

export const createShipmentSchema = shippingPickupSchema
  .concat(selectedItemsSchema)
  .concat(shipmentSchema)
  .concat(shipmentInfoSchema)
export const editShipmentSchema = shippingDeliveredSchema
  .concat(shippingDispatchSchema)
  .concat(shipmentInfoSchema)

export const merchantSchema = merchantGeneralSchema
  .concat(merchantContactSchema)
  .concat(merchantAcSchema)

export const WidgetTypeSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  showTitle: Yup.string().required('Required'),
  numberOfItems: Yup.number().required('Required'),
  listingType: Yup.string().required('Required'),
})

export const widegtSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  discription: Yup.string().required('Required'),
  startDate: Yup.string().required('Required'),
  endDate: Yup.string().required('Required'),
  diplayOrder: Yup.number().required('Required'),
})

export const customAttrubitesSchema = Yup.object().shape({
  label: Yup.string().required('Required'),
  code: Yup.string().required('Required'),
  inputType: Yup.string().required('Required'),
  useInFilter: Yup.string().required('Required'),
  comparableOnfrontend: Yup.string().required('Required'),
  useInRecemondation: Yup.string().required('Required'),
})

export const createOrderSchema = Yup.object().shape({
  userId: Yup.string().required('Required'),
  cart: Yup.array().required('Required'),
  shippingId: Yup.string().required('Required'),
})

export const AddressSchema = Yup.object().shape({
  fullName: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  address_type: Yup.string().required('Required'),
  pincode: Yup.string().required('Required'),
  mobileNo: Yup.string().required('Required'),
  houseNo: Yup.string().required('Required'),
  street: Yup.string().required('Required'),
  landmark: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
})

export const prescriptionSchema = Yup.object().shape({
  prescription: Yup.array()
    .nullable()
    .test('fileFormat', 'Unsupported Format', (prescription) =>
      checkFileType(prescription, PDF_FORMAT),
    )
    .test('emptyArray', 'A file is required', (a) => a && a.length !== 0)
    .required('A file is required'),
})
