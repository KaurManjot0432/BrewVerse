import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    breweries: [],
    breweryNames: [],
    breweryCities: [],
    breweryTypes: [],
    token: null,
    user: null,
    selectedBrewery: null,
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
        setBreweryNames: (state, action) => {
            state.breweryNames = action.payload.breweryNames;
        },
        setBreweryTypes: (state, action) => {
            state.breweryTypes = action.payload.breweryTypes;
        },
        setBreweryCities: (state, action) => {
            state.breweryCities = action.payload.breweryCities;
        },
        setSelectedBrewery: (state, action) => {
            state.selectedBrewery = action.payload.selectedBrewery;
        },
    }
})
export const {
    setLogin,
    setLogout,
    setBrewery,
    setBreweries,
    setBreweryNames,
    setBreweryTypes,
    setBreweryCities,
    setSelectedBrewery
} = authSlice.actions;
export default authSlice