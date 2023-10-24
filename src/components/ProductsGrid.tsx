/** @format */
import { FC } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProductItem } from './index'

import { fetchProductsRequest } from '../redux/ducks/products'
import { StyledRow, StyledCol } from '../styled/ProductsGridStyles'
import { RootState } from '../redux/rootReducer'

const ProductsGrid: FC = () => {
  const dispatch = useDispatch()
  const products = useSelector((state: RootState) => state.products.products)

  useEffect(() => {
    dispatch(fetchProductsRequest())
  }, [dispatch])

  return (
    <StyledRow>
      {products &&
        products.map((product) => (
          <StyledCol key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </StyledCol>
        ))}
    </StyledRow>
  )
}

export default ProductsGrid
