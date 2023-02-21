import { createSlice } from "@reduxjs/toolkit"

const speciesFromLocalStorage = localStorage.getItem("allSpcies") || `[]`
const initialSpecies = JSON.parse(speciesFromLocalStorage)

const initialState: string[] = initialSpecies;


export const speciesSlice = createSlice({
    name: "species",
    initialState,
    reducers: {
        setAddSpecies (state, action){
            state.push(action.payload);
            localStorage.setItem("allSpcies", JSON.stringify(state))
        },
       
    },
});

export const {setAddSpecies} = speciesSlice.actions;

export default speciesSlice.reducer


       // <select
            //   id="ageRangeField"
            //   name="species"
            //   onChange={(e) => handleInputChange(e)}
            // >
            //  <option value="Bovid">Bovid</option>
            //   <option value="Feline">Feline</option>
            //   <option value="Canine">Canine</option>
            //   <option value="Mustelid">Mustelid</option>
            //   <option value="Hominid">Hominid</option>
            //   <option value="Cricetid Rodent">Cricetid rodent</option>
            //   <option value="Cervid">Cervid</option>
            //   <option value="Beaver">Beaver</option>
            //   <option value="Hyena">Hyene</option>
            //   <option value="Hippopotamus">Hippopotamus</option>
            //   <option value="Procyonid">Procyonid</option>
            //   <option value="Manatee">Manatee</option>
            //   <option value="Anteater">Anteater</option>
            //   <option value="Cebidae">Cebidae</option>
            //   <option value="Viverrid">Viverid</option>
            //   <option value="Cercopithecidea">Cercopithecidea</option> 
            // </select>