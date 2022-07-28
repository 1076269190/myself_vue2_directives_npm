export default {
    install(Vue){
        Vue.directive('move', {
            bind: function (el) { },
            inserted: function (el) {
              el.style.position = 'relative'
              let ifMove = false
              let position = null
              el.addEventListener('mousedown', (e) => {
                ifMove = true
                position = [e.clientX, e.clientY]
              })
              document.addEventListener('mousemove', (e) => {
                if (ifMove === false) return
                let x = e.clientX
                let y = e.clientY
                let movedX = x - position[0]
                let movedY = y - position[1]
                let left = parseInt(el.style.left || 0)
                let top = parseInt(el.style.top || 0)
                el.style.left = left + movedX + "px"
                el.style.top = top + movedY + "px"
                position = [x, y]
              })
              document.addEventListener('mouseup', () => {
                ifMove = false
              })
            },
            onUpdated:function(el){}
          })
    }
}