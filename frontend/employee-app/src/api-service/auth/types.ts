export interface LoginResponse {
    tokenType: string,
    accessToken: string,
    payload: AccessPayload
}

export interface LoginPayload {
    email: string,
    password: string
}

export interface AccessPayload {
        id: number,    
        email: string,
        role: string,
}