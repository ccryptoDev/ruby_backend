import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

class MegaDropdown extends Component {
  constructor(props) {
    super(props)

    // Bind instance
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onDocumentClick = this.onDocumentClick.bind(this)

    // Get options
    const { as, timeout, openOnHover, ...elOptions } = props
    this.options = { timeout, openOnHover, as }

    elOptions.className = (elOptions.className || '') + ' mega-dropdown'
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
    this.focused = false
  }

  get el() {
    if (this._el.tagName) return this._el

    return (
      this._el = ReactDOM.findDOMNode(this._el)
    )
  }

  // Timeouts
  //

  createTimeout(ignoreFocus = false) {
    this.resetTimeout()
    this.timeoutId = setTimeout(
      () => this.close(false, ignoreFocus),
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

  close(force = false, ignoreFocus = false) {
    this.resetTimeout()
    if (force) {
      this.hovered = false
      this.focused = false
    }
    if (ignoreFocus) this.focused = false
    if (this.hovered || this.focused) return
    this.setState({ show: false })
  }

  onMouseEnter(e) {
    if (e.target === this.menu) this.hovered = true
    if (!this.options.openOnHover) return
    if (e.target !== this.toggle && e.target !== this.menu) return

    if (e.target === this.toggle && !this.state.show) {
      this.toggle.focus()
    }

    this.open()
  }

  onMouseLeave(e) {
    if (e.target === this.menu) this.hovered = false
    if ((e.target !== this.toggle && e.target !== this.menu) || !this.options.openOnHover) return
    this.createTimeout(true)
  }

  onFocus() {
    this.resetTimeout()
    this.focused = true
  }

  onBlur() {
    this.focused = false
    this.createTimeout()
  }

  isMegaLink(el) {
    while (!el.classList.contains('mega-dropdown') && !el.classList.contains('mega-link')) {
      el = el.parentNode
    }
    return !el.classList.contains('mega-dropdown')
  }

  onClick(e) {
    if (e.target === this.el) return

    if (e.target === this.toggle && !this.options.openOnHover) {
      e.preventDefault()
      this.state.show ? this.close(false, true) : this.open()
    }

    else if (e.target === this.toggle && this.options.openOnHover && !this.state.show) {
      e.preventDefault()
      this.open()
    }

    else if (this.isMegaLink(e.target))
      this.close(true)

    else if (e.target !== this.toggle)
      this.close()
  }

  onDocumentClick(e) {
    if (this.state.show && e.target !== this.toggle && e.target !== this.menu)
      this.close()
  }

  componentDidMount() {
    this.toggle = this.el.querySelector('.dropdown-toggle')
    this.el.addEventListener('mouseenter', this.onMouseEnter, true)
    this.el.addEventListener('mouseleave', this.onMouseLeave, true)
    this.el.addEventListener('focus', this.onFocus, true)
    this.el.addEventListener('blur', this.onBlur, true)
    this.el.addEventListener('click', this.onClick, true)
    document.addEventListener('click', this.onDocumentClick, true)
  }

  componentWillUnmount() {
    this.resetTimeout()
    this.el.removeEventListener('mouseenter', this.onMouseEnter, true)
    this.el.removeEventListener('mouseleave', this.onMouseLeave, true)
    this.el.removeEventListener('focus', this.onFocus, true)
    this.el.removeEventListener('blur', this.onBlur, true)
    this.el.removeEventListener('click', this.onClick, true)
    document.removeEventListener('click', this.onDocumentClick, true)
  }

  render() {
    return (
      <this.props.as {...this.elOptions} show={this.state.show} ref={el => this._el = el} />
    )
  }
}

MegaDropdown.propTypes = {
  as: PropTypes.any.isRequired,
  timeout: PropTypes.number,
  openOnHover: PropTypes.bool
}

MegaDropdown.defaultProps = {
  timeout: 150,
  openOnHover: false
}

export default MegaDropdown
