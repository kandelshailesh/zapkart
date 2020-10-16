export const LOGIN_SUCCESS = 'Login successful'
export const LOGIN_SUCCESS_MESSAGE = 'You have successfully logged in!'
export const SESSION_EXPIRED_MESSAGE = 'Session expired'
export const SESSION_EXPIRED_MESSAGE_DESC = 'Your session expired. Please sign in again'
export const LOGIN_FAIL_MESSAGE = 'Please check your username & password and try again'
export const SUCCESS = 'Success!'
export const EDIT_SUCCESS_MESSAGE = 'Successfully edited'
export const ADD_SUCCESS_MESSAGE = 'Successfully added'
export const DELETE_SUCCESS_MESSAGE = 'Deleted successfully'
export const FAILED = 'FAILED'
export const ERROR_TRY_LATER = "'Something went wrong. Please try again later!'"

export const ROLES = {
  admin: 'admin',
  seller: 'seller',
  merchant: 'merchant',
  enduser: 'enduser',
}

export const ATTRIBUTES_PATH = {
  list: '/catalog/customattributes/list',
  add: '/catalog/customattributes/create',
  edit: '/catalog/customattributes/attributes/:id',
}
export const LINKS = {
  addAttribute: '/catalog/attributes/add-attribute-group',
  editAttribute: '/catalog/attributes/attribute',
  productList: '/catalog/products',
  editProduct: '/catalog/products/product',
  addProduct: '/catalog/products/add-product',
  editBrand: '/catalog/brands/brand',
  addBrand: '/catalog/brands/add-brand',
  offersList: '/offers',
  addOffer: '/offers/add-offer',
  addCategory: '/catalog/category/add-category',
  category: '/catalog/category',
  informations: '/catalog/informations',
  addInformations: '/catalog/informations/add',
  blogs: '/blogs',
  addBlogs: '/blogs/add-blog',
  banners: '/banners',
  catalogbanners: '/catalog/banners',
  addBanners: '/banners/add-banner',
  addCoupens: '/coupen/create',
  editCoupen: '/coupon/edit',
  coupens: '/coupon/list',
  ordersList: '/order-management/orders',
  viewEditOrder: '/order-management/orders/order',
  editSizechart: '/catalog/sizecharts/sizechart',
  editManufacture: '/catalog/manufacture/manufacture',
  saltcomposition: '/catalog/saltcomposition',
  editsaltcomposition: '/catalog/saltcomposition/composition',
  saltsynonyms: '/catalog/saltsynonyms',
  editsaltsynonyms: '/catalog/saltsynonyms/synonyms',
  containers: '/catalog/containers',
  editcontainers: '/catalog/containers/container',
  medicinetype: '/catalog/medicinetype',
  editmedicinetype: '/catalog/medicinetype/type',
  customerdisclaimer: '/catalog/customerdisclaimer',
  editcustomerdisclaimer: '/catalog/customerdisclaimer/disclaimer',
  customoffers: '/catalog/customoffers',
  editcustomoffers: '/catalog/customoffers/offer',
  // categories: '/offers/add-offer'
}

export const CATALOG_API_URL = {
  // attributeUrl: 'http://localhost:3002/api/attributesGroup',
  getCategories: '/api/catalog/v1/category',
  getInformations: '/api/catalog/v1/informations',
  getOrganics: '/api/catalog/v1/organic',
  getBrands: '/api/catalog/v1/brands',
  getTaxClasses: '/api/catalog/v1/taxClass',
  getCompositions: '/api/catalog/v1/composition',
  getMedicineTypes: '/api/catalog/v1/medicineType',
  getAttributes: '/api/catalog/v1/attributeGroup',
  getOffers: '/api/catalog/v1/discounts',
  getProducts: '/api/catalog/v1/products',
  createProduct: '/api/catalog/v1/products/create',
  getGenerics: '/api/catalog/v1/generic',
  getAllReviews: '/api/backend/v1/reviews',
  getProductReviews: '/api/backend/v1/reviews/product',
  getUserReviews: '/api/backend/v1/reviews/user',
  editProductUserReview: '/api/backend/v1/reviews/edit',
  deleteReview: '/api/backend/v1/reviews/delete',
  users: '/api/backend/v1/users',
  getUserOrders: '/api/backend/v1/order/user',
  getOrder: '/api/backend/v1/order',
  getOrderStats: '/api/backend/v1/order/stats',
  getAllOrders: '/api/backend/v1/order/all',
  getWishlist: '/api/backend/v1/users/wishlist',
  editOrder: '/api/backend/v1/order/update',
  editOrderItem: '/api/backend/v1/order/orderItem',
  assignOrderItem: '/api/backend/v1/order/assign',
  unshippedItems: '/api/backend/v1/shipment/unshipped',
  createShipment: '/api/backend/v1/shipment/create',
  shipment: '/api/backend/v1/shipment',
  getShipments: '/api/backend/v1/shipment/all',
  signup: '/api/backend/v1/users/register',
  editUser: '/api/backend/v1/users/update',

  manufacture: '/api/catalog/v1/manufacture',
  sizeChart: '/api/catalog/v1/sizeChart',
  saltComposition: '/api/catalog/v1/saltcomposition',
  saltsynonims: '/api/catalog/v1/saltsynonims',
  containervalue: '/api/catalog/v1/containervalue',
  medicinetypes: '/api/catalog/v1/medicinetypes',
  customeoffer: '/api/catalog/v1/customeoffer',
  disclaimer: '/api/catalog/v1/disclaimer',

  getMailSettings: '/api/backend/v1/mailSettings',
  getGeneralSettings: '/api/catalog/v1/generalSettings',
  getFooterSettings: '/api/catalog/v1/footerlinks',
  uploadExcel: '/api/catalog/v1/uploadExcel',
  uploadImages: '/api/catalog/v1/uploadImages',
  taxClass: 'api/catalog/v1/taxClass',
  zone: 'api/catalog/v1/zone',
  taxRate: 'api/catalog/v1/taxRate',
  country: 'api/catalog/v1/country',
  state: 'api/catalog/v1/state',
  geoZone: 'api/catalog/v1/geozone',
  getUserRewards: 'api/backend/v1/reward/user',
  getNetwork: 'api/backend/v1/network',
  verifyUser: '/api/backend/v1/users/verify',
  updateUserPassword: '/api/backend/v1/users/updatePasswordbyadmin',
  uploadAgreement: '/api/backend/v1/aggrement/merchant',
  getMerchants: '/api/backend/v1/merchant',
  agreementByAdmin: '/api/backend/v1/aggrement/admin',
  agreementStatusByAdmin: '/api/backend/v1/aggrement/adminapprove',

  createPriceByMerchant: '/api/catalog/v1/productprice/create',
  updatePriceByMerchant: '/api/catalog/v1/productprice/merchant',
  deletePriceByMerchant: '/api/catalog/v1/productprice',
  deletePriceByadmin: '/api/catalog/v1/productprice',
  getProductPriceList: '/api/catalog/v1/productprice/merchant/query',

  widget: '/api/catalog/v1/widget',
  widgetCreate: '/api/catalog/v1/widget/create',
  widgetTab: '/api/catalog/v1/widgetTab',
  widgetTabCreate: '/api/catalog/v1/widgetTab/create',

  updateProductPriceByAdmin: '/api/catalog/v1/productprice/admin',
}

export const STATE_LIST_API = {
  getStates: 'api/catalog/v1/indianpincode?stateName=1',
}

export const USERGROUP_API_URL = {
  getUserGroup: '/api/backend/v1/userGroup',
}

export const BLOG_API_URL = {
  getBlogs: '/api/catalog/v1/blog',
}

export const BANNER_API_URL = {
  getBanners: '/api/catalog/v1/banner',
}
export const CATALOG_BANNER_API_URL = {
  getBanners: '/api/catalog/v1/widgetbanner',
}

export const USER_API_URL = {
  getUserPerPage: '/api/backend/v1/usersperpage',
}

export const API_URL = {
  // attributeUrl: 'http://localhost:3002/api/attributesGroup',
  attributeUrl: '/api/catalog/v1/attributeGroup',
  offersUrl: '/api/discounts',
  productsUrl: '/api/products',
  brandsUrl: '/api/brands',
  genericUrl: '/api/generic',
  compositionsUrl: '/api/compositions',
  categoriesUrl: '/api/category',
  taxClassUrl: '/api/taxClass',
}

export const STRINGS = {
  success: 'Success!',
  editSuccess: 'Edited successfully!',
  Verified: 'Verified successfully!',
  editError: 'Error editing!',
  addError: 'Error adding!',
  addSuccess: 'Added successfully!',
  deleteSuccess: 'Deleted successfully!',
  deleteError: 'Error deleting!',
  loginFailed: 'Login failed!',
  error: 'Error!',
  formsErrors: 'Some forms contain errors! Please re-check before submitting again',
}

export const COUPEN_API_URL = {
  getCoupens: '/api/backend/v1/coupen',
  updateCoupens: '/api/backend/v1/updatecoupen',
}

export const COUPENSECTION_API_URL = {
  getCoupensection: '/api/backend/v1/coupensection',
}
