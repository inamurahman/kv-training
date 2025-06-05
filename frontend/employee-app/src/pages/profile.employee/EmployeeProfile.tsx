import { useNavigate, useParams } from 'react-router-dom';
import './EmployeeProfile.css'
import { useGetEmployeeByIdQuery } from '../../api-service/employees/employees.api';
import { StatusSpan } from '../../components/StatusSpan/StatusSpan';
import profilIcon from "../../assets/profile-icon.png"
import { Button } from '../../components';
import { isUserWithAccess } from '../../utilities/checkAccess';


const EmployeeProfile = () => {
    // const {id} = useParams();
    const payloadString = localStorage.getItem("access-payload")
    if(!payloadString) return null
    const {id} = JSON.parse(payloadString)

    const employeeData = useGetEmployeeByIdQuery({id})
    const employee = employeeData.data    
    const navigate = useNavigate()

    const isPrivilegedUser = isUserWithAccess();
    

    if(!employee) return null

    return (
        <div className='profile-page'>
            <div className='profile-container'>
                <div className='profile-image-container'>
                    <div className='fake-profile-image'>
                        <img src={profilIcon} className='profile-image' />
                    </div>
                </div>
                <div className='profile-data-container'>
                    <div className='profile-name '>
                        {/* <h3>Employee Name</h3> */}
                        <h1>{employee.name.toUpperCase()}</h1>
                    </div>
                    <div className='profile-data-element margin-bottom'>
                        <h3>Employee Id</h3>
                        <p>{employee.employeeId}</p>
                    </div>
                    <div className='profile-data-element margin-bottom'>
                        <h3>Joining Date</h3>
                        <p>{new Date (employee.dateOfJoining ).toLocaleDateString()}</p>
                    </div>
                    <div className='profile-data-element margin-bottom'>
                        <h3>Role</h3>
                        <p>{employee.role}</p>
                    </div>
                    <div className='profile-data-element margin-bottom'>
                        <h3>Status</h3>
                        <div>
                            <p><StatusSpan status={employee.status} /></p>
                        </div>
                        {/* <p >{employee.status}</p> */}

                    </div>
                    <div className='profile-data-element margin-bottom'>
                        <h3>Address</h3>
                        <div>
                            <p>{employee.address?.houseNo}</p>
                            <p>{employee.address?.line1}</p>
                            <p>{employee.address?.line2}</p>
                            <p>{employee.address?.pincode}</p>
                        </div>
                    </div>
                    <div className='profile-data-element margin-bottom'>
                        <h3>Experience</h3>
                        <p>{employee.experience} Years</p>
                    </div>
                    {
                        isPrivilegedUser &&
                        <div className='profile-data-element'>
                            <Button type='submit' variant='grey' text='Edit' onclick={()=> navigate(`/employees/edit/${id}`)} />
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default EmployeeProfile;