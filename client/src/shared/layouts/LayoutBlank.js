import React, { Component } from 'react'

class LayoutBlank extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default LayoutBlank
