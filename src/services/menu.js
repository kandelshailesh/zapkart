import { LINKS } from '_constants'

export async function getLeftMenuData() {
  return [
    // Dashboard
    {
      title: 'Dashboard',
      key: 'dashboardAlpha',
      url: '/dashboard',
      icon: 'icmn icmn-home',
    },
    {
      divider: true,
    },
    // Catalog
    {
      title: 'Catalog',
      key: 'catalog',
      icon: 'icmn icmn-folder-open',
      children: [
        {
          title: 'Category',
          key: 'category',
          url: '/catalog/category',
          pro: false,
        },
        {
          title: 'Banner',
          key: 'Banner',
          url: '/catalog/banners',
          pro: false,
        },
        {
          title: 'Products',
          key: 'products',
          pro: false,
          icon: 'icmn icmn-barcode',
          children: [
            {
              title: 'Products',
              key: 'productss',
              url: '/catalog/products',
              pro: false,
              icon: 'icmn icmn-barcode',
            },
            {
              title: 'Manufacture',
              key: 'manufacture',
              url: '/catalog/manufacture',
            },
            {
              title: 'Size Chart',
              key: 'sizechart',
              url: '/catalog/sizecharts',
            },
            {
              title: 'Salt composition',
              key: 'saltcomposition',
              url: '/catalog/saltcomposition',
            },
            {
              title: 'Salt Synonyms',
              key: 'saltsynonyms',
              url: '/catalog/saltsynonyms',
            },
            {
              title: 'Container Value',
              key: 'containervalue',
              url: '/catalog/containers',
            },
            {
              title: 'Medicine Type',
              key: 'medicinetype',
              url: '/catalog/medicinetype',
            },
            {
              title: 'Custom Offers',
              key: 'customoffers',
              url: '/catalog/customoffers',
            },
            {
              title: 'Customer Disclaimer',
              key: 'customerdisclaimer',
              url: '/catalog/customerdisclaimer',
            },
          ],
        },
        {
          title: 'Attributes',
          key: 'attributes',
          url: '/catalog/attributes',
          pro: false,
        },
        {
          title: 'Brands',
          key: 'brands',
          url: '/catalog/brands',
          pro: false,
        },
        {
          title: 'Coupons',
          key: 'coupons',
          url: '/coupon/list',
          pro: false,
        },

        // {
        //   title: 'Reviews',
        //   key: 'reviews',
        //   url: '/catalog/reviews',
        //   pro: false
        // }
      ],
    },
    {
      divider: true,
    },
    // Users management
    {
      title: 'Users',
      key: 'users',
      icon: 'icmn icmn-user',
      children: [
        {
          title: 'Users List',
          key: 'users-list',
          url: '/users-management/list',
        },
        {
          title: 'User Group',
          key: 'usergroup',
          url: '/userGroup/list',
          pro: false,
        },
      ],
    },
    {
      divider: true,
    },
    // merchant
    {
      title: 'Merchant',
      key: 'merchant',
      icon: 'icmn icmn-folder-open',
      children: [
        {
          title: 'Merchant Type',
          key: 'MerchantType',
          url: '/merchantType/list',
          pro: false,
        },
        {
          title: 'Merchant',
          key: 'merchant',
          url: '/merchant',
          pro: false,
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: 'Shipments',
      key: 'shipments',
      icon: 'icmn icmn-truck',
      children: [
        {
          title: 'Shipment List',
          key: 'shipment-list',
          url: '/shipment/list',
          pro: false,
        },
      ],
    },
    {
      title: 'Orders',
      key: 'orders',
      icon: 'icmn icmn-file-text',
      children: [
        {
          title: 'Orders List',
          key: 'orders-list',
          url: '/order-management/orders',
          pro: false,
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: 'Localisation',
      key: 'localisation',
      icon: 'icmn icmn-location',
      children: [
        {
          title: 'Countries',
          key: 'countery',
          url: '/localisation/countries',
        },
        {
          title: 'States',
          key: 'states',
          url: '/localisation/state',
        },
        {
          title: 'Geozone',
          key: 'geozome',
          url: '/localisation/geozone',
        },
        {
          title: 'Tax Class',
          key: 'tax-class',
          url: '/localisation/tax-classes',
        },
        {
          title: 'Tax Rates',
          key: 'tax-rates',
          url: '/localisation/tax-rates',
        },
        {
          title: 'Zones',
          key: 'zones',
          url: '/localisation/zones',
        },
      ],
    },
    {
      divider: true,
    },
    // other sections
    {
      title: 'Other Section',
      key: 'Other',
      icon: 'icmn icmn-folder-open',
      children: [
        {
          title: 'Banner',
          key: 'Banner',
          url: '/banners',
          pro: false,
        },
        {
          title: 'Blog',
          key: 'Blog',
          url: '/blogs',
          pro: false,
        },
        {
          title: 'Informations',
          key: 'informations',
          url: LINKS.informations,
          pro: false,
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: 'Reviews',
      key: 'reviews',
      icon: 'icmn icmn-star-full',
      children: [
        {
          title: 'Reviews List',
          key: 'reviews-list',
          url: '/catalog/reviews',
          pro: false,
        },
      ],
    },
    {
      divider: true,
    },
    {
      title: 'Widget',
      key: 'widget',
      icon: 'icmn icmn-insert-template',
      url: '/widgets',
    },
    {
      divider: true,
    },
    {
      title: 'Settings',
      key: 'Settings',
      icon: 'icmn icmn-gear',
      children: [
        {
          title: 'Mail Settings',
          key: 'mail-settings',
          icon: 'icmn icmn-envelop',
          url: '/mail-settings',
        },
        {
          title: 'General Settings',
          key: 'seneral-settings',
          icon: 'icmn icmn-book',
          url: '/general-settings',
        },
        {
          title: 'Footer Settings',
          key: 'footer-settings',
          icon: 'icmn icmn-setting',
          url: '/footer-settings',
        },
      ],
    },
    {
      divider: true,
    },

    {
      title: 'Upload data',
      key: 'upload-data',
      icon: 'icmn icmn-upload',
      url: '/upload-data',
    },

    // Order Management
    // {
    //   title: 'Order Management',
    //   key: 'order-management',
    //   icon: 'icmn-newspaper',
    //   children: [
    //     {
    //       title: 'Orders',
    //       key: 'orders',
    //       url: '/order-management/orders',
    //       pro: false
    //     },
    //     {
    //       title: 'Returns',
    //       key: 'returns',
    //       url: '/order-management/returns',
    //       pro: false
    //     },
    //     {
    //       title: 'Shipment',
    //       key: 'shipment',
    //       url: '/order-management/shipments',
    //       pro: false
    //     }
    //   ]
    // },
    // {
    //   divider: true
    // },
    // // Users
    // {
    //   title: 'Users',
    //   key: 'users',
    //   icon: 'icmn icmn-user',
    //   url: '/users-management'
    // },
    // {
    //   divider: true
    // },
    // // Offers
    // {
    //   title: 'Offers',
    //   key: 'offers',
    //   icon: 'icmn icmn-database',
    //   url: '/offers'
    // },
    // {
    //   divider: true
    // },
    // // Vendors
    // {
    //   title: 'Vendors',
    //   key: 'vendors',
    //   icon: 'icmn icmn-database',
    //   children: [
    //     {
    //       title: 'Vendor List',
    //       key: 'vendor-list',
    //       url: '/vendors/vendor-list',
    //       pro: false
    //     },
    //     {
    //       title: 'Payment',
    //       key: 'vendor-payment',
    //       url: '/vendors/vendors-payments',
    //       pro: false
    //     }
    //   ]
    // },
    // {
    //   divider: true
    // },
    // // Settings
    // {
    //   title: 'Email Settings',
    //   key: 'email-settings',
    //   icon: 'icmn icmn-database',
    //   url: 'email-settings'
    // },
    // {
    //   divider: true
    // },
    // // Theme settings
    // {
    //   title: 'ThemeSettings',
    //   key: 'settings',
    //   icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector'
    // }
  ]
}
export async function getTopMenuData() {
  return [
    {
      title: 'Settings',
      key: 'settings',
      icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    },
    {
      title: 'Docs',
      key: 'documentation',
      url: 'https://docs.cleanuitemplate.com/react/getting-started',
      target: '_blank',
      icon: 'icmn icmn-books',
    },
    {
      title: 'Dashboard',
      key: 'dashboardAlpha',
      url: '/dashboard',
      icon: 'icmn icmn-home',
    },
    {
      title: 'AntDesign',
      key: 'antComponents',
      icon: 'icmn icmn-menu',
      url: '/antd',
    },
  ]
}

export async function getLeftMenuDataSeller() {
  return [
    {
      title: 'Seller Dashboard',
      key: 'dashboardSeller',
      url: '/dashboard/seller',
      icon: 'icmn icmn-home',
    },
    {
      title: 'Products',
      key: 'products',
      url: '/catalog/products',
      pro: false,
      icon: 'icmn icmn-barcode',
    },
    {
      title: 'Orders',
      key: 'orders',
      url: '/order-management/orders',
      icon: 'icmn icmn-credit-card',
    },
    {
      title: 'Agreements',
      key: 'agreement',
      url: '/agreements',
      icon: 'icmn icmn-file-text',
    },
    // {
    //   title: 'Settings',
    //   key: 'settings',
    //   icon: 'icmn icmn-cog utils__spin-delayed--pseudo-selector',
    // },
    // {
    //   title: 'Docs',
    //   key: 'documentation',
    //   url: 'https://docs.cleanuitemplate.com/react/getting-started',
    //   target: '_blank',
    //   icon: 'icmn icmn-books'
    // },
    // {
    //   title: 'AntDesign',
    //   key: 'antComponents',
    //   icon: 'icmn icmn-menu',
    //   url: '/antd'
    // },
  ]
}
