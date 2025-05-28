import './EmployeeListContainer.css'
import deleteIcon from '../../assets/delete.png'
import editIcon from '../../assets/pencil.png'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../../components'
import { useMemo } from 'react'

export const EmployeeListContainer = () => {

    const [searchParams, setSearchParams] = useSearchParams();


    // const handleGetSearchParams = () => {
    //     const status = searchParams.get("status") || "All"
    //     console.log("searchParams",status)
    // }
    const status = searchParams.get("status") || "All"
    console.log("searchParams",status)

    const statusOptions = ["All", "Active", "Inactive", "Probation"]


    


    const handleStatusFilterChange = (status: string) => {
        const newSearchParams = new URLSearchParams(searchParams)

        if (status === "All" ) {
            newSearchParams.delete("status")
        } else {
            newSearchParams.set("status", status)
        }

        setSearchParams(newSearchParams)
    }

    const employees =[
        {
            name: "vishal",
            id: 1234,
            role: 'HR',
            joiningDate: '12/1/1990',
            status: 'Active',
            experience: 3,
        },
        {
            name: "vishal",
            id: 1234,
            role: 'HR',
            joiningDate: '12/1/1990',
            status: 'Probation',
            experience: 3,
        },
        {
            name: "vishal",
            id: 1234,
            role: 'HR',
            joiningDate: '12/1/1990',
            status: 'Inactive',
            experience: 3,
        },
        {
            name: "vishal",
            id: 1234,
            role: 'HR',
            joiningDate: '12/1/1990',
            status: 'Active',
            experience: 3,
        },
        {
            name: "vishal",
            id: 1234,
            role: 'HR',
            joiningDate: '12/1/1990',
            status: 'Probation',
            experience: 3,
        },
        {
            name: "vishal",
            id: 1234,
            role: 'HR',
            joiningDate: '12/1/1990',
            status: 'Inactive',
            experience: 3,
        },
        {
            name: "vishal",
            id: 1234,
            role: 'HR',
            joiningDate: '12/1/1990',
            status: 'Active',
            experience: 3,
        },
        {
            name: "vishal",
            id: 1234,
            role: 'HR',
            joiningDate: '12/1/1990',
            status: 'Probation',
            experience: 3,
        },
        {
            name: "vishal",
            id: 1234,
            role: 'HR',
            joiningDate: '12/1/1990',
            status: 'Inactive',
            experience: 3,
        }
    ]

    const filteredEmployees = useMemo(
        () => {
            if(status === "All") return employees
            else return employees.filter((employee) => {
                employee.status === status
            })
        }, [searchParams]
    )

    return (
        <>
            {/* <div>
                <Button text='GetParams' variant='grey' type='button'onclick={handleGetSearchParams}/>
                <Button text='SetParams' variant='grey' type='button' onclick={handleStatusFilterChange} />
            </div> */}
            <div className='employee-list-title'>
                <h2>Employee List</h2>
                <div className='employee-list-title-input-group'>
                    <div className='employee-list-title-filter-group'>
                        <label>Filter By</label>
                        <select name='status'>
                            <option value="" disabled selected> Status </option>
                            {
                                statusOptions.map((status) => {
                                    return <option value={status.toLowerCase()}>{status}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='create-employee-button'>
                        <div className='plus-icon'>+</div>
                        <div className='create-employee-text'>Create Employee</div>
                    </div>
                </div>
            </div>
            <div className='employee-list-header'>
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
                    return <div className='employee-list-element'>
                        <p>{employee.name}</p>
                        <p>{employee.id}</p>
                        <p>{employee.joiningDate}</p>
                        <p>{employee.role}</p>
                        <p><span className={`span ${employee.status.toLowerCase()}`}>{employee.status}</span></p>
                        <p>{employee.experience}</p>
                        <div className='action-buttons'>
                            <img src={deleteIcon}/>
                            <img src={editIcon}/>
                        </div>
                    </div>
                })
            }
        </>
    )
}