var Tweezer = require('tweezer.js')

var tween = null
module.exports = function (element, callback, parent, horizontal, offset) {
  parent = parent || 'window'
  offset = offset || 0

  var start = parent === 'window' && horizontal
    ? window.scrollX
    : parent === 'window' && !horizontal
    ? window.scrollY
    : parent !== 'window' && horizontal
    ? parent.scrollLeft
    : parent !== 'window' && !horizontal
    ? parent.scrollTop
    : 0

  var end = horizontal
    ? element.getBoundingClientRect().left + start
    : element.getBoundingClientRect().top + start

  if (tween) tween.stop()
  tween = new Tweezer({
    start: start,
    end: end + 1 + offset,
    duration: 300
  })
  .on('tick', function (v) {
    if (parent === 'window' && horizontal) {
      window.scrollTo(v, 0)
    } else if (parent === 'window' && !horizontal) {
      window.scrollTo(0, v)
    } else if (parent !== 'window' && horizontal) {
      parent.scrollLeft = v
    } else if (parent !== 'window' && !horizontal) {
      parent.scrollTop = v
    }
  })
  .on('done', callback)
  .begin()

}
