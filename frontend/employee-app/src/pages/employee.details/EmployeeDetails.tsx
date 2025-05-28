import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const {id} = useParams();

    return (
        <p>Employee id: {id}</p>
    )
}