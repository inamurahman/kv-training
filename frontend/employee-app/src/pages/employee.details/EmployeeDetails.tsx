import { useNavigate, useParams } from "react-router-dom"
import "./EmployeeDetails.css"
import { StatusSpan } from "../../components/StatusSpan/StatusSpan";
import { FormHeaderButton } from "../../components/Button/FormHeaderButton";

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
    }
];

export const EmployeeDetails = () => {
    const {id} = useParams();

    const employee = employees.find ((e) => e.id === Number(id))
    const navigate = useNavigate()
    if(!employee) return null

    return (
        <>
            <div className='employee-list-title layout-child-div'>
                <h2>Employee Details</h2>
                <div className='employee-list-title-input-group'>
                    <FormHeaderButton type="Edit" onclick={() => navigate(`/employees/edit/${employee.id}`)}/>
                </div>
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

                <div className='employee-details-container layout-child-div'>
                    <div>
                        <h3>Employee Name</h3>
                        <p>{employee.name}</p>
                    </div>
                    <div>
                        <h3>Employee Id</h3>
                        <p>{employee.id}</p>
                    </div>
                    <div>
                        <h3>Joining Date</h3>
                        <p>{employee.joiningDate}</p>
                    </div>
                    <div>
                        <h3>Role</h3>
                        <p>{employee.role}</p>
                    </div>
                    <div>
                        <h3>Status</h3>
                        <p><StatusSpan status={employee.status} /></p>

                    </div>
                    {/* <div className="partition-line"></div> */}
                    
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
    
        </>
    )
}