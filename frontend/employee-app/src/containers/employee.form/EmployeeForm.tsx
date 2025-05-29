import { useNavigate } from "react-router-dom";
import { Input, Button, SelectComponent} from "../../components"
import "./EmployeeForm.css"

interface Props {
    type: "Edit" | "Create";
    formOnChange: (event: { target: { name: any; value: any; }; } ) => void;
    addressOnChange: (event: { target: { name: any; value: any; }; } ) => void;
    values: {
        name: string,
        email:string,
        age: number,
        employeeId: string,
        role: string,
        joiningDate: string,
        status: string,
        experience: string,
        department: number,
        address: {
            houseNo: string,
            line1: string,
            line2: string,
            pincode: string
        }
    }
}




export const EmployeeForm = (props: Props) => {
    const deparments = [{key:1, value:'HR'}, {key: 2, value:'BACKEND'}];
    const roles = [{key:1, value:'Assistant'}, {key: 2, value:'Senior'}];
    const status = [{key:1, value:'ACTIVE'}, {key: 2, value:'INACTIVE'}];

    const navigate = useNavigate();


    const isEdit = props.type==="Edit";


    return (
        <>
            <div className="layout-child-div"><h2>{props.type} Employee</h2></div>
            <div className="layout-child-div">
                <div className="form-container">
                    <Input label="Employee Name" name="name" type="text" variant="input" placeholder="Employee name" value={props.values.name} onchange={props.formOnChange} />
                    <Input label="Joining Date" name="joiningDate" type="text" variant="input" placeholder="Joining Date" value={props.values.joiningDate} onchange={props.formOnChange}/>
                    <Input label="Email" name="email" type="text" variant="input" placeholder="Email" value={props.values.email} onchange={props.formOnChange}/>
                    <Input label="Age" name="age" type="number" variant="input" placeholder="Age" value={props.values.age as unknown as string} onchange={props.formOnChange}/>


                    <SelectComponent label="Department" name="department" options={deparments} value={props.values.department as unknown as string} onchange={props.formOnChange}/>
                    <SelectComponent label="Role" name="role" options={roles} value={props.values.role} onchange={props.formOnChange}/>
                    <SelectComponent label="Status" name="status" options={status} value={props.values.status} onchange={props.formOnChange}/>

                    <Input label="Experience" name="experience" type="text" variant="input" placeholder="Experience" value={props.values.experience as unknown as string} onchange={props.formOnChange}/>
                    <Input label="Employee Id" name="employeeId" type="string" variant="input" placeholder="Employee Id" value={props.values.employeeId} onchange={props.formOnChange} disabled={isEdit}/>

                    <div className="form-element address-input">
                        <label>Address</label>
                        <input className="input" type="text" name="houseNo" placeholder="Flat no" value={props.values.address.houseNo} onChange={props.addressOnChange}/>
                        <input className="input" type="text" name="line1" placeholder="Line 1" value={props.values.address.line1} onChange={props.addressOnChange}/>
                        <input className="input" type="text" name="line2" placeholder="Line 2" value={props.values.address.line2} onChange={props.addressOnChange}/>
                        <input className="input" type="text" name="pincode" placeholder="Pincode" value={props.values.address.pincode} onChange={props.addressOnChange}/>
                    </div>
                    
                </div>
                <div>
                    <Button variant="blue" className="button-form" type="submit" text={props.type==="Create"? "Create" : "Edit"} />
                    <Button variant="grey" className="button-form" type="button" text="Cancel" onclick={() => navigate(-1) }/>
                </div>
            </div>
        </>
    )
}