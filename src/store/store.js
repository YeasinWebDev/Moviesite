import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './HomeSlice'

export default configureStore({
  reducer: {
    home:homeSlice
  },
})