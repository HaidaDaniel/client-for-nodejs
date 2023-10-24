/** @format */

import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'

export const StyledNavbar = styled(Navbar)`
  background-color: ${(props) => props.theme.colors.primary};
  position: sticky;
  top: 0;
  z-index: 1020;
  border-radius: 8px;
  margin-top: 0.25rem;
  justify-content: space-between;
`
export const StyledNavbarBrand = styled(Navbar.Brand)`
  color: ${(props) => props.theme.colors.normal};
  font-size: 1.5rem;
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  text-decoration: none;
`
export const StyledNavbarCollapse = styled(Navbar.Collapse)`
  justify-content: flex-end;
  margin-right: 1.5rem;
  margin-left: 1.5rem;
`
export const StyledNav = styled(Nav)`
   {
    color: ${(props) => props.theme.colors.normal};
    margin-left: auto;
    font-size: 1.2rem;

    &:hover {
      text-decoration: none;
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`
