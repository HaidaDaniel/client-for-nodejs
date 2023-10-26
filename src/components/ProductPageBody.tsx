/** @format */
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import { CommentInput, CommentsBlock, RatingStars } from './index'

import { StyledImgOfProduct } from '../styled/ProductPageBodyStyled'
import { RootState } from '../redux/rootReducer'
import { IProduct } from '../components/interfaces'

const ProductPageBody: FC<IProduct> = (product) => {
  const user = useSelector((state: RootState) => state.auth.user)
  const data = product

  return (
    <>
      {data && (
        <Row className='mt-3' data-testid='product-page-body'>
          <Col md='6' xs='12' className=''>
            <StyledImgOfProduct
              src={data.image}
              alt={data.title}
              className='col-left'
              style={{ maxWidth: '100%', height: 'auto' }}
            ></StyledImgOfProduct>
          </Col>
          <Col md='6' xs='12' className='col-right mt-3'>
            <Row className='mb-3'>
              <h3>{data.title}</h3>
            </Row>
            <Row className='align-items-center mb-3'>
              <Col xs='auto'>
                <RatingStars rating={data.rating.rate} isInput={false} />
              </Col>
              <Col xs='auto' className='ml-auto my-auto'>
                Price:{' ' + data.price + ' '}usd
              </Col>
            </Row>
            <Row>
              <h5>Description:</h5>
            </Row>
            <Row className='mb-3'>{data.description}</Row>
            <Row className='mb-3 border-top'>
              <CommentsBlock />
            </Row>
            <Row className='border-top pt-3 mb-3'>
              {user !== null ? (
                <CommentInput productId={data.id} />
              ) : (
                <div>Login please to make a review</div>
              )}
            </Row>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductPageBody
