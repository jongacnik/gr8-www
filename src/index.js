var html = require('choo/html')
var log = require('choo-log')
var choo = require('choo')
var scroll = require('./helpers/smooth-scroll')

var jumpnav = require('./components/navigation')
var trackpanel = require('./components/track-panel')
var cssdecl = require('./components/css-decl')

// inline css
require('insert-css')(require('browserify-exec')('node src/style.js'))

// inline parsed utils
var utilities = JSON.parse(require('browserify-exec')('node src/parse-utils.js'))

var app = choo()
// app.use(log())
app.use(content)
app.use(navigation)
app.route('*', mainView)
app.mount('body')

function content (state, emitter) {
  state.content = {
    title: 'gr8',
    nav: [
      { text: 'docs', link: 'https://github.com/jongacnik/gr8' },
      { text: 'cdn', link: 'https://cdn.rawgit.com/jongacnik/gr8/daaf18fb/dist/gr8.css' }
    ],
    utilities: utilities,
    sections: utilities.map(u => u.key),
    description: 'gr8 is developed and iterated-on primarily for use within projects at Folder Studio.'
  }
}

function navigation (state, emitter) {
  state.active = state.content.sections[0]
  state.scrolling = false

  emitter.on('navigation', function (data) {
    state.active = data
    if (!state.scrolling) {
      emitter.emit('render')
    }
  })

  emitter.on('scrollstart', function () {
    state.scrolling = true
  })

  emitter.on('scrollstop', function () {
    state.scrolling = false
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

  function handleClick (e) {
    e.preventDefault()
    scrollto(e.target.hash, 300)
  }

  function scrollto (hash, duration) {
    emit('scrollstart')
    scroll(document.querySelector(hash), function () {
      emit('scrollstop')
    })
  }

  return html`
    <body class="ff-mono fs1 highlight">
      <main id="main">
        
        <div class="c12 x xjb usn psf">
          <div class="p2">
            <a class="fc-pink" href="#main" onclick=${handleClick}>${state.content.title}</a>
          </div>
          <div class="p2">
            ${state.content.nav.map(item => html`
              <span class="ili"><a class="wsnw cura" href="${item.link}">${item.text}</a></span>
            `)}
          </div>
        </div>
        
        <div class="c12 x xw">
          ${jumpnav(state.content.sections, state.active, handleClick)}
          <div class="c12 p2 pt10" md="pt2 c6 co6">
            ${trackpanel(sections, handleScroll)}
            <div class="pb10" md="pb0">
              <br><br><br><br><br><br>
              gr8 is developed and iterated-on primarily for use within projects at <a href="http://folderstudio.com" class="cura">Folder Studio</a>.
            </div>
          </div>
        </div>

      </main>
    </body>
  `
}
