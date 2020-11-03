import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
// import Loadable from 'react-loadable'

import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'
import { PATH_CUSTOM_ATTRIBUTES, LINKS, ROLES } from '_constants'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

const loadable = (loader) => React.lazy(loader) // added
// Loadable({
//   loader,
//   // delay: false,
//   loading: () => <Loader />,
//   delay: 200
// })

const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/user/login')),
    exact: true,
  },
  // deliverLocation
  {
    path: '/deliverLocation',
    component: loadable(() => import('pages/deliverLocation/list')),
    exact: true
  },
  {
    path: '/deliverLocation/add-edit',
    component: loadable(() => import('pages/deliverLocation/add-edit')),
    exact: true,
  },
  {
    path: '/deliverLocation/:id',
    component: loadable(() => import('pages/deliverLocation/add-edit')),
    exact: true,
  },
 
  // Catalog
  // Catalog/Category
  {
    path: '/catalog/category',
    component: loadable(() => import('pages/catalog/category/list')),
    exact: true,
  },
  {
    path: `${LINKS.category}/edit/:id`,
    // component: loadable(() => import('pages/catalog/category/category-edit')),
    component: loadable(() => import('pages/catalog/category/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/category/add-category',
    // component: loadable(() => import('pages/catalog/category/category-add')),
    component: loadable(() => import('pages/catalog/category/add-edit')),
    exact: true,
  },
  // Catalog/Products
  {
    path: '/catalog/products',
    component: loadable(() => import('pages/catalog/products/list')),
    exact: true,
  },
  // product pricing table
  {
    path: '/catalog/products/:id/pricingTable',
    component: loadable(() => import('pages/merchantPricingTable')),
    exact: true,
  },
  {
    path: `${LINKS.editProduct}/:id`,
    component: loadable(() => import('pages/catalog/products/add-edit')),
    exact: true,
  },
  {
    path: `${LINKS.addProduct}`,
    component: loadable(() => import('pages/catalog/products/add-edit')),
    exact: true,
  },
  // Catalog/Informations
  {
    path: LINKS.informations,
    component: loadable(() => import('pages/informations/list')),
    exact: true,
  },
  {
    path: LINKS.addInformations,
    component: loadable(() => import('pages/informations/add-edit')),
    exact: true,
  },
  {
    path: `${LINKS.informations}/edit/:id`,
    component: loadable(() => import('pages/informations/add-edit')),
    exact: true,
  },
  {
    path: LINKS.blogs,
    component: loadable(() => import('pages/blogs/list')),
    exact: true,
  },
  {
    path: LINKS.addBlogs,
    component: loadable(() => import('pages/blogs/add-edit-blog')),
    exact: true,
  },
  {
    path: `${LINKS.blogs}/edit/:id`,
    component: loadable(() => import('pages/blogs/add-edit-blog')),
    exact: true,
  },
  {
    path: LINKS.banners,
    component: loadable(() => import('pages/banners/list')),
    exact: true,
  },
  {
    path: LINKS.addBanners,
    component: loadable(() => import('pages/banners/add-edit-banner')),
    exact: true,
  },
  {
    path: `${LINKS.banners}/edit/:id`,
    component: loadable(() => import('pages/banners/add-edit-banner')),
    exact: true,
  },
  // {
  //   path: `${LINKS.editProduct}/:id`,
  //   component: loadable(() => import('pages/catalog/products/products-edit')),
  //   exact: true
  // },
  // Catalog/Attributes
  {
    path: '/catalog/attributes/',
    component: loadable(() => import('pages/catalog/attributes')),
    exact: true,
  },
  {
    path: `${LINKS.editAttribute}/:id`,
    component: loadable(() => import('pages/catalog/attributes/attributes-edit')),
    exact: true,
  },
  {
    path: LINKS.addAttribute,
    component: loadable(() => import('pages/catalog/attributes/attributes-add')),
    exact: true,
  },
  // /catalog/customattributes
  {
    path: PATH_CUSTOM_ATTRIBUTES.list,
    component: loadable(() => import('pages/catalog/customAttributes')),
    exact: true,
  },
  {
    path: `${PATH_CUSTOM_ATTRIBUTES.edit}/:id`,
    component: loadable(() => import('pages/catalog/customAttributes/add-edit')),
    exact: true,
  },
  {
    path: PATH_CUSTOM_ATTRIBUTES.add,
    component: loadable(() => import('pages/catalog/customAttributes/add-edit')),
    exact: true,
  },
  // Catalog/Brand
  {
    path: '/catalog/brands',
    component: loadable(() => import('pages/catalog/brands/list')),
    exact: true,
  },
  {
    path: '/catalog/brands/brand/:id',
    component: loadable(() => import('pages/catalog/brands/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/brands/add-brand',
    component: loadable(() => import('pages/catalog/brands/add-edit')),
    exact: true,
  },

  // catalog manufacture
  {
    path: '/catalog/manufacture',
    component: loadable(() => import('pages/catalog/manufacture/list')),
    exact: true,
  },
  {
    path: '/catalog/manufacture/manufacture/:id',
    component: loadable(() => import('pages/catalog/manufacture/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/manufacture/add-manufacture',
    component: loadable(() => import('pages/catalog/manufacture/add-edit')),
    exact: true,
  },

  // catalog sizechart
  {
    path: '/catalog/sizecharts',
    component: loadable(() => import('pages/catalog/sizechart/list')),
    exact: true,
  },
  {
    path: '/catalog/sizecharts/sizechart/:id',
    component: loadable(() => import('pages/catalog/sizechart/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/sizecharts/add',
    component: loadable(() => import('pages/catalog/sizechart/add-edit')),
    exact: true,
  },

  // catalog Salt composition

  {
    path: '/catalog/saltcomposition',
    component: loadable(() => import('pages/catalog/saltcomposition/list')),
    exact: true,
  },
  {
    path: '/catalog/saltcomposition/composition/:id',
    component: loadable(() => import('pages/catalog/saltcomposition/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/saltcomposition/create',
    component: loadable(() => import('pages/catalog/saltcomposition/add-edit')),
    exact: true,
  },
  // catalog salt synonyms
  {
    path: '/catalog/saltsynonyms',
    component: loadable(() => import('pages/catalog/saltSynonyms/list')),
    exact: true,
  },
  {
    path: '/catalog/saltsynonyms/synonyms/:id',
    component: loadable(() => import('pages/catalog/saltSynonyms/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/saltsynonyms/create',
    component: loadable(() => import('pages/catalog/saltSynonyms/add-edit')),
    exact: true,
  },
  // catalog containers
  {
    path: '/catalog/containers',
    component: loadable(() => import('pages/catalog/containerValue/list')),
    exact: true,
  },
  {
    path: '/catalog/containers/container/:id',
    component: loadable(() => import('pages/catalog/containerValue/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/containers/create',
    component: loadable(() => import('pages/catalog/containerValue/add-edit')),
    exact: true,
  },
  // catalog medicine type
  {
    path: '/catalog/medicineType',
    component: loadable(() => import('pages/catalog/medicineType/list')),
    exact: true,
  },
  {
    path: '/catalog/medicineType/type/:id',
    component: loadable(() => import('pages/catalog/medicineType/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/medicineType/create',
    component: loadable(() => import('pages/catalog/medicineType/add-edit')),
    exact: true,
  },
  // catalog custom offers
  {
    path: '/catalog/customOffers',
    component: loadable(() => import('pages/catalog/customOffers/list')),
    exact: true,
  },
  {
    path: '/catalog/customOffers/offer/:id',
    component: loadable(() => import('pages/catalog/customOffers/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/customOffers/create',
    component: loadable(() => import('pages/catalog/customOffers/add-edit')),
    exact: true,
  },
  // catalog customer disclaimer
  {
    path: '/catalog/customerDisclaimer',
    component: loadable(() => import('pages/catalog/customerDisclaimer/list')),
    exact: true,
  },
  {
    path: '/catalog/customerDisclaimer/disclaimer/:id',
    component: loadable(() => import('pages/catalog/customerDisclaimer/add-edit')),
    exact: true,
  },
  {
    path: '/catalog/customerDisclaimer/create',
    component: loadable(() => import('pages/catalog/customerDisclaimer/add-edit')),
    exact: true,
  },

  // Catalog/Reviews
  {
    path: '/catalog/reviews',
    component: loadable(() => import('pages/reviews')),
    exact: true,
  },
  {
    path: '/catalog/reviews/:id',
    component: loadable(() => import('pages/reviews/edit-review')),
    exact: true,
  },
  // Orders
  {
    path: '/order-management/orders',
    component: loadable(() => import('pages/orders-new')),
    exact: true,
  },
  {
    path: '/order-management/orders/add-new',
    component: loadable(() => import('pages/orders-new/create-new')),
    exact: true,
  },
  {
    path: '/order-management/orders/order/:orderId',
    component: loadable(() => import('pages/orders-new/view-edit-order')),
    exact: true,
  },
  // {
  //   path: '/order-management/orders/edit-order/:id',
  //   component: loadable(() => import('pages/orders/edit-order')),
  //   exact: true,
  // },
  // {
  //   path: '/order-management/returns',
  //   component: loadable(() => import('pages/returns')),
  //   exact: true,
  // },
  // {
  //   path: '/order-management/returns/return/:id',
  //   component: loadable(() => import('pages/returns/view-return')),
  //   exact: true,
  // },
  // {
  //   path: '/order-management/shipments',
  //   component: loadable(() => import('pages/shipments')),
  //   exact: true,
  // },
  {
    path: '/shipment/list',
    component: loadable(() => import('pages/shipments/list')),
    exact: true,
  },
  {
    path: '/shipment/list/:masterOrderId',
    component: loadable(() => import('pages/shipments/list')),
    exact: true,
  },
  {
    path: '/shipment/view/:shipmentId',
    component: loadable(() => import('pages/shipments/view')),
    exact: true,
  },
  {
    path: '/shipment/create/:orderId',
    component: loadable(() => import('pages/shipments/create')),
    exact: true,
  },
  {
    path: '/shipment/edit/:shipmentId',
    component: loadable(() => import('pages/shipments/edit')),
    exact: true,
  },
  // Users management
  {
    path: '/users-management/list',
    component: loadable(() => import('pages/users-management-new/list')),
    exact: true,
  },
  {
    path: '/users-management/list/:userId',
    component: loadable(() => import('pages/users-management-new/details')),
    exact: true,
  },
  // Users management
  // {
  //   path: '/users-management',
  //   component: loadable(() => import('pages/users-management')),
  //   exact: true,
  // },
  // {
  //   path: '/users-management/view-user/:id',
  //   component: loadable(() => import('pages/users-management/view-user')),
  //   exact: true,
  // },
  // {
  //   path: '/users-management/edit-user/:id',
  //   component: loadable(() => import('pages/users-management/edit-user')),
  //   exact: true,
  // },
  // {
  //   path: '/user/forgot',
  //   component: loadable(() => import('pages/user/forgot')),
  //   exact: true,
  // },
  // Vendors
  {
    path: LINKS.offersList,
    component: loadable(() => import('pages/offers')),
    exact: true,
  },
  {
    path: LINKS.addOffer,
    component: loadable(() => import('pages/offers/add-offer')),
    exact: true,
  },
  {
    path: `${LINKS.offersList}/:id`,
    component: loadable(() => import('pages/offers/edit-offer')),
    exact: true,
  },
  {
    path: '/vendors/vendor-list',
    component: loadable(() => import('pages/vendors-management')),
    exact: true,
  },
  {
    path: '/vendors/vendor/:id',
    component: loadable(() => import('pages/vendors-management/view-vendor')),
    exact: true,
  },
  {
    path: '/vendors/vendors-payments',
    component: loadable(() => import('pages/vendors-management/vendor-payments-list')),
    exact: true,
  },

  // Dashboards
  {
    path: '/dashboard',
    component: loadable(() => import('pages/dashboard/alpha')),
  },
  {
    path: '/dashboard/seller',
    component: loadable(() => import('pages/dashboard/seller')),
  },
  // enduser Type
  {
    path: '/userGroup/list',
    component: loadable(() => import('pages/userGroup/list')),
    exact: true,
  },
  {
    path: '/userGroup/create',
    component: loadable(() => import('pages/userGroup/forms')),
    exact: true,
  },
  {
    path: '/userGroup/edit/:id',
    component: loadable(() => import('pages/userGroup/forms')),
    exact: true,
  },

  // Merchant Type
  {
    path: '/merchantType/list',
    component: loadable(() => import('pages/merchantType/list')),
    exact: true,
  },
  {
    path: '/merchantType/create',
    component: loadable(() => import('pages/merchantType/forms')),
    exact: true,
  },
  {
    path: '/merchantType/edit/:id',
    component: loadable(() => import('pages/merchantType/forms')),
    exact: true,
  },
  {
    path: '/merchant',
    component: loadable(() => import('pages/merchant/list')),
    exact: true,
  },
  {
    path: '/merchant/create',
    component: loadable(() => import('pages/merchant/indexform')),
    exact: true,
  },
  {
    path: '/merchant/edit/:id',
    component: loadable(() => import('pages/merchant/indexform')),
    exact: true,
  },
  // coupen
  {
    path: '/coupon/list',
    component: loadable(() => import('pages/coupen/list')),
    exact: true,
  },
  {
    path: LINKS.addCoupens,
    component: loadable(() => import('pages/coupen/add-edit-coupen')),
    exact: true,
  },
  {
    path: '/coupon/edit/:id',
    component: loadable(() => import('pages/coupen/add-edit-coupen')),
    exact: true,
  },
  // Edit profile
  {
    path: '/edit-profile',
    component: loadable(() => import('pages/edit-profile')),
    exact: true,
    // authorize: {
    //   role: ['admin'],
    // },
  },
  {
    path: '/mail-settings',
    component: loadable(() => import('pages/mail-settings')),
    exact: true,
  },
  {
    path: '/general-settings',
    component: loadable(() => import('pages/general-settings')),
    exact: true,
  },
  {
    path: '/footer-settings',
    component: loadable(() => import('pages/footer-settings')),
    exact: true,
  },
  {
    path: '/upload-data',
    component: loadable(() => import('pages/upload-data')),
    exact: true,
  },
  // {
  //   path: '/localisation/countries',
  //   component: loadable(() => import('pages/localisation/countries')),
  //   exact: true,
  // },
  // {
  //   path: '/localisation/countries/add',
  //   component: loadable(() => import('pages/localisation/countries/add-edit')),
  //   exact: true,
  // },
  // {
  //   path: '/localisation/countries/edit/:id',
  //   component: loadable(() => import('pages/localisation/countries/add-edit')),
  //   exact: true,
  // },
  // {
  //   path: '/localisation/state',
  //   component: loadable(() => import('pages/localisation/states')),
  //   exact: true,
  // },
  // {
  //   path: '/localisation/state/add',
  //   component: loadable(() => import('pages/localisation/states/add-edit')),
  //   exact: true,
  // },
  // {
  //   path: '/localisation/state/edit/:id',
  //   component: loadable(() => import('pages/localisation/states/add-edit')),
  //   exact: true,
  // },
  {
    path: '/localisation/geozone',
    component: loadable(() => import('pages/localisation/geoZone')),
    exact: true,
  },
  {
    path: '/localisation/geozone/add',
    component: loadable(() => import('pages/localisation/geoZone/add-edit')),
    exact: true,
  },
  {
    path: '/localisation/geozone/edit/:id',
    component: loadable(() => import('pages/localisation/geoZone/add-edit')),
    exact: true,
  },
  {
    path: '/localisation/zones',
    component: loadable(() => import('pages/localisation/zones')),
    exact: true,
  },
  {
    path: '/localisation/zones/add',
    component: loadable(() => import('pages/localisation/zones/add-edit')),
    exact: true,
  },
  {
    path: '/localisation/zones/edit/:id',
    component: loadable(() => import('pages/localisation/zones/add-edit')),
    exact: true,
  },
  {
    path: '/localisation/tax-rates',
    component: loadable(() => import('pages/localisation/tax-rates')),
    exact: true,
  },
  {
    path: '/localisation/tax-rates/add',
    component: loadable(() => import('pages/localisation/tax-rates/add-edit')),
    exact: true,
  },
  {
    path: '/localisation/tax-rates/edit/:id',
    component: loadable(() => import('pages/localisation/tax-rates/add-edit')),
    exact: true,
  },
  {
    path: '/localisation/tax-classes',
    component: loadable(() => import('pages/localisation/tax-classes')),
    exact: true,
  },
  {
    path: '/localisation/tax-classes/add',
    component: loadable(() => import('pages/localisation/tax-classes/add-edit')),
    exact: true,
  },
  {
    path: '/localisation/tax-classes/edit/:id',
    component: loadable(() => import('pages/localisation/tax-classes/add-edit')),
    exact: true,
  },
  {
    path: LINKS.catalogbanners,
    component: loadable(() => import('pages/catalog/banners/list')),
    exact: true,
  },
  {
    path: `${LINKS.catalogbanners}/create`,
    component: loadable(() => import('pages/catalog/banners/add-edit-banner')),
    exact: true,
  },
  {
    path: `${LINKS.catalogbanners}/edit/:id`,
    component: loadable(() => import('pages/catalog/banners/add-edit-banner')),
    exact: true,
  },
  {
    path: '/widgets',
    component: loadable(() => import('pages/widgets')),
    exact: true,
  },
  {
    path: '/widgets/add-edit',
    component: loadable(() => import('pages/widgets/add-edit')),
    exact: true,
  },
  {
    path: '/widgets/add-edit/:id',
    component: loadable(() => import('pages/widgets/add-edit')),
    exact: true,
  },

  // merchant routes

  {
    path: '/agreements',
    component: loadable(() => import('pages/agreements')),
    exact: true,
  },
  // AntDesign
  {
    path: '/antd',
    component: loadable(() => import('pages/antd')),
    exact: true,
  },
]

@connect(({ user }) => ({ user }))
class Router extends React.Component {
  render() {
    const { history, user } = this.props
    console.log('9999', user)
    return (
      <Suspense fallback={<Loader />}>
        <ConnectedRouter history={history}>
          <IndexLayout>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  // return <Redirect to="/dash" />
                  console.log('fffffffffffff', user.role)
                  switch (user.role) {
                    case ROLES.admin:
                      console.log('444')
                      return <Redirect to="/dashboard" />
                    case ROLES.merchant:
                      console.log('888')
                      return <Redirect to="/dashboard/seller" />
                    default:
                      return <Redirect to="/user/login" />
                  }
                }}
              />
              <Suspense fallback={<Loader />}>
                {routes.map((route) => {
                  console.log('ffffttttttttt', route.authorize)
                  if (route.authorize) return <PrivateRoute key={route.path} {...route} />
                  return (
                    <Route
                      path={route.path}
                      component={route.component}
                      key={route.path}
                      exact={route.exact}
                    />
                  )
                })}
              </Suspense>
              <Route component={NotFoundPage} />
            </Switch>
          </IndexLayout>
        </ConnectedRouter>
      </Suspense>
    )
  }
}

export default Router
