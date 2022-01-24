import React, { Component } from 'react'

class SidenavBlock extends Component {
  render() {
    const { className, ...rest } = this.props

    return (
      <div className={`sidenav-block ${className || ''}`} {...rest}>
        {this.props.children}
      </div>
    )
  }
}

export default SidenavBlock
