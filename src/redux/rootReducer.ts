/** @format */
import { combineReducers } from 'redux'
import productsReducer, { ProductsState } from './ducks/products'
import productReducer, { ProductState } from './ducks/product'
import authReducer, { AuthState } from './ducks/auth'

export interface RootState {
  products: ProductsState
  product: ProductState
  auth: AuthState
}

const rootReducer = combineReducers<RootState>({
  products: productsReducer,
  product: productReducer,
  auth: authReducer,
})

export default rootReducer
