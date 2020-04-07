import React from 'react'
import { NavbarBrand, Navbar } from 'reactstrap'
import Bandwidth from './Bandwidth'

const Main = () => (
  <div className="main" data-testid="main">
    <Navbar
      className="d-flex align-items-center p-0 justify-content-center mb-5"
      data-testid="navbar"
    >
      <NavbarBrand data-testid="navbar-brand">cdn and p2p</NavbarBrand>
    </Navbar>
    <Bandwidth />
  </div>
)

export default Main
