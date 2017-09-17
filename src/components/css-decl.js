var html = require('choo/html')
var component = require('fun-component')

module.exports = component(function (cssobj) {
  var type = cssobj.declarations.length > 1 ? 'multiple' : 'single'

  return html`
    <div class="gr8-block gr8-block-${type}">
      <span class="gr8-selector">${cssobj.selector}</span>
      <span class="gr8-bracket gr8-bracket--open">{</span>
      ${cssobj.declarations.map(declaration => html`
        <span class="gr8-declaration gr8-declaration-${type}">${declaration}</span>
      `)}
      <span class="gr8-bracket gr8-bracket--close">}</span>
    </div>
  `
})
