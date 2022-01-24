import React, { Component } from 'react'

class SidenavHeader extends Component {
  render() {
        const { className, ...rest } = this.props


    return (
      <div className={`sidenav-header ${className || ''}`} {...rest}>
        {this.props.children}
      </div>
    )
  }
}

export default SidenavHeader
