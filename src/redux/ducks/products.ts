/** @format */
import { IProducts } from '../../components/interfaces/IProducts'
import { takeLatest, call, put } from 'redux-saga/effects'
import { fetchProducts } from '../../api'

// Actions
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'

// Types

export interface ProductsState {
  products: IProducts[] | null
  loading: boolean
  error: null | string
}

interface FetchProductsRequestAction {
  type: typeof FETCH_PRODUCTS_REQUEST
}

interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS
  payload: IProducts[]
}

interface FetchProductsFailureAction {
  type: typeof FETCH_PRODUCTS_FAILURE
  payload: string
}

type ProductsActionTypes =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction

// Reducer
const initialState: ProductsState = {
  products: null,
  loading: false,
  error: null,
}

export default function productsReducer(
  state = initialState,
  action: ProductsActionTypes
): ProductsState {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      }
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        products: null,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Action creators
export function fetchProductsRequest(): FetchProductsRequestAction {
  return { type: FETCH_PRODUCTS_REQUEST }
}

export function fetchProductsSuccess(
  data: IProducts[]
): FetchProductsSuccessAction {
  return { type: FETCH_PRODUCTS_SUCCESS, payload: data }
}

export function fetchProductsFailure(
  error: string
): FetchProductsFailureAction {
  return { type: FETCH_PRODUCTS_FAILURE, payload: error }
}

// Saga
export function* fetchProductsSaga() {
  try {
    const data: IProducts[] = (yield call(fetchProducts)) as IProducts[]
    yield put(fetchProductsSuccess(data))
  } catch (error: any) {
    yield put(fetchProductsFailure(error))
  }
}

export function* productsRootSaga() {
  yield takeLatest(FETCH_PRODUCTS_REQUEST, fetchProductsSaga)
}
