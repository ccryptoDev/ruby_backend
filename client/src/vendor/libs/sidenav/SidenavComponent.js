import React, { Component } from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import PropTypes from 'prop-types'
import { SideNav } from './sidenav'

import '../react-perfect-scrollbar/react-perfect-scrollbar.scss'

class SidenavComponent extends Component {
  componentDidMount() {
    this.sidenav = new SideNav(this.el, {
      orientation: this.props.orientation,
      animate: this.props.animate,
      accordion: this.props.accordion,
      closeChildren: this.props.closeChildren,
      showDropdownOnHover: this.props.showDropdownOnHover,

      onOpen: this.props.onOpen,
      onOpened: this.props.onOpened,
      onClose: this.props.onClose,
      onClosed: this.props.onClosed
    }, PerfectScrollbar)
  }

  componentWillUnmount() {
    if (this.sidenav) this.sidenav.destroy()
    this.sidenav = null
  }

  render() {
    /* eslint-disable */
    const {
      className, 
      orientation,
      animate,
      accordion,
      closeChildren,
      showDropdownOnHover,
      onOpen,
      onOpened,
      onClose,
      onClosed,
      ...rest
    } = this.props
    /* eslint-enable */

    return (
      <nav className={'sidenav sidenav-' + orientation + ` ${className || ''}`} {...rest} ref={el => this.el = el}>
        {this.props.children}
      </nav>
    )
  }
}

SidenavComponent.propTypes = {
  orientation: PropTypes.oneOf(['vertical', 'horizontal']),
  animate: PropTypes.bool,
  accordion: PropTypes.bool,
  closeChildren: PropTypes.bool,
  showDropdownOnHover: PropTypes.bool,
  onOpen: PropTypes.func,
  onOpened: PropTypes.func,
  onClose: PropTypes.func,
  onClosed: PropTypes.func
}

SidenavComponent.defaultProps = {
  orientation: 'vertical',
  animate: true,
  accordion: true,
  closeChildren: false,
  showDropdownOnHover: false
}

export default SidenavComponent
