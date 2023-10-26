/** @format */
import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyledNavbar,
  StyledNavbarBrand,
  StyledNavbarCollapse
} from '../styled/HeaderStyles'
import { RootState } from '../redux/rootReducer'

const Header: FC = () => {
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    console.log(auth)
    const token = localStorage.getItem('token')
    if (!auth.isAuth && !!token) {
      dispatch({ type: 'CHECK_AUTH' })
    }
    setIsAuthChecked(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    console.log(auth)
  }

  return (
    <StyledNavbar expand='lg'>
      <StyledNavbarBrand as={Link} to='/' href='#' className='mx-4'>
        Shop
      </StyledNavbarBrand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <StyledNavbarCollapse
        id='basic-navbar-nav'
        className='justify-content-end mx-2'
      >
        {isAuthChecked && (
          <Nav className='ml-auto mx-2'>
            {!auth.isLoading && auth.user === null && (
              <>
                <Nav.Link as={Link} to='/registration'>
                  Registration
                </Nav.Link>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
              </>
            )}
            {!auth.isLoading && auth.user !== null && (
              <Button onClick={handleLogout}>Logout</Button>
            )}
          </Nav>
        )}
      </StyledNavbarCollapse>
    </StyledNavbar>
  )
}

export default Header
