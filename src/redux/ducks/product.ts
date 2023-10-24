/** @format */
import { takeLatest, call, put } from 'redux-saga/effects'
import { IProduct } from '../../components/interfaces/IProductData'
import { fetchProductById } from '../../api'

// Actions
const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST'
const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS'
const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE'

// Types
export interface ProductState {
  product: null | IProduct
  loading: boolean
  error: null | string
}

interface FetchProductRequestAction {
  type: typeof FETCH_PRODUCT_REQUEST
  id: string
}

interface FetchProductSuccessAction {
  type: typeof FETCH_PRODUCT_SUCCESS
  payload: IProduct
}

interface FetchProductFailureAction {
  type: typeof FETCH_PRODUCT_FAILURE
  payload: string
}

type ProductActionTypes =
  | FetchProductRequestAction
  | FetchProductSuccessAction
  | FetchProductFailureAction

// Reducer
const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
}

export default function productReducer(
  state = initialState,
  action: ProductActionTypes
): ProductState {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: null,
      }
    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        product: null,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

// Action creators
export function fetchProductRequest(id: string): FetchProductRequestAction {
  return { type: FETCH_PRODUCT_REQUEST, id }
}

export function fetchProductSuccess(data: any): FetchProductSuccessAction {
  return { type: FETCH_PRODUCT_SUCCESS, payload: data }
}

export function fetchProductFailure(error: string): FetchProductFailureAction {
  return { type: FETCH_PRODUCT_FAILURE, payload: error }
}

// Saga
export function* fetchProductSaga(action: { type: string; id: number }) {
  try {
    const id: number = action.id
    const data: IProduct = yield call(fetchProductById, id)
    yield put(fetchProductSuccess(data))
  } catch (error: any) {
    yield put(fetchProductFailure(error))
  }
}

export function* productRootSaga() {
  yield takeLatest(FETCH_PRODUCT_REQUEST, fetchProductSaga)
}
