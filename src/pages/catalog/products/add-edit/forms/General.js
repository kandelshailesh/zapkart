/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from 'react'
import { Button, Form, Radio, InputNumber, Input, TreeSelect, Icon, Select, Spin } from 'antd'
import Upload from 'components/Upload'
import { unflatten } from 'utils'
import {
  getCategories,
  getBrands,
  getCompositions,
  getMedicineTypes,
  getOrganics,
  getSaltCompositions,
  getSaltSynonms,
  getDisclemer,
  getMedicineType,
  getContainerValue,
  getManufacturer,
  getCustomOffer,
  getSizeChart,
  getAllMerchnats,
} from 'services'
import AddNew from 'components/CustomComponents/AddNew'
import { getProducts } from 'services/products'
import PropTypes from 'prop-types'
// import Select from 'components/SelectWithName'
import { FormContext } from '../tabs'
import '../../style.scss'

const formItemLayout = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 8},
  // },
  // wrapperCol: {
  //   xs: { span: 24 },
  //   sm: { span: 12 },
  // },
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
    lg: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    lg: { span: 12 },
    // lg: { span: 18 },
  },
}

const dropdownStyle = { maxHeight: 400, overflow: 'auto' }

const widthStyle = { width: 300 }

const outOfStockOptions = [
  {
    name: 'In Stock',
    value: 'in-stock',
  },
  {
    name: 'Out of Stock',
    value: 'out-of-stock',
  },
]

// const inlineStyle = { display: 'inline-block', width: 'calc(20% - 5px)' }

const AGeneral = ({ hideSubmit, hasTitle, formControls, isEdit, userType }) => {
  // pass initial data as well
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [compositions, setCompositions] = useState([])
  const [slatCompositions, setslatCompositions] = useState([])
  const [slatSynonms, setslatSynonms] = useState([])
  const [sizeChart, setsizeChart] = useState([])
  const [customoffer, setcustomoffer] = useState([])
  const [manuFacture, setmanuFacture] = useState([])
  const [conatinerValues, setconatinerValues] = useState([])
  const [disclemer, setdisclemer] = useState([])
  const [medicineType, setmedicineType] = useState([])
  const [merchants, setMerchants] = useState([])
  const [medicineTypes, setMedicineTypes] = useState([])
  const [organics, setOrganics] = useState([])
  const [products, setProducts] = useState([])
  const [tagss, setTags] = useState([])
  const [isFetchingProds, setFetchingProds] = useState(false)
  const [vedioLinkCount, setvedioLinkCount] = useState([
    {
      _id: 'vediolink_0',
    },
  ])

  // const [medicineTypes, setMedicineTypes] = useState([])

  const formContext = useContext(FormContext)
  const {
    onChange,
    values,
    setValues,
    onSubmit,
    onBlur,
    errors,
    originalData,
    // setSubmitting,
    isSubmitting,
    // data,
  } = formControls || formContext

  console.log('values', values)

  // const initialValues = data || {
  //   featured: false,
  //   status: 'hold',
  //   priorityOrder: 0,
  //   prescriptionNeeded: false,
  // }

  // fetch categories, brands, compositions on component mount
  useEffect(() => {
    const { vediolink, tags } = values
    const temp = []
    if (vediolink && vediolink.length > 0) {
      vediolink.forEach((i, inde) => {
        temp.push({
          _id: `vediolink_${inde}`,
        })
      })
      setvedioLinkCount(temp)
    }
    if (tags && tags.length > 0) {
      setTags(tags)
    }
    const fetchCategories = async () => {
      const cData = await getCategories()
      if (cData) setCategories(cData)
    }
    const fetchBrands = async () => {
      const bData = await getBrands({ status: 'active' })
      if (bData) setBrands(bData)
    }
    const fetchCompositions = async () => {
      const cData = await getCompositions()
      if (cData) setCompositions(cData)
    }
    const fetchMedicineTypes = async () => {
      const cData = await getMedicineTypes()
      if (cData) setMedicineTypes(cData)
    }
    const fetchOrganics = async () => {
      console.log('fetch organics')
      const cData = await getOrganics()
      if (cData) setOrganics(cData)
    }

    const fetchSaltCompositions = async () => {
      const cData = await getSaltCompositions()
      if (cData) setslatCompositions(cData)
    }

    const fetchSaltSynonms = async () => {
      const cData = await getSaltSynonms()
      if (cData) setslatSynonms(cData)
    }

    const fetchSizeCart = async () => {
      const cData = await getSizeChart()
      if (cData) setsizeChart(cData)
    }
    const fetchCustomOffer = async () => {
      const cData = await getCustomOffer()
      if (cData) setcustomoffer(cData)
    }
    const fetchManufacturer = async () => {
      const cData = await getManufacturer()
      if (cData) setmanuFacture(cData)
    }

    const fetchContainer = async () => {
      const cData = await getContainerValue()
      if (cData) setconatinerValues(cData)
    }
    const fetchDisclemer = async () => {
      const cData = await getDisclemer()
      if (cData) setdisclemer(cData)
    }
    const fetchMedicnetype = async () => {
      const cData = await getMedicineType()
      if (cData) setmedicineType(cData)
    }
    const fetchMerchants = async () => {
      const cData = await getAllMerchnats()
      if (cData) setMerchants(cData)
    }

    // setFileListImages(values.image)
    // const fetchMedicineTypes = async ()
    fetchSaltCompositions()
    fetchSaltSynonms()
    fetchSizeCart()
    fetchCustomOffer()
    fetchManufacturer()
    fetchContainer()
    fetchDisclemer()
    fetchMedicnetype()
    fetchMerchants()
    fetchCategories()
    fetchBrands()
    fetchCompositions()
    fetchMedicineTypes()
    fetchOrganics()
  }, [])

  const generateCategoryTree = (c) => {
    const categoriesAGeneraltted = c.map((item) => {
      return {
        title: item.name,
        value: item._id,
        key: item._id,
        id: item._id,
        // parent: item.parent === null ? 0 : item.parent,
        parent: item.parent || 0,
      }
    })
    const tree = unflatten(categoriesAGeneraltted)
    // return categoriesAGeneraltted
    return tree
  }

  let treeData = []
  if (categories.length > 0) {
    treeData = generateCategoryTree(categories)
    // console.log('treeData', treeData)
  }

  const fetchProducts = async (value) => {
    setFetchingProds(true)
    const data = await getProducts({ search: { name: value }, fields: ['name', '_id'] })
    setFetchingProds(false)
    if (data) setProducts(data)
  }

  // const onChangeSelect = useCallback((val, name) => {
  //   console.log(name, val)
  //   setValues({ [name]: val })
  // })

  const onChangeCategory = (e) => {
    console.log('category', e)
    setValues((a) => ({ ...a, category: e }))
  }

  const onFilelistChange = (value, name) => setValues((a) => ({ ...a, [name]: value }))

  const formItems = [
    { heading: hasTitle ? 'General' : undefined, key: 'title' },
    {
      type: (
        <Radio.Group name="linktoBase" defaultValue={values.linktoBase} buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button checked={values.linktoBase === 'true'} value={true}>
            Yes
          </Radio.Button>
          <Radio.Button checked={values.linktoBase === 'false'} value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'linktoBase',
      label: 'link To Base',
      name: 'linktoBase',
      error: errors.linktoBase,
      edit: false,
    },
    {
      label: 'product',
      error: errors.productId,
      key: 'productId',
      name: 'productId',
      opposite: true,
      type: (
        <Select
          mode="default"
          showSearch
          value={values.productId}
          placeholder="Search products"
          notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchProducts}
          onChange={(a) => setValues((prev) => ({ ...prev, productId: a }))}
          style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {products.map((d) => (
            <Select.Option key={d._id} value={d._id}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Merchant',
      error: errors.merchantId,
      key: 'merchantId',
      name: 'merchantId',
      visible: [1],
      edit: isEdit,
      type: (
        <Select
          name="merchantId"
          value={values.merchantId}
          placeholder="Select Merchant"
          onChange={(a) => setValues((prev) => ({ ...prev, merchantId: a }))}
          // style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {merchants.map((d) => (
            <Select.Option key={d.userId} value={d.userId}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      type: <Input value={values.name} name="name" />,
      key: 'name',
      label: 'Name',
      error: errors.name,
      dependency: 'linktoBase',
    },
    {
      type: <Input value={values.sku} name="sku" />,
      key: 'sku',
      label: 'SKU',
      error: errors.sku,
      opposite: true,
    },
    {
      type: <Input value={values.slug} name="slug" />,
      key: 'slug',
      label: 'slug',
      error: errors.name,
      edit: isEdit,
    },
    {
      type: (
        <Radio.Group name="status" defaultValue={values.status} buttonStyle="solid">
          <Radio.Button checked={values.status === 'active'} value="active">
            Active
          </Radio.Button>
          <Radio.Button checked={values.status === 'hold'} value="hold">
            Hold
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'status',
      label: 'Status',
      error: errors.status,
    },
    {
      type: (
        <Radio.Group name="featured" defaultValue={values.featured} buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button checked={values.featured === true} value={true}>
            Yes
          </Radio.Button>
          <Radio.Button checked={values.featured === false} value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'featured',
      label: 'Featured',
      error: errors.featured,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Radio.Group
          name="prescriptionNeeded"
          defaultValue={values.prescriptionNeeded}
          buttonStyle="solid"
        >
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button checked={values.prescriptionNeeded === true} value={true}>
            Yes
          </Radio.Button>
          <Radio.Button checked={values.prescriptionNeeded === false} value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'prescriptionNeeded',
      label: 'Prescription Needed',
      error: errors.prescriptionNeeded,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Select
          mode="tags"
          value={values.tags}
          style={widthStyle}
          placeholder="Select Tags"
          // optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, tags: e }))}
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {tagss.map((i) => (
            <Select.Option key={i} value={i}>
              {i}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'tags',
      label: 'Tags',
      error: errors.tags,
    },
    {
      type: (
        <Select
          mode="tags"
          value={values.saltComposition}
          showSearch
          style={widthStyle}
          placeholder="Select Salt compositions"
          // optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, saltComposition: e }))}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {slatCompositions.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'saltComposition',
      label: 'Salt Composition',
      error: errors.saltComposition,
      dependency: 'prescriptionNeeded',
    },
    {
      type: (
        <Select
          mode="tags"
          value={values.saltSynonyms}
          showSearch
          style={widthStyle}
          placeholder="Select Salt Synonams"
          optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, saltSynonyms: e }))}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {slatSynonms.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'saltSynonyms',
      label: 'Salt Synonyms',
      error: errors.saltSynonyms,
      dependency: 'prescriptionNeeded',
    },
    {
      type: (
        <InputNumber
          onChange={(e) => setValues((a) => ({ ...a, minOrderQty: e }))}
          name="minOrderQty"
          value={values.minOrderQty}
          min={0}
        />
      ),
      key: 'minOrderQty',
      label: 'Min Order Quantity',
      error: errors.minOrderQty,
      dependency: 'linktoBase',
    },
    {
      type: (
        <InputNumber
          onChange={(e) => setValues((a) => ({ ...a, maxOrderQty: e }))}
          name="maxOrderQty"
          value={values.maxOrderQty}
          min={0}
        />
      ),
      key: 'maxOrderQty',
      label: 'Max Order Quantity ',
      error: errors.maxOrderQty,
      dependency: 'linktoBase',
    },
    // {
    //   type: (
    //     <Select
    //       // labelInValue
    //       name="medicineType"
    //       defaultValue={values.medicineType}
    //       showSearch
    //       style={widthStyle}
    //       placeholder="Select medicine type"
    //       optionFilterProp="children"
    //       onChange={(value) => setValues((prev) => ({ ...prev, medicineType: value }))}
    //       // onFocus={onFocus}
    //       // onBlur={onBlur}
    //       // onSearch={onSearch}
    //       filterOption={(input, option) =>
    //         option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    //       }
    //     >
    //       {medicineTypes.map((i) => (
    //         <Select.Option key={i._id} value={i._id}>
    //           {i.name}
    //         </Select.Option>
    //       ))}
    //     </Select>
    //   ),
    //   key: 'medicineType',
    //   label: 'Medicine Type',
    //   error: errors.medicineType,
    // },
    {
      type: (
        <Select
          mode="default"
          value={values.sizeChart}
          showSearch
          style={widthStyle}
          placeholder="Select Size Chart"
          optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, sizeChart: e }))}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {sizeChart.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'sizeChart',
      label: 'Size Chart',
      error: errors.sizeChart,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Select
          mode="default"
          value={values.medicinetype}
          showSearch
          style={widthStyle}
          placeholder="Select Medicine Type"
          optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, medicinetype: e }))}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {medicineType.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'medicinetype',
      label: 'Medicine Type',
      error: errors.medicinetype,
      dependency: 'linktoBase',
    },
    {
      type: <Input value={values.midleText} name="midleText" />,
      key: 'midleText',
      label: 'Middle Text',
      error: errors.midleText,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Select
          mode="default"
          value={values.containervalue}
          showSearch
          style={widthStyle}
          placeholder="Select Conatiner Value"
          optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, containervalue: e }))}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {conatinerValues.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'ontainervalue',
      label: 'Container Value',
      error: errors.containervalue,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Select
          mode="tags"
          value={values.customeOffer}
          showSearch
          style={widthStyle}
          placeholder="Select Offer"
          optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, customeOffer: e }))}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {customoffer.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'customeOffer',
      label: 'Custom Offer',
      error: errors.customeOffer,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Radio.Group defaultValue={values.offerOverride} buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button checked={values.offerOverride === true} value={true}>
            Yes
          </Radio.Button>
          <Radio.Button checked={values.offerOverride === false} value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'offerOverride',
      label: 'Offer Override',
      error: errors.offerOverride,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Select
          mode="tags"
          value={values.disclaimer}
          showSearch
          style={widthStyle}
          placeholder="Select Disclemer"
          optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, disclaimer: e }))}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {disclemer.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'disclaimer',
      label: 'Disclaimer',
      error: errors.disclaimer,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Radio.Group defaultValue={values.disclaimerOverride} buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button checked={values.disclaimerOverride === true} value={true}>
            Yes
          </Radio.Button>
          <Radio.Button checked={values.disclaimerOverride === false} value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'disclaimerOverride',
      label: 'Disclaimer Override',
      error: errors.disclaimerOverride,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Select
          mode="default"
          value={values.manufacture}
          showSearch
          style={widthStyle}
          placeholder="Select ManuFacture"
          optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, manufacture: e }))}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {manuFacture.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'manufacture',
      label: 'Manufacture',
      error: errors.manufacture,
      dependency: 'linktoBase',
    },
    {
      type: <Input value={values.storageDiscription} name="storageDiscription" />,
      key: 'storageDiscription',
      label: 'Storage Discription',
      error: errors.storageDiscription,
      dependency: 'linktoBase',
    },
    {
      type: (
        <InputNumber
          name="quantity"
          value={values.quantity}
          onChange={(val) => setValues((a) => ({ ...a, quantity: val }))}
          min={0}
        />
      ),
      key: 'quantity',
      label: 'Quantity ',
      error: errors.quantity,
    },
    {
      type: (
        <Radio.Group name="subtract" defaultValue={values.subtract} buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button checked={values.subtract === true} value={true}>
            Yes
          </Radio.Button>
          <Radio.Button checked={values.subtract === false} value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'subtract',
      label: 'Subtract stock',
      error: errors.subtract,
    },
    {
      type: (
        <Select
          // labelInValue
          name="outOfStockStatus"
          defaultValue={values.outOfStockStatus}
          showSearch
          style={widthStyle}
          placeholder=""
          optionFilterProp="children"
          onChange={(value) => setValues((prev) => ({ ...prev, outOfStockStatus: value }))}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {outOfStockOptions.map((i) => (
            <Select.Option key={i.value} value={i.value}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'outOfStockStatus',
      label: 'Out of stock status',
      error: errors.outOfStockStatus,
    },
    {
      type: (
        <Radio.Group name="returnable" defaultValue={values.returnable} buttonStyle="solid">
          {/* eslint-disable-next-line react/jsx-boolean-value */}
          <Radio.Button checked={values.returnable === true} value={true}>
            Yes
          </Radio.Button>
          <Radio.Button checked={values.returnable === false} value={false}>
            No
          </Radio.Button>
        </Radio.Group>
      ),
      key: 'returnable',
      label: 'Returnable',
      error: errors.returnable,
      dependency: 'linktoBase',
    },
    {
      type: (
        <span>
          <InputNumber
            name="returnPeriod"
            value={values.returnPeriod}
            onChange={(val) => setValues((prev) => ({ ...prev, returnPeriod: val }))}
            min={0}
          />
          &nbsp;days
        </span>
      ),
      key: 'returnPeriod',
      label: 'Return Period ',
      error: errors.returnPeriod,
      dependency: 'returnable',
    },
    {
      type: (
        <InputNumber
          name="priorityOrder"
          value={values.priorityOrder}
          onChange={(val) => setValues((prev) => ({ ...prev, priorityOrder: val }))}
          min={0}
        />
      ),
      key: 'priorityOrder',
      label: 'Priority ',
      error: errors.priorityOrder,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Select
          disabled={formControls && formControls.type === 'variant'}
          // labelInValue
          name="brand"
          defaultValue={values.brand}
          // value={{ key: values.speciality }}

          // value={values.brand}
          showSearch
          style={widthStyle}
          placeholder="Select brand"
          optionFilterProp="children"
          // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}
          onChange={(e) => setValues((a) => ({ ...a, brand: e }))}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {brands.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'brand',
      label: 'Brand',
      error: errors.brand,
      dependency: 'linktoBase',
    },
    {
      type: (
        <TreeSelect
          disabled={formControls && formControls.type === 'variant'}
          // style={{ width: 300 }}
          value={values.category}
          dropdownStyle={dropdownStyle}
          treeData={treeData}
          allowClear
          multiple
          placeholder="Please select category(s)"
          name="category"
          onChange={onChangeCategory}
          // treeDefaultExpandAlxl
          // onChange={this.onChange}
        />
      ),
      key: 'category',
      label: 'Category',
      error: errors.category,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Select
          mode="tags"
          value={values.composition}
          showSearch
          style={widthStyle}
          placeholder="Select compositions"
          optionFilterProp="children"
          name="composition"
          onChange={(e) => setValues((a) => ({ ...a, composition: e }))}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {compositions.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'composition',
      label: 'Compositions',
      error: errors.composition,
      dependency: 'linktoBase',
    },
    {
      type: (
        <Select
          mode="tags"
          value={values.organic}
          showSearch
          style={widthStyle}
          placeholder="Select options"
          optionFilterProp="children"
          onChange={(e) => setValues((a) => ({ ...a, organic: e }))}
          name="organic"
          // onChange={e => setValues(a => ({ ...a, brand: e }))}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
          {organics.map((i) => (
            <Select.Option key={i._id} value={i._id}>
              {i.name}
            </Select.Option>
          ))}
        </Select>
      ),
      key: 'organic',
      label: 'Organic',
      error: errors.organic,
      dependency: 'linktoBase',
    },
    {
      label: 'Images',
      error: errors.image,
      key: 'image',
      name: 'image',
      dependency: 'linktoBase',
      type: (
        <>
          <Upload name="image" defaultFileList={values.image} onChange={onFilelistChange}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </>
      ),
    },
    {
      label: 'Video Link',
      error: errors.vediolink,
      key: 'Vediolink',
      type: (
        <>
          {vedioLinkCount?.map((i) => (
            <div>
              <Input value={values[i._id]} name={i._id} />
              <AddNew
                onRemove={() => {
                  const temp = i._id
                  setvedioLinkCount((a) => a.filter((j) => j._id !== temp))
                  setValues((prev) => {
                    const rest = prev
                    delete rest[temp]
                    return { ...rest }
                  })
                }}
              />
            </div>
          ))}
          <AddNew
            add
            onClick={() =>
              setvedioLinkCount((a) => [
                ...a,
                { _id: `vediolink_${Number(a.reverse()[0]?._id.split('vediolink_')[1]) + 1}` },
              ])
            }
          />
        </>
      ),
      dependency: 'linktoBase',
    },
    {
      label: 'Related products',
      error: errors.relatedProducts,
      key: 'relatedProducts',
      name: 'relatedProducts',
      dependency: 'linktoBase',
      type: (
        <Select
          mode="multiple"
          labelInValue
          value={values.relatedProducts}
          placeholder="Search products"
          notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchProducts}
          onChange={(a) => setValues((prev) => ({ ...prev, relatedProducts: a }))}
          style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {products.map((d) => (
            <Select.Option key={d._id} value={d._id}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: 'Frequently bought',
      error: errors.frequentlyBought,
      key: 'frequentlyBought',
      name: 'frequentlyBought',
      type: (
        <Select
          mode="multiple"
          labelInValue
          value={values.frequentlyBought}
          placeholder="Search products"
          notFoundContent={isFetchingProds ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={fetchProducts}
          onChange={(a) => setValues((prev) => ({ ...prev, frequentlyBought: a }))}
          style={{ width: '100%' }}
          // onPopupScroll={this.handlePopupScroll}
        >
          {products.map((d) => (
            <Select.Option key={d._id} value={d._id}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      ),
      dependency: 'linktoBase',
    },
  ]

  return (
    <Form
      onChange={onChange}
      onBlur={onBlur}
      onSubmit={onSubmit}
      labelAlign="right"
      {...formItemLayout}
    >
      {formItems.map((item) => {
        if (item.heading)
          return (
            <h4 key={item.heading} className="text-black mb-3">
              <strong>{item.heading}</strong>
            </h4>
          )
        if (item.opposite === true) {
          if (values.linktoBase === true || values.linktoBase === 'true') {
            return (
              <Form.Item
                key={item.key}
                label={item.label}
                validateStatus={item.error && 'error'}
                help={item.error}
              >
                {item.type}
              </Form.Item>
            )
          }
          return null
        }
        if (item.key === 'slug') {
          if (isEdit === true) {
            return (
              <Form.Item
                key={item.key}
                label={item.label}
                validateStatus={item.error && 'error'}
                help={item.error}
              >
                {item.type}
              </Form.Item>
            )
          }
          return null
        }

        if (item.key === 'linktoBase') {
          if (isEdit !== true) {
            return (
              <Form.Item
                key={item.key}
                label={item.label}
                validateStatus={item.error && 'error'}
                help={item.error}
              >
                {item.type}
              </Form.Item>
            )
          }
          return null
        }

        if (item.dependency && item.dependency === 'linktoBase') {
          if (
            (values[item.dependency] &&
              (values[item.dependency] === 'false' || values[item.dependency] === false)) ||
            !values.linktoBase
          ) {
            return (
              <Form.Item
                key={item.key}
                label={item.label}
                validateStatus={item.error && 'error'}
                help={item.error}
              >
                {item.type}
              </Form.Item>
            )
          }
          return null
        }
        if (item.dependency && item.dependency !== 'linktoBase') {
          if (values[item.dependency] === 'true' || values[item.dependency] === true) {
            return (
              <Form.Item
                key={item.key}
                label={item.label}
                validateStatus={item.error && 'error'}
                help={item.error}
              >
                {item.type}
              </Form.Item>
            )
          }
          return null
        }
        if (item.visible) {
          if (item.visible.includes(userType)) {
            return (
              <Form.Item
                key={item.key}
                label={item.label}
                validateStatus={item.error && 'error'}
                help={item.error}
              >
                {item.type}
              </Form.Item>
            )
          }
          return null
        }

        console.log('useetype', userType, isEdit)

        return (
          <Form.Item
            key={item.key}
            label={item.label}
            validateStatus={item.error && 'error'}
            help={item.error}
          >
            {item.type}
          </Form.Item>
        )
      })}
      {!hideSubmit && (
        <Form.Item>
          <Button disabled={isSubmitting} type="primary" htmlType="submit">
            Continue
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}

AGeneral.propTypes = {
  hideSubmit: PropTypes.bool,
  hasTitle: PropTypes.bool,
  formControls: PropTypes.object,
}

AGeneral.defaultProps = {
  hideSubmit: false,
  hasTitle: true,
  formControls: null,
}

export default AGeneral
