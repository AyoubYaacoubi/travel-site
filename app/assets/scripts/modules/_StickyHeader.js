import throttle from "lodash/throttle"
import debounce from "lodash/debounce"

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header")
    this.pageSection = document.querySelectorAll(".page-section")

    this.browserHeight = window.innerHeight
    this.previousScrollY = window.scrollY

    this.events()
  }
  events() {
    window.addEventListener(
      "scroll",
      throttle(() => this.scrollHandler(), 200)
    )
    window.addEventListener(
      "resize",
      debounce(() => {
        this.browserHeight = window.innerHeight
      }, 350)
    )
  }

  scrollHandler() {
    this.getScrollDirection()
    if (window.scrollY > window.innerHeight) {
      this.siteHeader.classList.add("site-header--dark")
    } else {
      this.siteHeader.classList.remove("site-header--dark")
    }
    this.pageSection.forEach((el) => this.calcSection(el))

    if ((window.scrollY / this.browserHeight) * 100 < 20) {
      this.currentLink = document.querySelector(".is-current-link")
      if (this.currentLink) {
        this.currentLink.classList.remove("is-current-link")
      }
    }
  }

  calcSection(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
      if ((scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == "down") || (scrollPercent < 33 && this.scrollDirection == "up")) {
        let matchingLink = el.getAttribute("data-matching-link")
        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach((item) => item.classList.remove("is-current-link"))
        document.querySelector(matchingLink).classList.add("is-current-link")
      }
    }
  }

  getScrollDirection() {
    if (window.scrollY > this.previousScrollY) {
      this.scrollDirection = "down"
    } else {
      this.scrollDirection = "up"
    }
    this.previousScrollY = window.scrollY
  }
}

export default StickyHeader
