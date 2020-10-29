/* eslint-disable no-underscore-dangle */
import React from 'react'
import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'

import AddNew from 'components/CustomComponents/AddNew'
import SortableTable from './SortableTable'

const UsersList = () => {
  return (
    <div>
      <Helmet title="Wiget List" />
      <div className="card">
        <div className="card-header">
          <div className="utils__title">
            <strong>Widget List</strong>
            <AddNew
              add
              // selectedRowKeys={selectedRowKeys}
              // handleDelete={handleDelete}
              attribute="Widget"
              link="/widgets/add-edit/"
            />
          </div>
        </div>
        <div className="card-body">
          <SortableTable />
        </div>
        {/* )} */}
      </div>
    </div>
  )
}

export default UsersList
