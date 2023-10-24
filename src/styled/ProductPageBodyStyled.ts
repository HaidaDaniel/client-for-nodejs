/** @format */

import styled from 'styled-components'
export const StyledDivOfProduct = styled.div`
  margin-top: 2rem;
`

export const StyledImgOfProduct = styled.img`
  border-right: 1px solid ${(props) => props.theme.colors.bordercolor};
  border-bottom: 1px solid ${(props) => props.theme.colors.bordercolor};
  padding-right: 2rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  @media ${(props) => props.theme.media.sm},
    ${(props) => props.theme.media.md} {
    border-right: none !important;
    padding-right: 0;
  }
`
