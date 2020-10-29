/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Button, Radio, InputNumber, Input, TreeSelect, Icon, Select } from 'antd'
import Upload from 'components/Upload'
import Form from 'components/Form'
import { generateCategoryTree } from 'utils'
import { getCategories, getBrands, getCompositions, getMedicineTypes, getOrganics } from 'services'
import PropTypes from 'prop-types'
import { productGeneralSchema } from 'utils/Schema'
import '../../style.scss'

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

class AGeneral extends React.Component {
  state = {
    // categories: [],
    brands: [],
    compositions: [],
    medicineTypes: [],
    organics: [],
    treeData: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const categories = await getCategories()
    const brands = await getBrands()
    const compositions = await getCompositions()
    const medicineTypes = await getMedicineTypes()
    const organics = await getOrganics()
    let treeData = []
    if (categories && categories.length > 0) treeData = generateCategoryTree(categories)
    this.setState({
      // categories: categories || [],
      brands: brands || [],
      compositions: compositions || [],
      medicineTypes: medicineTypes || [],
      organics: organics || [],
      treeData,
    })
  }

  render() {
    const { initialValues, schema, onSubmit, title } = this.props
    console.log('initialValues general', initialValues)
    const { brands, compositions, medicineTypes, organics, treeData } = this.state
    const formItems = [
      { heading: title || '', key: 'title' },
      {
        type: <Input name="name" />,
        key: 'name',
        label: 'Name',
      },
      {
        type: (
          <Radio.Group name="status" defaultValue={initialValues.status} buttonStyle="solid">
            <Radio.Button value="active">Active</Radio.Button>
            <Radio.Button value="hold">Hold</Radio.Button>
          </Radio.Group>
        ),
        key: 'status',
        label: 'Status',
      },
      {
        type: (
          <Radio.Group name="featured" defaultValue={initialValues.featured} buttonStyle="solid">
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        ),
        key: 'featured',
        label: 'Featured',
      },
      {
        type: (
          <Radio.Group
            name="prescriptionNeeded"
            defaultValue={initialValues.prescriptionNeeded}
            buttonStyle="solid"
          >
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        ),
        key: 'prescriptionNeeded',
        label: 'Prescription Needed',
      },
      {
        type: (
          <InputNumber
            // onChange={onChangeMinOrderQty}
            name="minOrderQty"
            min={0}
          />
        ),
        key: 'minOrderQty',
        label: 'Min Order Quantity',
      },
      {
        type: (
          <InputNumber
            // onChange={onChangeMaxOrderQty}
            name="maxOrderQty"
            min={0}
          />
        ),
        key: 'maxOrderQty',
        label: 'Max Order Quantity ',
      },
      {
        type: (
          <Select
            // labelInValue
            name="medicineType"
            defaultValue={initialValues.medicineType}
            showSearch
            style={widthStyle}
            placeholder="Select medicine type"
            optionFilterProp="children"
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {medicineTypes.map(i => (
              <Select.Option key={i._id} value={i._id}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
        ),
        key: 'medicineType',
        label: 'Medicine Type',
      },
      {
        type: <InputNumber name="quantity" min={0} />,
        key: 'quantity',
        label: 'Quantity ',
      },
      {
        type: (
          <Radio.Group name="subtract" defaultValue={initialValues.subtract} buttonStyle="solid">
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <Radio.Button value={true}>Yes</Radio.Button>
            <Radio.Button value={false}>No</Radio.Button>
          </Radio.Group>
        ),
        key: 'subtract',
        label: 'Subtract stock',
      },
      {
        type: (
          <Select
            // labelInValue
            name="outOfStockStatus"
            defaultValue={initialValues.outOfStockStatus}
            showSearch
            style={widthStyle}
            placeholder=""
            optionFilterProp="children"
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {outOfStockOptions.map(i => (
              <Select.Option key={i.value} value={i.value}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
        ),
        key: 'outOfStockStatus',
        label: 'Out of stock status',
      },
      {
        type: (
          <Radio.Group
            name="returnable"
            defaultValue={initialValues.returnable}
            buttonStyle="solid"
          >
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <Radio.Button
              // checked={values.returnable === true}
              value={true}
            >
              Yes
            </Radio.Button>
            <Radio.Button
              // checked={values.returnable === false}
              value={false}
            >
              No
            </Radio.Button>
          </Radio.Group>
        ),
        key: 'returnable',
        label: 'Returnable',
      },
      {
        type: (
          // <span>
          <InputNumber name="returnPeriod" min={0} />
          //   &nbsp;days
          // </span>
        ),
        key: 'returnPeriod',
        label: 'Return Period ',

        dependency: 'returnable',
      },
      {
        type: <InputNumber name="priorityOrder" min={0} />,
        key: 'priorityOrder',
        label: 'Priority ',
      },

      {
        type: <Input name="sku" />,
        key: 'sku',
        label: 'SKU',
      },
      {
        type: (
          <Select
            // disabled={formControls && formControls.type === 'variant'}
            // labelInValue
            name="brand"
            defaultValue={initialValues.brand}
            // value={{ key: values.speciality }}

            // value={values.brand}
            showSearch
            style={widthStyle}
            placeholder="Select brand"
            optionFilterProp="children"
            // onChange={e => setValues(a => ({ ...a, speciality: e.key }))}

            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
            {brands.map(i => (
              <Select.Option key={i._id} value={i._id}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
        ),
        key: 'brand',
        label: 'Brand',
      },
      {
        type: (
          <TreeSelect
            // disabled={formControls && formControls.type === 'variant'}
            // style={{ width: 300 }}

            dropdownStyle={dropdownStyle}
            treeData={treeData}
            allowClear
            multiple
            placeholder="Please select category(s)"
            name="category"

            // treeDefaultExpandAlxl
            // onChange={this.onChange}
          />
        ),
        key: 'category',
        label: 'Category',
      },
      {
        type: (
          <Select
            mode="tags"
            showSearch
            style={widthStyle}
            placeholder="Select compositions"
            optionFilterProp="children"
            name="composition"
            // onChange={e => setValues(a => ({ ...a, brand: e }))}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {/* <Select.Option selected value={data.speciality._id}>{data.speciality.name}</Select.Option> */}
            {compositions.map(i => (
              <Select.Option key={i._id} value={i._id}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
        ),
        key: 'composition',
        label: 'Compositions',
      },
      {
        type: (
          <Select
            mode="tags"
            showSearch
            style={widthStyle}
            placeholder="Select options"
            optionFilterProp="children"
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
            {organics.map(i => (
              <Select.Option key={i._id} value={i._id}>
                {i.name}
              </Select.Option>
            ))}
          </Select>
        ),
        key: 'organic',
        label: 'Organic',
      },

      {
        label: 'Images',

        key: 'image',
        name: 'image',
        type: (
          <Upload name="image" defaultFileList={initialValues.image}>
            {/* <Button onBlur={(e) => onBlur(e, 'image')}> */}
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        ),
      },
    ]

    return <Form formItems={formItems} schema={schema} onSubmit={onSubmit} />
  }
}

AGeneral.propTypes = {
  title: PropTypes.string,
  schema: PropTypes.object,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
}

AGeneral.defaultProps = {
  schema: productGeneralSchema,
  title: null,
  initialValues: {},
  onSubmit: null,
}

export default AGeneral
