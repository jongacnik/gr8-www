var html = require('choo/html')
var component = require('fun-component')
var x = require('xtend')
var st = require('scrolltop')
var rafScroll = require('raf-scroll')

module.exports = component({
  name: 'track-panel',
  
  tracker: null,

  update (element, children, prev) {
    return false
  },

  load (element, children, onchange) {
    this.tracker = scrolltrack({
      elements: children.map((el, i) => ({
        element: el,
        index: i
      })),
      // offset: () => window.innerHeight / 2,
      onEnter: e => onchange(e)
    })

    this.check = (e) => this.tracker.check(e)

    rafScroll.add(this.check)
  },

  unload (element, children) {
    rafScroll.remove(this.check)
  },

  render (children) {
    return html`<div>${children}</div>`
  }

})

function scrolltrack (opts) {
  var options = {
    elements: [],
    offset: () => 0,
    onEnter: element => {}
  }

  var state = {
    scrollTop: 0,
    current: null
  }

  var setOptions = opts => { options = x(options, opts) }
  var setState = newState => { state = x(state, newState) }

  setOptions(opts)

  function check (e) {
    var scrollTop = st() + options.offset()
    setState({
      scrollTop: scrollTop
    })
    tops(options.elements)
  }

  function tops (elements) {
    var newElements = elements.slice()
    newElements.reverse()
    newElements.some(e => {
      if (state.scrollTop >= e.element.offsetTop) {
        if (state.current !== e.index) {
          setState({ current: e.index })
          options.onEnter(e.element)
        }
        return true
      }
    })
  }

  return {
    check
  }
}
