export default {
  install(Vue) {
    Vue.directive('move', {
      bind: function (el) { },
      inserted: function (el) {
        let ifMove = false
        let position = null
        el.addEventListener('mousedown', (e) => {
          ifMove = true
          position = [e.clientX, e.clientY]
          const style = getComputedStyle(el, null)
          el.style.position = 'relative'
          el.style.left = style.left
          el.style.top = style.top
        })
        document.addEventListener('mousemove', (e) => {
          if (ifMove === false) return
          let x = e.clientX
          let y = e.clientY
          // console.log('x='+ x + 'y=' + y)
          let movedX = x - position[0]
          let movedY = y - position[1]
          let left = parseInt(el.style.left || 0)
          console.log(el)
          let top = parseInt(el.style.top || 0)
          // console.log('left=' + left + 'top=' + top)
          el.style.left = left + movedX + "px"
          el.style.top = top + movedY + "px"
          position = [x, y]
        })
        document.addEventListener('mouseup', () => {
          ifMove = false
        })
      },
      onUpdated: function (el) { }
    })
  }
}