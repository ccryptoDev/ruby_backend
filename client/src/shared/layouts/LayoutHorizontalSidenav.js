import React, { Component } from 'react'
import LayoutNavbar from './LayoutNavbar'
import LayoutSidenav from './LayoutSidenav'
import LayoutFooter from './LayoutFooter'
import layoutHelpers from './helpers'

class LayoutHorizontalSidenav extends Component {
  componentDidMount() {
    // Enshure that we have not '.layout-expanded' class on the html element
    layoutHelpers._removeClass('layout-expanded')

    layoutHelpers.init()
    layoutHelpers.update()
    layoutHelpers.setAutoUpdate(true)
  }

  componentWillUnmount() {
    layoutHelpers.destroy()
  }
 
  render() {
    return (
      <div className="layout-wrapper layout-1 layout-without-sidenav">
        <div className="layout-inner">
          <LayoutNavbar sidenavToggle={false} {...this.props} />

          <div className="layout-container">
            <div className="layout-content">
              <LayoutSidenav orientation="horizontal" {...this.props} />

              <div className="container-fluid flex-grow-1 container-p-y">
                {this.props.children}
              </div>

              <LayoutFooter {...this.props} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LayoutHorizontalSidenav
