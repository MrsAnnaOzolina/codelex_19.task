import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export type Animal ={
    id:number;
    name:string,
    image:string,
    species:string,
}

// Define a type for the slice state
interface AnimalSliceType {
    allAnimals: Animal[];
    loading:boolean
}

// Define the initial state using that type
const initialState: AnimalSliceType = {
    allAnimals: [],
    loading:false
}

export const animalSlice = createSlice({
  name: 'myAllAnimals',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setShowallAnimals: (state, {payload}:PayloadAction<Animal[]>)=>{
state.allAnimals = payload
    },
    setLoading: (state, {payload}:PayloadAction<boolean> ) => {
        state.loading = payload
    }
    
  },
})

export const {setShowallAnimals, setLoading } = animalSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default animalSlice.reducer