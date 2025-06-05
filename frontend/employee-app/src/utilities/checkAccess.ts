export const isUserWithAccess =  () => {
    const payloadString = localStorage.getItem("access-payload")
    if(!payloadString) return null
    const payload = JSON.parse(payloadString)
    
    if(payload.role === "ADMIN" || payload.role === "HR") return true;
    return false;
}