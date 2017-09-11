var fs = require('fs')
var gr8 = require('gr8')
var ress = fs.readFileSync('node_modules/ress/ress.css', 'utf8')

var fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: '"suisse-mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  ui: '"source-code", "suisse-mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace'
}

var imports = `
  @font-face {
    font-family: 'suisse-mono';
    src: url('./fonts/SuisseIntlMono-Thin.woff2') format('woff2'),
         url('./fonts/SuisseIntlMono-Thin.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'source-code';
    src: url('./fonts/SourceCodePro-Regular-Arrows.woff2') format('woff2'),
         url('./fonts/SourceCodePro-Regular-Arrows.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
`

var css = gr8({
  fontSize: {
    1: 2.6
  },
  viewport: [60, 100],
  utils: [
    {
      prop: 'font-family',
      join: '-',
      vals: fonts
    }
  ]
})

var custom = `
  html {
    /*font-size: 62.5%;*/
    font-size: 0.7vw;
  }

  body {
    -webkit-font-smoothing: antialiased;
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

  .active:before {
    content: '— ';
  }

  pre, code {
    font-family: ${fonts.mono}
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
    padding-left: 0.65em;
    padding-right: 0.65em;
  }

  .highlight .gr8-selector{color:rgb(215,58,73)}
  .highlight .gr8-declaration{color:#005cc5}
  .highlight .gr8-value{color:#6f42c1}
`

process.stdout.write(ress + imports + css + custom)
