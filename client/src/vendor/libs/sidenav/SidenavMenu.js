import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SidenavMenu extends Component {
  render() {
    const {
      className,
      linkText,
      icon,
      linkClass,
      badgeText,
      badgeVariant,
      disabled,
      active,
      open,
      ...rest
    } = this.props
    
    return (
      <div className={
        `sidenav-item ${className || ''}` +
          (active ? ' active' : '') +
          (disabled ? ' disabled' : '') +
          (open ? ' open' : '')
      } {...rest}>
        <a href="#sidenav-toggle" className={`sidenav-link sidenav-toggle ${linkClass}`}>
          {icon && <i className={`sidenav-icon ${icon}`}></i>}
          <div>{linkText}</div>
          {badgeText && <div className="pl-1 ml-auto"><div className={`badge badge-${badgeVariant}`}>{badgeText}</div></div>}
        </a>
        <div className="sidenav-menu">
          {this.props.children}
        </div>
      </div>
    )
  }
}

SidenavMenu.propTypes = {
  linkText: PropTypes.any.isRequired,
  icon: PropTypes.string,
  linkClass: PropTypes.string,
  badgeText: PropTypes.string,
  badgeVariant: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  open: PropTypes.bool,
}

SidenavMenu.defaultProps = {
  icon: '',
  linkClass: '',
  badgeText: '',
  badgeVariant: 'primary',
  disabled: false,
  active: false,
  open: false,
}

export default SidenavMenu
