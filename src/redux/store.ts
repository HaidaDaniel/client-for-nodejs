/** @format */
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer, { RootState } from './rootReducer'
import { productRootSaga } from './ducks/product'
import { productsRootSaga } from './ducks/products'
import { authSaga } from './ducks/auth'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
const rootSagas = [
  productsRootSaga,
  productRootSaga,
  authSaga,
]
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore<RootState, any, any, any>(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

rootSagas.forEach((saga) => sagaMiddleware.run(saga))

export default store
