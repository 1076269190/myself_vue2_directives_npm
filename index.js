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
      onUpdated: function (el) { }
    })
    Vue.directive('watermark', {
      bind: function (el, binding) {
        let canvas = document.createElement('canvas')
        el.appendChild(canvas)
        canvas.width = 200
        canvas.height = 150
        canvas.style.display = 'none'
        let canvass = canvas.getContext('2d')
        canvass.rotate((-20 * Math.PI) / 180)
        canvass.font = binding.value.font || '16px Microsoft JhengHei'
        canvass.fillStyle = binding.value.textColor || 'rgba(180,180,180,0.6)'
        canvass.textAlign = 'left'
        canvass.textBaseline = 'middle'
        canvass.fillText(binding.value.text,canvas.width/10,canvas.height/2)
        el.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')'
      }
    })
    Vue.directive('longpress',{
      bind: function(el,binding){
        if(typeof binding.value.fun !== 'function'){
          throw 'callback must be a function'
        }
        let timer = null
        let handler = (e) => {binding.value.fun(e)}
        let start = (e) => {
          if(e.button !== 0 && e.type !== 'click'){
            return
          }
          if(timer === null){
            timer = setTimeout(() => {
              handler()
            },binding.value.time)
          }
        }
        let cancel = (e) => {
          if(timer){
            clearTimeout(timer)
            timer = null
          }
        }
        el.addEventListener('mousedown',start)
        el.addEventListener('touchstart',start)
        el.addEventListener('click',cancel)
        el.addEventListener('mouseout',cancel)
        el.addEventListener('touchend',cancel)
        el.addEventListener('touchcancel',cancel)

      },
      componentUpdated: function(el,{value}){
        el.$value = value
      },

      unbind: function(el){
        el.removeEventListerner('click',el.handler)
      }
    })
  }
}