import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

class HoverDropdown extends Component {
  constructor(props) {
    super(props)

    // Bind instance
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onClick = this.onClick.bind(this)

    // Get options
    const { as, timeout, openOnHover, ...elOptions } = props
    this.options = { timeout, openOnHover, as }

    this.elOptions = elOptions

    // Force remove option
    delete this.elOptions.show
    delete this.elOptions.ref

    // Set state
    this.state = {
      show: false
    }

    // Hovered flag
    this.hovered = false
  }

  get el() {
    if (this._el.tagName) return this._el

    return (
      this._el = ReactDOM.findDOMNode(this._el)
    )
  }

  // Timeouts
  //

  createTimeout() {
    this.resetTimeout()
    this.timeoutId = setTimeout(
      () => this.close(),
      this.options.timeout
    )
  }

  resetTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  open() {
    this.resetTimeout()
    this.setState({ show: true })

    // .dropdown menu element is not exists when the element is mounted,
    // so get it after the menu is shown
    if (!this.menu) {
      this.menu = this.el.querySelector('.dropdown-menu')
    }
  }

  close() {
    this.resetTimeout()
    this.setState({ show: false })
    this.hovered = false
  }

  onMouseEnter(e) {
    if (!this.options.openOnHover) return
    if (e.target !== this.toggle && e.target !== this.menu) return

    if (e.target === this.toggle && !this.state.show) {
      this.hovered = true
      this.toggle.focus()
    }

    this.open()
  }

  onMouseLeave(e) {
    if ((e.target !== this.toggle && e.target !== this.menu) || !this.hovered) return
    this.createTimeout()
  }

  onFocus(e) {
    this.resetTimeout()
    if (e.target !== this.toggle || !this.hovered)
      this.hovered = false
  }

  onBlur() {
    this.createTimeout()
  }

  onClick(e) {
    if (e.target === this.el) return

    if (e.target === this.toggle && !this.hovered) {
      e.preventDefault()
      this.state.show ? this.close() : this.open()
    }

    else if (e.target !== this.toggle)
      this.close()
  }

  componentDidMount() {
    this.toggle = this.el.querySelector('.dropdown-toggle')
    this.el.addEventListener('mouseenter', this.onMouseEnter, true)
    this.el.addEventListener('mouseleave', this.onMouseLeave, true)
    this.el.addEventListener('focus', this.onFocus, true)
    this.el.addEventListener('blur', this.onBlur, true)
    this.el.addEventListener('click', this.onClick, true)
  }

  componentWillUnmount() {
    this.resetTimeout()
    this.el.removeEventListener('mouseenter', this.onMouseEnter, true)
    this.el.removeEventListener('mouseleave', this.onMouseLeave, true)
    this.el.removeEventListener('focus', this.onFocus, true)
    this.el.removeEventListener('blur', this.onBlur, true)
    this.el.removeEventListener('click', this.onClick, true)
  }

  render() {
    return (
      <this.props.as {...this.elOptions} show={this.state.show} ref={el => this._el = el} />
    )
  }
}

HoverDropdown.propTypes = {
  as: PropTypes.any.isRequired,
  timeout: PropTypes.number,
  openOnHover: PropTypes.bool
}

HoverDropdown.defaultProps = {
  timeout: 150,
  openOnHover: true
}

export default HoverDropdown
