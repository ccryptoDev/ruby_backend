import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import layoutHelpers from './helpers'
import Logo from '../logo'

class LayoutNavbar extends Component {
  constructor(props) {
    super(props)
    this.isRTL = document.documentElement.getAttribute('dir') === 'rtl'
  }

  toggleSidenav(e) {
    e.preventDefault()
    layoutHelpers.toggleCollapsed()
  }

  render() {
    return (
      <Navbar bg={this.props.navbarBg} expand="lg" className="layout-navbar align-items-lg-center container-p-x">

        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/">
          <Logo></Logo>
        </Navbar.Brand>

        {/* Sidenav toggle */}
        {this.props.sidenavToggle && (
          <Nav className="align-items-lg-center mr-auto mr-lg-4">
            <Nav.Item as="a" className="nav-item nav-link px-0 ml-2 ml-lg-0" href="#toggle" onClick={this.toggleSidenav}>
              <i className="ion ion-md-menu text-large align-middle"></i>
            </Nav.Item>
          </Nav>
        )}

        {/* Navbar toggle */}
        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="align-items-lg-center">
            <Nav.Item>
              <Nav.Link href="#link-1">Link 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link-2">Link 2</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
    )
  }
}

LayoutNavbar.propTypes = {
  sidenavToggle: PropTypes.bool
}

LayoutNavbar.defaultProps = {
  sidenavToggle: true
}

export default connect(store => ({
  navbarBg: store.theme.navbarBg
}))(LayoutNavbar)
