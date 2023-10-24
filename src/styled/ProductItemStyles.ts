/** @format */

import styled from 'styled-components'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const StyledProductItem = styled.div`
  margin: 0.3rem;
  height: 48.5rem;
  @media ${(props) => props.theme.media.lg} {
    height: 41rem;
  }
  @media ${(props) => props.theme.media.md} {
    height: 50rem;
  }
  @media ${(props) => props.theme.media.sm} {
    height: 60rem;
  }
`
export const CardStyled = styled(Card)`
  width: 100%;
  height: 100%;
`

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
  align-items: center;
`

export const ProductImageBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0.25rem;
`

export const ProductName = styled.p`
  margin: 0;
  text-decoration: none;
  color: ${(props) => props.theme.colors.normal};
`

export const StyledCardTitle = styled(Card.Title)`
  display: flex;
  align-items: center;
  height: 100%;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.normal};

  &:hover {
    text-decoration: underline;
  }
`
