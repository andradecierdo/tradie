import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { useTradieJobs } from '../context/TradieJobsContext'

export function NavBar() {
  const { tradie } = useTradieJobs()
  const pathName = useLocation().pathname
  return (
    pathName !== '/' ?
      <Navbar bg="dark" data-bs-theme="dark">
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
            <Nav.Link to="/jobs" as={NavLink}>Jobs</Nav.Link>
          </Nav>
        <Navbar.Brand className="justify-content-end">{ tradie.name }</Navbar.Brand>
      </Navbar>
      : null
  )
}
