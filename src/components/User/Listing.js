import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext'
import DataTable from 'react-data-table-component'
import ReactPaginate from 'react-paginate'
import { FiTrash2 } from 'react-icons/fi'
import { toast } from 'react-toastify'
import "./user.css"

const Listing = () => {
  const { userListPage, total, data, deleteUser, authToken, addRegistrationLink } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);


  const [query, setQuery] = useState({
    offset: 0,
    limit: 10,
    search: "",
    order: 'desc',
    sort: 'id',
    status: ""
  })

  useEffect(() => {

    if (authToken) {
      userListPage(query)
    }



  }, []);

  const Alert = () => {
    const handleDeleteConfirmation = () => {
      if (deleteRow) {
        deleteUser(deleteRow.id);
        setShowAlert(false);
        setDeleteRow(null);
      }
    };
    return (
      <div className="alert" key={deleteRow}>
        <p>Are You Sure ?</p>
        <div className="btn-container">
          <button onClick={handleDeleteConfirmation}>Ok</button>
          <button onClick={() => setShowAlert(false)}>No</button>
        </div>
      </div>
    )
  }
  const basicColumns = [
    {
      name: 'Sr.',
      // maxWidth: '100px',
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
    },
    {
      name: 'Action',
      cell: row => {
        return (
          <>
            <span title="Delete" >
              <FiTrash2 size={24} className='me-1 text-danger' style={{ cursor: "pointer" }} onClick={() => {
                setShowAlert(true);
                setDeleteRow(row);
              }} />
            </span>
            {(deleteRow?.id === row?.id) && showAlert && <Alert props={row} />}
          </>
        )
      }
    }
  ]

  const handlePagination = page => {
    const updatedQuery = {
      ...query,
      offset: page.selected * query.limit
    }
    setQuery(updatedQuery)
    if (query) {
      userListPage(updatedQuery)

    }
  }

  const CustomPagination = () => {
    const limit = [1, 10, 25, 50, 100]

    const updateLimit = (e) => {
      const updatedQuery = {
        ...query,
        limit: parseInt(e.target.value)
      }
      setQuery(updatedQuery)
      if (query) {

        userListPage(updatedQuery)

      }
    }
    return (
      <div className="mt-2">
        <div >
          <div className="row text-light">
            <div className="col-sm-2">
              <select className="form-select form-select-sm" onChange={updateLimit} value={query.limit}>
                {limit.map(value => (<option value={value} key={value}>{value}</option>))}
              </select>
            </div>
            <div className="col-sm-2">
              Total: {total}
            </div>
            <div className="col-sm-1">
              <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                forcePage={Math.floor(query.offset / query.limit)}
                onPageChange={page => handlePagination(page)}
                pageCount={Math.ceil(total / query.limit)}
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
          </div>
        </div>

      </div>
    )
  }


  function generateUniqueLink() {
    const token = Math.random().toString(36).substr(2, 10);
    return `http://localhost:3000/signup/${token}`;
  }


  let registrationLink = generateUniqueLink();

  const copyLink = () => {
    navigator.clipboard.writeText(registrationLink)
      .then(() => {
        console.log("registrationLink",registrationLink);
        addRegistrationLink({ Link:registrationLink })
        toast.success('Link copied to clipboard: ')
      })
      .catch(error => {
        toast.success('Failed to copy link: ', error)
      });
  };

  return (
    <>
      <div>
        <div style={{ display: "flex", justifyContent: "center", textAlign: "center" }}>
          <div style={{ position: "relative", top: "4rem", width: "80%", left: "6.5rem", zIndex: "0" }}>
            <div className="d-flex justify-content-between align-center text-light">
              <h4><b>All Users</b></h4>
              <button className="btn btn-success m-2" onClick={copyLink}>Create Link</button>
            </div>
            <div className='react-dataTable' style={{ maxHeight: '400px' }}>
              <DataTable
                noHeader
                pagination
                data={data}
                columns={basicColumns}
                // className='react-dataTable'
                // onSort={handleSort}
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
