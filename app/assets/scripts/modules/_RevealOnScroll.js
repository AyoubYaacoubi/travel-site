import throttle from "lodash/throttle"
import debounce from "lodash/debounce"

class RevealOnScroll {
  constructor(els, tresholdPercent) {
    this.itemsToReveal = els
    this.tresholdPercent = tresholdPercent
    this.hideInitially()
    this.windowHeight = window.innerHeight
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this) // bind(this) ensure that the this keyword still refer to our overall object.
    this.event()
  }
  event() {
    // scroll event with throttle:
    window.addEventListener("scroll", this.scrollThrottle)
    // babysitting the browserHeight
    window.addEventListener(
      "resize",
      debounce(() => {
        this.windowHeight = window.innerHeight
      }, 335)
    )
  }

  //2 - loop throught the elements and calculate how far there are from the window viewport.
  calcCaller() {
    this.itemsToReveal.forEach((el) => {
      if (el.isRevealed == false) {
        this.calculateOnScroll(el)
      }
    })
  }

  //3 - elements calculation
  calculateOnScroll(el) {
    if (window.scrollY + this.windowHeight > el.offsetTop) {
      let scrollPercent = (el.getBoundingClientRect().y / this.windowHeight) * 100
      if (scrollPercent < this.tresholdPercent) {
        el.classList.add("reveal-item--is-visible")
        el.isRevealed = true
        if (el.isLastItem) {
          window.removeEventListener("scroll", this.scrollThrottle)
        }
      }
    }
  }

  // 1- start with hiding all elements chosen, add a variable to see if the element is revealed, and one for the last one.
  hideInitially() {
    this.itemsToReveal.forEach((el) => {
      el.classList.add("reveal-item")
      el.isRevealed = false
    })
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true
  }
}

export default RevealOnScroll
