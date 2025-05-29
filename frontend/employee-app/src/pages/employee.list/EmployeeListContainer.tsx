import './EmployeeListContainer.css'
import deleteIcon from '../../assets/delete.png'
import editIcon from '../../assets/pencil.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Modal } from '../../components'
import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { FormHeaderButton } from '../../components/Button/FormHeaderButton'
import { StatusSpan } from '../../components/StatusSpan/StatusSpan'

const employees = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        employeeId: "1x2y3z4a5b6c",
        role: "Developer",
        joiningDate: "01/15/2015",
        status: "Active",
        experience: 5,
        department: 3,
        address: {
            houseNo: "456",
            line1: "Main Street",
            line2: "City Center",
            pincode: 5678
        }
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        employeeId: "2y3z4a5b6c7d",
        role: "Manager",
        joiningDate: "03/10/2012",
        status: "Inactive",
        experience: 8,
        department: 1,
        address: {
            houseNo: "789",
            line1: "Highway Road",
            line2: "Sector 5",
            pincode: 8765
        }
    },
    {
        id: 3,
        name: "Alice Brown",
        email: "alicebrown@example.com",
        employeeId: "3z4a5b6c7d8e",
        role: "Designer",
        joiningDate: "07/22/2018",
        status: "Active",
        experience: 2,
        department: 4,
        address: {
            houseNo: "321",
            line1: "Park Avenue",
            line2: "Block C",
            pincode: 4321
        }
    },
    {
        id: 4,
        name: "Bob Green",
        email: "bobgreen@example.com",
        employeeId: "4a5b6c7d8e9f",
        role: "Tester",
        joiningDate: "11/05/2017",
        status: "Active",
        experience: 3,
        department: 2,
        address: {
            houseNo: "654",
            line1: "Lakeview Road",
            line2: "Shady Park",
            pincode: 6543
        }
    },
    {
        id: 5,
        name: "Charlie White",
        email: "charliewhite@example.com",
        employeeId: "5b6c7d8e9f0g",
        role: "Sales",
        joiningDate: "05/18/2019",
        status: "Inactive",
        experience: 1,
        department: 5,
        address: {
            houseNo: "987",
            line1: "Ocean Drive",
            line2: "Beachside",
            pincode: 9876
        }
    },
    {
        id: 6,
        name: "Eve Black",
        email: "eveblack@example.com",
        employeeId: "6c7d8e9f0g1h",
        role: "HR",
        joiningDate: "02/02/2016",
        status: "Active",
        experience: 7,
        department: 2,
        address: {
            houseNo: "321",
            line1: "Sunset Boulevard",
            line2: "Hilltop",
            pincode: 2134
        }
    },
    {
        id: 7,
        name: "Eve Black",
        email: "eveblack@example.com",
        employeeId: "6c7d8e9f0g1h",
        role: "HR",
        joiningDate: "02/02/2016",
        status: "Probation",
        experience: 7,
        department: 2,
        address: {
            houseNo: "321",
            line1: "Sunset Boulevard",
            line2: "Hilltop",
            pincode: 2134
        }
    }   
];
    

export const EmployeeListContainer = () => {

    const [searchParams, setSearchParams] = useSearchParams();


    const [modalIsOpen, setModalIsOpen] = useState(false)

    // const handleGetSearchParams = () => {
    //     const status = searchParams.get("status") || "All"
    //     console.log("searchParams",status)
    // }
    const status = searchParams.get("status") || "all"
    // console.log("searchParams",status)

    const statusOptions = ["All", "Active", "Inactive", "Probation"]


    const navigate = useNavigate();


    const handleDeleteClick = (event: MouseEvent<HTMLImageElement>) => {
        setModalIsOpen(true)
        event.stopPropagation()
    }

    const handleOnClose = () => {
        setModalIsOpen(false)

    }


    const handleStatusFilterChange = (status: string) => {
        const newSearchParams = new URLSearchParams(searchParams)

        if (status === "all" ) {
            newSearchParams.delete("status")
        } else {
            newSearchParams.set("status", status)
        }
        setSearchParams(newSearchParams)
    }

    const filteredEmployees = useMemo(
        () => {

            if(status === "all") return employees
            else return employees.filter((employee) => 
                employee.status.toLowerCase() === status.toLowerCase()
            )
        }, [status]
    )


    // useEffect(() => {
    //     if(status === "All") filteredEmployees = employees

    //     else filteredEmployees=employees.filter((employee) => {
    //         employee.status.toLowerCase() === status.toLowerCase()
    //         console.log(employee.status.toLowerCase(), status.toLowerCase());
    //     })
    // }, [searchParams])



    return (
        <>
            {/* <div>
                <Button text='GetParams' variant='grey' type='button'onclick={handleGetSearchParams}/>
                <Button text='SetParams' variant='grey' type='button' onclick={handleStatusFilterChange} />
            </div> */}
            <div className='employee-list-title layout-child-div'>
                <h2>Employee List</h2>
                <div className='employee-list-title-input-group'>
                    <div className='employee-list-title-filter-group'>
                        <label>Filter By</label>
                        <select name='status' onChange={(event) => handleStatusFilterChange(event.target.value)}>
                            <option value="" disabled selected hidden> Status </option>
                            {
                                statusOptions.map((status) => {
                                    return <option value={status.toLowerCase()}>{status}</option>
                                })
                            }
                        </select>
                    </div>
                    <FormHeaderButton type="Create" onclick={() => navigate('/employees/create')}/>
                </div>
            </div>
            <div className='employee-list-header layout-child-div'>
                <h3>Employee Name</h3>
                <h3>Employee Id</h3>
                <h3>Joining Date</h3>
                <h3>Role</h3>
                <h3>Status</h3>
                <h3>Experience</h3>
                <h3>Action</h3>
            </div>
            {/* <div className='employee-list-element'>
                <p>Employee Name</p>
                <p>Employee Id</p>
                <p>Joining Date</p>
                <p>Role</p>
                <p><span className='span probation'>Status</span></p>
                <p>Experience</p>
                <div className='action-buttons'>
                    <img src={deleteIcon}/>
                    <img src={editIcon}/>
                </div>
            </div> */}

            {
                filteredEmployees.map((employee)=> {
                    return <div className='employee-list-element layout-child-div' onClick={()=>navigate(`/employees/details/${employee.id}`)}>
                        <p>{employee.name}</p>
                        <p>{employee.id}</p>
                        <p>{employee.joiningDate}</p>
                        <p>{employee.role}</p>
                        <p><StatusSpan status={employee.status}/></p>
                        <p>{employee.experience}</p>
                        <div className='action-buttons'>
                            <img src={deleteIcon} onClick={(event) => { handleDeleteClick(event) }} />
                            <img src={editIcon} onClick={(event) => { navigate(`/employees/edit/${employee.id}`); event.stopPropagation()}} />
                        </div>
                    </div>
                })
            }

            <Modal isOpen={modalIsOpen} onClose={handleOnClose}>
                <div className='delete-confirmation-box'>
                    
                    <div className='delete-confirmation-box-text '>
                        <h2>Are you sure?</h2>
                        <p>Do you really want to delete employee</p>
                    </div>
                    <div className='delete-confirmation-box-buttons '>
                        <Button variant='blue' text='Confirm' type='submit' />
                        <Button variant='grey' text='Cancel'  type='submit' onclick={handleOnClose}/>
                    </div>
                </div>
            </Modal>

        </>
    )
}