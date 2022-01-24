import React, { Component } from 'react'

class SidenavDivider extends Component {
  render() {
    const { className, ...rest } = this.props

    return (
      <div className={`sidenav-divider ${className || ''}`} {...rest}></div>
    )
  }
}

export default SidenavDivider
