import './EmployeeListContainer.css'
import deleteIcon from '../../assets/delete.png'
import editIcon from '../../assets/pencil.png'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Modal } from '../../components'
import { useEffect, useMemo, useState, type JSXElementConstructor, type MouseEvent, type ReactElement, type ReactNode, type ReactPortal } from 'react'
import { FormHeaderButton } from '../../components/Button/FormHeaderButton'
import { StatusSpan } from '../../components/StatusSpan/StatusSpan'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { EMPLOYEE_ACTION_TYPES, type Employee } from '../../store/employee/employee.types'
import store from '../../store/store'
import { useDeleteEmployeeMutation, useGetEmployeeListQuery } from '../../api-service/employees/employees.api'

const employees = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        employeeId: "1x2y3z4a5b6c",
        role: "Developer",
        dateOfJoining: "01/15/2015",
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
        dateOfJoining: "03/10/2012",
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
        dateOfJoining: "07/22/2018",
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
        dateOfJoining: "11/05/2017",
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
        dateOfJoining: "05/18/2019",
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
        dateOfJoining: "02/02/2016",
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
        dateOfJoining: "02/02/2016",
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
    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const [deleteEmployee] = useDeleteEmployeeMutation()


    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(-1);

    const status = searchParams.get("status") || "all"

    const statusOptions = ["All", "Active", "Inactive", "Probation"]

    const navigate = useNavigate();


    const handleDeleteClick = (event: MouseEvent<HTMLImageElement>) => {
        setModalIsOpen(true)
        event.stopPropagation()
    }

    const handleOnClose = () => {
        setModalIsOpen(false)

    }


    // const employees = useSelector((state:any) => state.employees)
    // console.log(employees)

    // const employees = store.getState().employee.employees
    // console.log(employees)

    const getEmployees = useGetEmployeeListQuery();
    const employees = getEmployees.data  

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
            if(status.toLowerCase() === "all" || (status.toLowerCase() in statusOptions)) return employees
            else return employees?.filter((employee: { status: string }) => {
                return employee.status.toLowerCase() === status.toLowerCase()
            }
            )
        }, [status, employees]
    )

    const HandleDeleteEmployee = async() => {
        deleteEmployee({id: deleteId})
        .unwrap()
        .then((response) => {
            console.log("response")
            console.log(response)
            alert(response.message)
        }).catch((error) => {
            console.log("error")
            console.log(error)
            alert(error)
        })
        console.log("handle delete employee")
        // await deleteEmployee({id: deleteId})
        setModalIsOpen(false)
    }

      



    return (
        <>
            <div className='employee-list-title layout-child-div'>
                <h2>Employee List</h2>
                <div className='employee-list-title-input-group'>
                    <div className='employee-list-title-filter-group'>
                        <label>Filter By</label>
                        <select name='status' defaultValue='' onChange={(event) => handleStatusFilterChange(event.target.value)}>
                            <option value="" disabled hidden> Status </option>
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

            {
                filteredEmployees?.map((employee: Employee)=> {
                    return (
                        <div className='employee-list-element layout-child-div' onClick={()=>navigate(`/employees/details/${employee.id}`)}>
                            <p>{employee.name}</p>
                            <p>{employee.employeeId}</p>
                            <p>{new Date (employee.dateOfJoining ).toLocaleDateString()}</p>
                            <p>{employee.role}</p>
                            <p><StatusSpan status={employee.status.charAt(0) + employee.status.substring(1).toLowerCase()}/></p>
                            <p>{employee.experience}</p>
                            <div className='action-buttons'>
                                <img src={deleteIcon} onClick={(event) => { handleDeleteClick(event); if (employee.id) setDeleteId(employee.id) }} />
                                <img src={editIcon} onClick={(event) => { navigate(`/employees/edit/${employee.id}`); event.stopPropagation()}} />
                            </div>
                        </div>
                    ) 
                })
            }

            <Modal isOpen={modalIsOpen} onClose={handleOnClose}>
                <div className='delete-confirmation-box'>
                    
                    <div className='delete-confirmation-box-text '>
                        <h2>Are you sure?</h2>
                        <p>Do you really want to delete employee</p>
                    </div>
                    <div className='delete-confirmation-box-buttons '>
                        <Button variant='blue' text='Confirm' type='submit' onclick={HandleDeleteEmployee}/>
                        <Button variant='grey' text='Cancel'  type='submit' onclick={handleOnClose}/>
                    </div>
                </div>
            </Modal>

        </>
    )
}