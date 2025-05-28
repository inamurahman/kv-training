import { Input, Button, SelectComponent} from "../../components"
import { HomeLayout } from "../../containers/home.layout/HomeLayout"

export const CreateEmployeePage = () => {
    return (
        <>
            {/* <Header/> */}
            {/* <Sidebar/> */}
            <HomeLayout title="Create Employee" children={<CreateEmployeeForm/>}/>
        </>
    )
}

export const CreateEmployeeForm = () => {
    const deparments = [{key:1, value:'HR'}, {key: 2, value:'BACKEND'}];
    const roles = [{key:1, value:'Assistant'}, {key: 2, value:'Senior'}];
    const status = [{key:1, value:'ACTIVE'}, {key: 2, value:'INACTIVE'}];

    return (
        <>
            <div className="form-container">
                <Input label="Employee Name" name="employeeName" type="text" variant="input" placeholder="Employee name" />
                <Input label="Joining Date" name="joiningDate" type="text" variant="input" placeholder="Joining Date"/>

                <SelectComponent label="Department" name="department" options={deparments} />
                <SelectComponent label="Role" name="role" options={roles} />
                <SelectComponent label="Status" name="status" options={status} />

                <Input label="Experience" name="experience" type="text" variant="input" placeholder="Experience"/>

                <div className="form-element">
                    <label>Address</label>
                    <input type="text" name="houseNo" placeholder="Flat no"/>
                    <input type="text" name="line1" placeholder="Line 1"/>
                    <input type="text" name="line2" placeholder="Line 2"/>
                </div>
                
            </div>
            <div>
                <Button variant="blue" className="button-form" type="submit" text="Create" />
                <Button variant="grey" className="button-form" type="button" text="Cancel" />
            </div>
        </>
    )
}