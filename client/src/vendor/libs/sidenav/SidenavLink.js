import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SidenavLink extends Component {
  render() {
    const {
      className,
      href,
      icon,
      target,
      linkClass,
      badgeText,
      badgeVariant,
      disabled,
      active,
      ...rest
    } = this.props

    const rel = target === '_blank' ? 'noopener noreferrer' : null

    return (
      <div className={
        `sidenav-item ${className || ''}` +
          (active ? ' active' : '') +
          (disabled ? ' disabled' : '')
      } {...rest}>
        <a href={href} target={target} rel={rel} className={`sidenav-link ${linkClass}`}>
          {icon && <i className={`sidenav-icon ${icon}`}></i>}
          <div>{this.props.children}</div>
          {badgeText && <div className="pl-1 ml-auto"><div className={`badge badge-${badgeVariant}`}>{badgeText}</div></div>}
        </a>
      </div>
    )
  }
}

SidenavLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.string,
  target: PropTypes.string,
  linkClass: PropTypes.string,
  badgeText: PropTypes.string,
  badgeVariant: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool
}

SidenavLink.defaultProps = {
  icon: '',
  target: '_self',
  linkClass: '',
  badgeText: '',
  badgeVariant: 'primary',
  disabled: false,
  active: false
}

export default SidenavLink
