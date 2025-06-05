import { useNavigate } from "react-router-dom";
import { EmployeeForm } from "../../containers/employee.form/EmployeeForm";
import { useState, type FormEvent } from "react";
import { useStore } from "react-redux";
import { useCreateEmployeeMutation } from "../../api-service/employees/employees.api";



export const CreateEmployee = () => {
    const navigate = useNavigate();
    const [createEmployee] = useCreateEmployeeMutation();
    const [formValues, setFormValues] = useState(
        {
            name: "",
            email:"",
            age: 0,
            employeeId: '',
            role: '',
            password: '',
            dateOfJoining: null,
            status: '',
            experience: 0,
            departmentId: 0,
            address: {
                houseNo: "",
                line1: "",
                line2: "",
                pincode: 0
            }
        } 
    )

    // const handleFormChange = (event: { target: { name: any; value: any; }; }) => {
    //     const {name, value} = event.target;
    //     if (name in formValues.address){
    //         setFormValues(prev => ({
    //             ...prev,
    //             address : {
    //                 ...prev.address,
    //                 [name]: value
    //             }
    //         }))
    //     } else{
    //         setFormValues(prev => ({
    //             ...prev,
    //             [name]: value

    //         }))
    //     }
        
    // }

    const handleFormChange = (name:string, value: string | number) => {
        if (name in formValues.address){
            setFormValues(prev => ({
                ...prev,
                address : {
                    ...prev.address,
                    [name]: value
                }
            }))
        } else{
            setFormValues(prev => ({
                ...prev,
                [name]: value

            }))
        }
        
    }

    // const store = useStore();
    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // // dispatch({type: 'employee/ADD', payload: formValues})
        // const action = addEmployee(formValues)
        // dispatch(action)
        // console.log(store.getState(), "store>?"
        
        console.log(formValues)
        createEmployee(formValues)
        .unwrap()
        .then((response)=> {
            console.log(response)
            alert (response)
        }).catch((error) => {
            console.log(error)
            alert(error)
        })
        
        navigate(-1)
    }


    return (
        <>
            <EmployeeForm type="Create" values={formValues} formOnChange={handleFormChange} onsubmit={handleFormSubmit}/>
        </>
    )
}