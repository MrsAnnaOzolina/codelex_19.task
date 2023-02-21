import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const animalsLocalStorage = localStorage.getItem("animals") || `[]`
const animalsLocalStorageInitial= JSON.parse(animalsLocalStorage)

type Animal ={
    id:number;
    name:string,
    image:string,
    species:string,
}

// Define a type for the slice state
interface AnimalSliceType {
    allAnimals: Animal[];
    loading:boolean;
}

// Define the initial state using that type
const initialState: AnimalSliceType = {
    allAnimals: animalsLocalStorageInitial,
    loading:false
}

export const animalSlice = createSlice({
  name: 'myAllAnimals',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowallAnimals (state, {payload}) {
        state.allAnimals.push(payload);
        localStorage.setItem("animals", JSON.stringify(state.allAnimals))
    },
    setLoading (state, {payload}:PayloadAction<boolean> ) {
        state.loading = payload
    }, 
    setRemoveAnimals (state,  {payload} ) {
        // console.log(state.allAnimals);
        state.allAnimals = state.allAnimals.filter((animal) => {
            // console.log(animal)
            return animal.id !== payload
        });
        //need to get from storage info when state is initiated
        localStorage.setItem("animals", JSON.stringify(state.allAnimals))
    }
  },
})

export const {setShowallAnimals, setLoading, setRemoveAnimals } = animalSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default animalSlice.reducer