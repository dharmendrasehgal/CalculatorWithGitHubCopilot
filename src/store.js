import { configureStore } from '@reduxjs/toolkit'
import calculatorReducer from './features/calculatorSlice.js'

const store = configureStore({
  reducer: {
    calculator: calculatorReducer
  }
})

export default store
