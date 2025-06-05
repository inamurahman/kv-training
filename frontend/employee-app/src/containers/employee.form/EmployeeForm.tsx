import { useNavigate } from "react-router-dom";
import { Input, Button, SelectComponent } from "../../components"
import "./EmployeeForm.css"
import type { FormEventHandler } from "react";
import type { Employee } from "../../store/employee/employee.types";
import { useGetDepartmentListQuery } from "../../api-service/departments/deparments.api";

interface Props {
    type: "Edit" | "Create";
    formOnChange: (name: string, value: string | number) => void;
    // addressOnChange: (event: { target: { name: any; value: any; }; } ) => void;
    onsubmit: FormEventHandler<HTMLFormElement>;
    values: Employee
}





export const EmployeeForm = (props: Props) => {
    const departmentData = useGetDepartmentListQuery();
    const departments: {value: number, name: string}[] = []

    if(departmentData?.data instanceof Array){
        departmentData.data.forEach(element => {
        departments.push(
            {
                value: element.id,
                name: element.name
            }
        )
    });
    }
     
    console.log(departments)

    // const deparments = [{ key: 1, value: 'HR' }, { key: 2, value: 'BACKEND' }];
    const roles = [{value: 'UI', name: 'UI'}, {value: 'UX', name: 'UX'}, {value: 'DEVELOPER', name: 'DEVELOPER'}, {value: 'HR', name: 'HR'}, {value: 'ADMIN', name: 'ADMIN'}]
    const status = [{ value: 'ACTIVE', name: 'ACTIVE' }, { value: 'INACTIVE', name: 'INACTIVE' }, { value: 'PROBATION', name: 'PROBATION' }];

    const navigate = useNavigate();


    const isEdit = props.type === "Edit";
    console.log("values in form")
    console.log(props.values)
    console.log("name", props.values.name)


    return (
        <>
            <div className="layout-child-div"><h2>{props.type} Employee</h2></div>
            <form className="layout-child-div" onSubmit={props.onsubmit}>
                <div className="form-container">
                    <Input label="Employee Name" name="name" type="text" variant="input" placeholder="Employee name" value={props.values.name} onchange={(event) => { props.formOnChange(event.target.name, event.target.value) }} />
                    <Input label="Joining Date" name="dateOfJoining" type="date" variant="input" placeholder="Joining Date" value={String(props.values.dateOfJoining)} onchange={(event) => { props.formOnChange(event.target.name, event.target.value) }} />
                    <Input label="Email" name="email" type="text" variant="input" placeholder="Email" value={props.values.email} onchange={(event) => { props.formOnChange(event.target.name, event.target.value) }} />
                    <Input label="Age" name="age" type="number" variant="input" placeholder="Age" value={String(props.values.age)} onchange={(event) => { props.formOnChange(event.target.name, Number(event.target.value)) }} />


                    <SelectComponent label="Department" name="departmentId" options={departments} value={props.values.departmentId} defaultValue={0} onchange={(event) => { props.formOnChange(event.target.name, Number(event.target.value)) }} />
                    <SelectComponent label="Role" name="role" options={roles} value={props.values.role} onchange={(event) => { props.formOnChange(event.target.name, event.target.value) }} />
                    <SelectComponent label="Status" name="status" options={status} value={props.values.status} onchange={(event) => { props.formOnChange(event.target.name, event.target.value) }} />

                    <Input label="Experience" name="experience" type="number" variant="input" placeholder="Experience" value={String(props.values.experience)} onchange={(event) => { props.formOnChange(event.target.name, Number(event.target.value)) }} />
                    <Input label="Employee Id" name="employeeId" type="string" variant="input" placeholder="Employee Id" value={props.values.employeeId} onchange={(event) => { props.formOnChange(event.target.name, event.target.value) }} disabled={isEdit} />

                    <div className="form-element address-input">
                        <label>Address</label>
                        <input className="input" type="text" name="houseNo" placeholder="Flat no" value={props.values.address?.houseNo} onChange={(event) => { props.formOnChange(event.target.name, event.target.value) }} />
                        <input className="input" type="text" name="line1" placeholder="Line 1" value={props.values.address?.line1} onChange={(event) => { props.formOnChange(event.target.name, event.target.value) }} />
                        <input className="input" type="text" name="line2" placeholder="Line 2" value={props.values.address?.line2} onChange={(event) => { props.formOnChange(event.target.name, event.target.value) }} />
                        <input className="input" type="text" name="pincode" placeholder="Pincode" value={props.values.address?.pincode} onChange={(event) => { props.formOnChange(event.target.name, Number(event.target.value)) }} />
                    </div>

                    {
                        !isEdit && 
                        <Input label="Password" type="password" variant="input" name="password" placeholder="Password" value={props.values.password} onchange={(event) => { props.formOnChange(event.target.name, event.target.value) }}/>
                    }
                    {/* to do : validation of password (greater than 5 characters) */}

                </div>
                <div>
                    <Button variant="blue" className="button-form" type="submit" text={props.type === "Create" ? "Create" : "Edit"} />
                    <Button variant="grey" className="button-form" type="button" text="Cancel" onclick={() => navigate(-1)} />
                </div>
            </form>
        </>
    )
}