import { useNavigate, useParams } from "react-router-dom"
import "./EmployeeDetails.css"
import { StatusSpan } from "../../components/StatusSpan/StatusSpan";
import { FormHeaderButton } from "../../components/Button/FormHeaderButton";
import { useSelector } from "react-redux";
import type { Employee } from "../../store/employee/employee.types";
import { useAppSelector } from "../../store/store";
import { useGetEmployeeByIdQuery, useGetEmployeeListQuery } from "../../api-service/employees/employees.api";
import { isUserWithAccess } from "../../utilities/checkAccess";


export const EmployeeDetails = () => {
    const {id} = useParams();
    // const employees = useSelector((state:any) => state.employees)
    // const employees = useAppSelector((state) => state.employee.employees)

    // const getEmployees = useGetEmployeeListQuery();
    // const employees = getEmployees.data

    // const employee = employees?.find ((e: Employee) => e.id === Number(id))

    const employeeData = useGetEmployeeByIdQuery({id})
    const employee = employeeData.data    
    const navigate = useNavigate()

    const isPrivilegedUser = isUserWithAccess();
    

    
    if(!employee) return null

    return (
        <>
            <div className='employee-list-title layout-child-div'>
                <h2>Employee Details</h2>

                {
                    isPrivilegedUser &&
                    <div className='employee-list-title-input-group'>
                        <FormHeaderButton type="Edit" onclick={() => navigate(`/employees/edit/${employee.id}`)}/>
                    </  div>
                }
                
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

                <div className='employee-details-container-wrapper layout-child-div'>
                    <div className="employee-details-container">
                        <div>
                            <h3>Employee Name</h3>
                            <p>{employee.name}</p>
                        </div>
                        <div>
                            <h3>Employee Id</h3>
                            <p>{employee.employeeId}</p>
                        </div>
                        <div>
                            <h3>Joining Date</h3>
                            <p>{new Date (employee.dateOfJoining ).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <h3>Role</h3>
                            <p>{employee.role}</p>
                        </div>
                        <div>
                            <h3>Status</h3>
                            <p><StatusSpan status={employee.status} /></p>

                        </div>
                    </div>
                    <div className="partition-line"></div>
                    <div className="employee-details-container">
                        <div>
                            <h3>Address</h3>
                            <p>{employee.address?.houseNo}</p>
                            <p>{employee.address?.line1}</p>
                            <p>{employee.address?.line2}</p>
                            <p>{employee.address?.pincode}</p>
                        </div>
                        <div>
                            <h3>Experience</h3>
                            <p>{employee.experience} Years</p>
                        </div>
                        <div>
                            <h3>Employee ID Proof</h3>
                            <p> </p>
                        </div>
                    </div>
            
            </div>
    
        </>
    )
}