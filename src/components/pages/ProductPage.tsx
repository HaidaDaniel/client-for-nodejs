/** @format */
import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Header, ProductPageBody } from '../../components/index'

import { fetchProductRequest } from '../../redux/ducks/product'
import { RootState } from '../../redux/rootReducer'

const ProductPage = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  useEffect(() => {
    productId && dispatch(fetchProductRequest(productId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])
  const product = useSelector((state: RootState) => state.product.product)

  return (
    <Container>
      <Header />
      {product && <ProductPageBody {...product} />}
    </Container>
  )
}

export default ProductPage
