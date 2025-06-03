// import { EMPLOYEE_ACTION_TYPES, type Employee, type EmployeeAction, type EmployeeState, type Role, type Status } from "./employee.types";


// const initialState: { employees: Employee[] } = { employees: []}


// function employeeReducer (state: EmployeeState = initialState , action:EmployeeAction ): EmployeeState {

//     switch (action.type) {
//         case EMPLOYEE_ACTION_TYPES.ADD :
//             return { ...state, employees: [ ...state.employees, action.payload as Employee]}

//         case EMPLOYEE_ACTION_TYPES.UPDATE :
//             return { ...state, employees: state.employees.map((employee) => {
//                 if (employee.employeeId === action.payload.employeeId) return action.payload
//                 else return employee
//             }
//             )}
        
//         case EMPLOYEE_ACTION_TYPES.DELETE :
//             return { ...state, employees: state.employees.filter((employee) => employee.employeeId !== action.payload)}

//         default:
//             return state
//     }
// }


// export default employeeReducer

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Employee, EmployeeState } from './employee.types';

const initialState: EmployeeState = {
  employees: [],
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
  },
});

export const { addEmployee } = employeeSlice.actions
export default employeeSlice.reducer;