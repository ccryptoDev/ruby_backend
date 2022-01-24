import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class SidenavRouterLink extends Component {
  render() {
    const { 
      className,
      icon,
      linkClass,
      badgeText,
      badgeVariant,
      disabled,
      active,
      ...rest
    } = this.props

    return (
      <NavLink activeClassName="active" className={
        `sidenav-item d-block ${className || ''}` +
          (active ? ' active' : '') +
          (disabled ? ' disabled' : '')
      } {...rest}>
        <div className={`sidenav-link ${linkClass}`}>
          {icon && <i className={`sidenav-icon ${icon}`}></i>}
          <div>{this.props.children}</div>
          {badgeText && <div className="pl-1 ml-auto"><div className={`badge badge-${badgeVariant}`}>{badgeText}</div></div>}
        </div>
      </NavLink>
    )
  }
}

SidenavRouterLink.propTypes = {
  icon: PropTypes.string,
  linkClass: PropTypes.string,
  badgeText: PropTypes.string,
  badgeVariant: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool
}

SidenavRouterLink.defaultProps = {
  icon: '',
  linkClass: '',
  badgeText: '',
  badgeVariant: 'primary',
  disabled: false,
  active: false
}

export default SidenavRouterLink
