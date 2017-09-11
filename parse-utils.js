var gr8utils = require('gr8/utils')
var selectorRE = new RegExp(/.+?(?={)/, 'i')
var declarationRE = new RegExp(/([a-zA-Z\-]+(?:\s|\/\*(?:(?!\*\/)[\s\S])*\*\/)*:(?:\s|\/\*(?:(?!\*\/)[\s\S])*\*\/)*(?:"[^"]*"|'[^']'|[^:;{}])+;?)/, 'ig')

var utils = Object.keys(gr8utils.utils).map(key => {
  
  // generate for each section
  var options = {}
  options[key] = gr8utils.utils[key]
  var css = gr8utils.generate(options)

  // parse the css for highlighting
  var parsed = css.trim().split('\n').map(line => {
    return {
      selector: line.match(selectorRE)[0].trim(),
      declarations: line.match(declarationRE)
    }
  })

  return {
    key: key,
    utils: parsed
  }
})

process.stdout.write(JSON.stringify(utils))
