import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    breweries: [],
    token: null,
    user: null
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setBreweries: (state, action) => {
            state.breweries = action.payload.breweries;
        },
        setBrewery: (state: any, action) => {
            const updatedBrewery = state.breweries.map((brewery: any) => {
                if (brewery._id === action.payload.brewery._id) {
                    return action.payload.brewery;
                } else {
                    return brewery;
                }
            })
            state.breweries = updatedBrewery;
        },
        setDelete: (state, action) => {
            const updatedBreweries = state.breweries.filter((brewery: any) => {
                return brewery._id !== action.payload.brewery._id
            })
            state.breweries = updatedBreweries;
        }
    }
})
export const { setLogin, setLogout, setBrewery, setBreweries, setDelete } = authSlice.actions;
export default authSlice