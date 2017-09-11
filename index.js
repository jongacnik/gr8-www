var html = require('choo/html')
var log = require('choo-log')
var choo = require('choo')

// inline css
require('insert-css')(require('browserify-exec')('node style.js'))

// inline parsed utils
var utilities = JSON.parse(require('browserify-exec')('node parse-utils.js'))

var trackpanel = require('./components/track-panel')
var cssdecl = require('./components/css-decl')

var app = choo()
app.use(log())
app.use(content)
app.use(navigation)
app.route('*', mainView)
app.mount('body')

function content (state, emitter) {
  state.content = {
    title: 'gr8',
    subtitle: '',
    url: 'https://github.com/jongacnik/gr8/blob/master/readme.md',
    doctext: 'Documentation',
    utilities: utilities,
    sections: utilities.map(u => u.key),
    description: 'gr8 is developed and iterated-on primarily for use within projects at Folder Studio.'
  }
}

function navigation (state, emitter) {
  // set active to first section
  state.active = state.content.sections[0]

  // update active section
  emitter.on('navigation', function (data) {
    state.active = data
    emitter.emit('render')
  })
}

function mainView (state, emit) {
  var sections = state.content.utilities.map(group => html`
    <div id="${group.key}">
      ${group.utils.map(util => cssdecl(util))}
    </div>
  `)

  function handleScroll (e) {
    emit('navigation', e.id)
  }

  return html`
    <body class="ff-mono fs1 highlight">
      <main>
        
        <div class="c12 x xjb psf usn">
          <div class="p2 pen">
            ${state.content.title}
            <br>${state.content.subtitle}
          </div>
          <div class="p2">
            <a class="wsnw cura" href="${state.content.url}">
              ${state.content.doctext}
            </a>
          </div>
        </div>
        
        <div class="c12 x">
          <div class="c6 p2 usn" sm="psf b0">
            ${state.content.sections.map(section => html`
              <div>
                <a href="#${section}" class="${state.active === section ? 'active' : ''}">
                  ${section}
                </a>
              </div>
            `)}
          </div>
          <div class="c6 p2" sm="co6">
            ${trackpanel(sections, handleScroll)}
            <div class="vhmn60"></div>
            <div>${state.content.description}</div>
          </div>
        </div>

      </main>
    </body>
  `
}
