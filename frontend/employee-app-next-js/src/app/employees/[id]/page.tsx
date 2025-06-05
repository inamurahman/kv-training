export default async function EmployeePage ({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    return (<h1>Employee id: {id}</h1>)
}   