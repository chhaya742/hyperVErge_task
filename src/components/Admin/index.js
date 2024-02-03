import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import { Edit } from "react-feather"

const Listing = () => {
  const { adminListPage, adminTotal, adminData } = useAuth()
  
  const [query, setQuery] = useState({
    offset: 0,
    limit: 10,
    search: "",
    order: 'desc',
    sort: 'id',
    status: ""
  })

  useEffect(() => {
    adminListPage(query)
  }, [query]);

  const basicColumns = [
    {
      name: 'Sr.',
      maxWidth: '100px',
      selector: row => row.srNo
    },
    {
      name: 'Name',
      selector: row => row.Name
    },
    {
      name: 'Email',
      selector: row => row.Email
    },
    {
      name: 'Phone',
      selector: row => row.Phone
    },
    {
      name: 'Image',
      selector: row => {
        return (<img src={row.Profile_pic} alt="Profile" width={34} height={34} />)
      }
    }
  ]

  const handlePagination = page => {
    const updatedQuery = {
      ...query,
      offset: page.selected * query.limit
    }
    setQuery(updatedQuery)
    adminListPage(updatedQuery)
  }

  const CustomPagination = () => {
    const limit = [1, 10, 25, 50, 100]

    const updateLimit = (e) => {
      const updatedQuery = {
        ...query,
        limit: parseInt(e.target.value)
      }
      setQuery(updatedQuery)
      adminListPage(updatedQuery)
    }

    return (
      <div className="mt-2">
        <div className="container position-absolute">
          <div className="row">
            <div className="col-sm-1">
              <select className="form-select form-select-sm" onChange={updateLimit} value={query.limit}>
                {limit.map(value => (<option value={value} key={value}>{value}</option>))}
              </select>
            </div>
            <div className="col-sm-1">
              Total: {adminTotal}
            </div>
          </div>
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          forcePage={Math.floor(query.offset / query.limit)}
          onPageChange={page => handlePagination(page)}
          pageCount={Math.ceil(adminTotal / query.limit)}
          breakLabel={'...'}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          activeClassName='active'
          pageClassName='page-item'
          breakClassName='page-item'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          breakLinkClassName='page-link'
          previousLinkClassName='page-link'
          nextClassName='page-item next-item'
          previousClassName='page-item prev-item'
          containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'
        />
      </div>
    )
  }

  const handleSort = (column, sortDirection) => {
    const updatedQuery = {
      ...query,
      order: sortDirection,
      sort: column.column
    }
    setQuery(updatedQuery)
    adminListPage(updatedQuery)
  }

  return (
    <>
      <div>
        {/* <ProfilePage/> */}
        <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
          <div style={{ position: "relative", top: "4rem", width: "79%", left: "8rem", zIndex:"0"}}>
            <div className="d-flex justify-content-between align-center ">
              <h4><b>Admins</b></h4>
            </div>
            <div className='react-dataTable' style={{ overflowX: 'auto', maxHeight: '400px' }}>
              <DataTable
                noHeader
                pagination
                data={adminData}
                columns={basicColumns}
                // className='react-dataTable'
                onSort={handleSort}
                paginationComponent={CustomPagination}
                paginationDefaultPage={query.offset + 1}
                paginationServer
                
              />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Listing
