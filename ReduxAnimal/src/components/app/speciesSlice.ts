import { createSlice } from "@reduxjs/toolkit"

const speciesFromLocalStorage = localStorage.getItem("allSpcies") || `[]`
const initialSpecies = JSON.parse(speciesFromLocalStorage)

const initialState: string[] = initialSpecies;


const speciesSlice = createSlice({
    name: "species",
    initialState,
    reducers: {
        setAddSpecies (state, action) {
            state.push(action.payload);
        },
    }.
});

export const {setAddSpecies} = speciesSlice.actions;

export default speciesSlice.reducer
