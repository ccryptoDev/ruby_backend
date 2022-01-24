import React, { Component } from 'react'
import { connect } from 'react-redux'

class LayoutFooter extends Component {
  render() {
    return (
      <nav className={`layout-footer footer bg-${this.props.footerBg}`}>
        <div className="container-fluid container-p-x pb-3">
          <a href="#link-1" className="footer-link pt-3">Link 1</a>
          <a href="#link-2" className="footer-link pt-3 ml-4">Link 2</a>
        </div>
      </nav>
    )
  }
}

export default connect(store => ({
  footerBg: store.theme.footerBg
}))(LayoutFooter)
