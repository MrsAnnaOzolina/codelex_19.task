import { configureStore } from '@reduxjs/toolkit'
import animalSlice from './animalSlice'
// ...

export const store = configureStore({
  reducer: {
    myAllAnimals: animalSlice
    
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch