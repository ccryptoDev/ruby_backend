/***************************************************************************************************
 * BROWSER POLYFILLS
 */

/** IE10 and IE11 polyfills **/
import 'react-app-polyfill/ie11'
import 'core-js/es6/number'
import 'core-js/es6/math'
import 'core-js/es6/string'
import 'core-js/es6/array'
import 'core-js/es6/weak-map'
import 'core-js/es7/array'
import 'core-js/es7/object'
import 'classlist.js'
import 'url-polyfill'
import 'custom-event-polyfill'

/** IE10 polyfills (remove if you don't plan to support IE10) */
import 'core-js/es6/object'
import 'core-js/es6/map'
import 'core-js/es6/set'
import 'core-js/es7/map'
import 'core-js/es7/set'

/***************************************************************************************************
 * CUSTOM POLYFILLS
 */

if (!Element.prototype.closest) {
  Element.prototype.closest = function (css) {
    let node = this
    while (node) {
      if (node.matches(css)) return node
      else node = node.parentElement
    }
    return null
  }
}

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach
}

/***************************************************************************************************
 * CUSTOM POLYFILLS FOR IE10 (remove if you don't plan to support IE10)
 */

// "dataset" polyfill for Internet Explorer 10
// SOURCE: https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/Element/prototype/dataset/polyfill.js
if (document['documentMode'] === 10) {
  Object.defineProperty(Element.prototype, 'dataset', {
    get: function() {
      const element = this
      const attributes = this.attributes
      const map = {}

      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i]

        if (attribute && attribute.name && (/^data-\w[\w-]*$/).test(attribute.name)) {
          const name = attribute.name
          const value = attribute.value

          const propName = name.substr(5).replace(/-./g, function (prop) {
            return prop.charAt(1).toUpperCase()
          })

          Object.defineProperty(map, propName, {
            enumerable: true,
            get: function() {
              return this.value
            }.bind({value: value || ''}),
            set: function setter(name, value) {
              if (typeof value !== 'undefined') {
                this.setAttribute(name, value)
              } else {
                this.removeAttribute(name)
              }
            }.bind(element, name)
          })
        }
      }

      return map
    }
  })
}
