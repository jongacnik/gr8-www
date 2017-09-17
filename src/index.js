var html = require('choo/html')
var log = require('choo-log')
var choo = require('choo')
var jump = require('jump.js')

var trackpanel = require('./components/track-panel')
var cssdecl = require('./components/css-decl')

// inline css
require('insert-css')(require('browserify-exec')('node src/style.js'))

// inline parsed utils
var utilities = JSON.parse(require('browserify-exec')('node src/parse-utils.js'))

var app = choo()
app.use(log())
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

  function handleChange (e) {
    e.preventDefault()
    scrollto(e.target.value, 750)
  }

  function scrollto (hash, duration) {
    emit('scrollstart')
    jump(hash, {
      duration: duration,
      callback: function () {
        emit('scrollstop')
      }
    })
  }

  return html`
    <body class="ff-mono fs1 highlight">
      <main id="main">
        
        <div class="c12 x xjb usn psf">
          <div class="p2">
            <a class="fc-accent" href="#main" onclick=${handleClick}>${state.content.title}</a>
          </div>
          <div class="p2">
            ${state.content.nav.map(item => html`
              <span class="ili"><a class="wsnw cura" href="${item.link}">${item.text}</a></span>
            `)}
          </div>
        </div>
        
        <div class="c12 x xw">
          <div class="dn" md="db c6 p2 usn psf b0">
            ${state.content.sections.map(section => html`
              <div>
                <a 
                  href="#${section}"
                  class="${state.active === section ? 'active' : ''}"
                  onclick=${handleClick}
                >
                  ${section}
                </a>
              </div>
            `)}
          </div>
          <div class="c12 p2 pt10" md="pt2 c6 co6">
            ${trackpanel(sections, handleScroll)}
            <div class="pb6" md="pb0">
              <br><br><br><br><br><br>
              gr8 is developed and iterated-on primarily for use within projects at <a href="http://folderstudio.com" class="cura">Folder Studio</a>.
            </div>
          </div>
        </div>

        <div class="c12 psf b0 l0 bgc-white" md="dn">
          <select class="c12 p2 tar psr z1" onchange=${handleChange}>
            ${state.content.sections.map(section => html`
              <option ${state.active === section ? 'selected' : ''} value="#${section}">${section}</option>
            `)}
          </select>
        </div>

      </main>
    </body>
  `
}
