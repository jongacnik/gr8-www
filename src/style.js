var fs = require('fs')
var gr8 = require('gr8')
var ress = fs.readFileSync('node_modules/ress/ress.css', 'utf8')

var fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: '"suisse-mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  ui: '"source-code", "suisse-mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace'
}

var colors = {
  black: '#000',
  white: '#fff',
  pink: 'hotpink'
}

var borderWeights = [0, 1]
var borders = {}
borderWeights.forEach(border => {
  Object.keys(colors).forEach(key => {
    borders[border + '-' + key] = `${border}px solid ${colors[key]}`
  })
})

// add custom utils
var utils = []

utils.push({
  prop: 'font-family',
  join: '-',
  vals: fonts
})

utils.push({
  prop: { fc: 'color' },
  join: '-',
  vals: colors
})

utils.push({
  prop: { bgc: 'background-color' },
  join: '-',
  vals: colors
})

utils.push({
  prop: [
    'border',
    'border-top',
    'border-right',
    'border-bottom',
    'border-left'
  ],
  vals: borders
})

var imports = `
  @font-face {
    font-family: 'suisse-mono';
    src: url('./assets/fonts/SuisseIntlMono-Thin.woff2') format('woff2'),
         url('./assets/fonts/SuisseIntlMono-Thin.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'source-code';
    src: url('./assets/fonts/SourceCodePro-Regular-Arrows.woff2') format('woff2'),
         url('./assets/fonts/SourceCodePro-Regular-Arrows.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

var css = gr8({
  fontSize: {
    1: 2.6
  },
  spacing: [0, 2, 6, 10],
  viewport: [60, 100],
  utils: utils
})

var custom = `
  html {
    font-size: 1.8vw;
    height:100%;
  }

  @media (min-width: 1024px) {
    html {
      font-size: 0.8vw;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
    min-height:100%;
  }

  h1, h2, h3, h4, h5, h6, h7 {
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
  }

  button, input {
    outline: none;
  }

  ul, ol, li { 
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  img, video {
    width: 100%;
    height: auto;
  }

  @media (min-width: 1024px) {
    .active:before {
      content: '— ';
    }
  }

  @media (max-width: 1023px) {
    .active {
      color: hotpink;
    }
  }

  pre, code {
    font-family: ${fonts.mono}
  }

  select {
    outline: none;
  }

  .gradient {
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); 
  }

  .gradientpanel:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); 
    z-index: 0;
    pointer-events: none;
  }

  .gr8-declaration {
    display: inline-block;
    padding-right: 0.65em;
    padding-left: 1.3em;
    display: block;
  }

  .gr8-declaration-multiple {
    padding-left: 1.3em;
    display: block;
  }

  .gr8-bracket--open {
    padding-right: 0.65em;
  }

  /*.highlight .gr8-selector{color:rgb(215,58,73)}
  .highlight .gr8-declaration{color:#005cc5}
  .highlight .gr8-value{color:#6f42c1}*/

  .highlight .gr8-selector{color:black}
  .highlight .gr8-bracket{color:hotpink}
  .highlight .gr8-declaration{color:hotpink}

  .ili:not(:last-child):after {
    content: ', ';
  }
`

process.stdout.write(ress + imports + css + custom)
