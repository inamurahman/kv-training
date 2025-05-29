import { useNavigate } from "react-router-dom";
import { EmployeeForm } from "../../containers/employee.form/EmployeeForm";
import { useState } from "react";



export const CreateEmployee = () => {
    const [formValues, setFormValues] = useState(
        {
            name: "",
            email:"",
            age: 0,
            employeeId: '',
            role: '',
            joiningDate: '',
            status: '',
            experience: '',
            department: 0,
            address: {
                houseNo: "",
                line1: "",
                line2: "",
                pincode: ""
            }
        }
    )

    const handleFormChange = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value

        }))
    }
    
    const handleAddressChange = (event: { target: { name: any; value: any; }; }) => {
        const {name, value} = event.target
        setFormValues(prev => ({
            ...prev,
            address : {
                ...prev.address,
                [name]: value
            }
        }))
    }


    return (
        <>
            <EmployeeForm type="Create" values={formValues} formOnChange={handleFormChange} addressOnChange={handleAddressChange}/>
        </>
    )
}