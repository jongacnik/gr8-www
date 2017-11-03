var html = require('choo/html')
var component = require('fun-component')
var scroll = require('../helpers/smooth-scroll')

module.exports = component({
  name: 'navigation',
  update (element, props, prev) {
    return props[1] !== prev[1]
  },
  afterupdate (element, sections, active, handleClick) {
    scroll(
      document.querySelector('[href="#' + active + '"]'), 
      function () {}, 
      element, 
      true,
      -10
    )
  },
  render (sections, active, handleClick) {
    return html`
      <div class="psf b0 l0 w100 wsnw oys bgc-white bt1-accent p2 z4" md="usn c6 bt0-accent wsn">
        ${sections.map(section => html`
          <div class="di" md="db">
            <a 
              href="#${section}"
              class="${active === section ? 'active' : ''}"
              onclick=${handleClick}
            >
              ${section}
            </a>
          </div>
        `)}
      </div>
    `
  }
})




