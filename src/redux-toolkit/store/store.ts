import { configureStore } from '@reduxjs/toolkit'
import sensorsSlice from '../slices/sensorsSlice'


export const store = configureStore({
    reducer: { 
        sensors: sensorsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch