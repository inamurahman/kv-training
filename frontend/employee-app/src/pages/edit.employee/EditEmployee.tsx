import { useNavigate, useParams } from "react-router-dom";
import { EmployeeForm } from "../../containers/employee.form/EmployeeForm";
import { useEffect, useState, type FormEvent } from "react";
import { useEditEmployeeMutation, useGetEmployeeByIdQuery, useGetEmployeeListQuery } from "../../api-service/employees/employees.api";
import type { Employee } from "../../store/employee/employee.types";



export const EditEmployee = () => {
    const navigate = useNavigate();

    const {id} = useParams();

    const employeeData = useGetEmployeeByIdQuery({id})
    const employee = employeeData.data 
    
    // employee.departmentId = employee.department.id //no initial value department id
    const [ doEdit, {isLoading} ] = useEditEmployeeMutation();
    // const employees = useSelector((state:any) => state.employee.employees)
    const [formValues, setFormValues] = useState<Employee>({} as Employee)

    useEffect(()=> {
        if(employee)
        setFormValues({
            ...employee,
            departmentId: employee.department.id,
            dateOfJoining: new Date(employee.dateOfJoining).toISOString().split('T')[0]
        })
    }, [employee])


    // useEffect(()=>{
    //     setFormValues({...employee, departmentId: employee.department.id})
    // },[employee])
        
    
    console.log("formvalues",formValues)
    const handleFormChange = (name:string, value: string | number) => {
        if (formValues?.address && name in formValues.address){
            setFormValues((prev) => {
                return ({
                    ...prev,
                    address: {
                        ...prev?.address,
                        [name]: value
                    }
                });
            })
        } else{
            setFormValues((prev: any) => ({
                ...prev,
                [name]: value

            }))
        }
        
    }
    
    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formValues) doEdit({
            ...formValues
        })
        navigate(-1)
    }
    
    // const handleAddressChange = (event: { target: { name: any; value: any; }; }) => {
    //     const {name, value} = event.target
    //     setFormValues(prev => ({
    //         ...prev,
    //         address : {
    //             ...prev.address,
    //             [name]: value
    //         }
    //     }))
    // }

    // if (isLoading) return (<p>Loading</p>)
    if(employeeData.isLoading) return (<p> Loading </p>)
    if(!formValues) return (<p> no data</p>)

    return (
        <>
            <EmployeeForm type="Edit" values={formValues as Employee} formOnChange={handleFormChange} onsubmit={handleFormSubmit}/>
        </>
    )
}