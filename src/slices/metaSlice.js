import { createSlice } from '@reduxjs/toolkit';
// import { useGetAllEmployeesQuery } from "../../services/employeeApi";


const initialState = {
    role: localStorage.getItem('role')||'',
    profile:{},
    filteredEmp:[]
}

const metaSlice = createSlice({
    name:'meta',
    initialState,
    reducers:{
        setProfile : (state, action) => {
            const {employees, username} = action.payload;
            state.profile = employees?.find(emp=> emp?.email===username);
            console.log(state.profile);
            state.role = state?.profile?.userRole;
            localStorage.setItem('role', state.role);
            console.log(state.role)
        },
        setFilterEmp : (state, action) => {
            console.log(action.payload)
            state.filteredEmp = action.payload?.filteredEmp;
        }
    }
})

export const { setProfile, setFilterEmp } = metaSlice.actions;

export default metaSlice.reducer;