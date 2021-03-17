import throttle from "lodash/throttle"
import debounce from "lodash/debounce"

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector(".site-header")
    this.pageSections = document.querySelectorAll(".page-section")

    this.browserHeight = window.innerHeight
    this.previousScrollY = window.scrollY

    this.events()
  }
  events() {
    // listening for scroll events:
    window.addEventListener(
      "scroll", //100s scrollHandler
      throttle(() => this.scrollHandler(), 100)
    )
    // babysitting the browser height.
    window.addEventListener(
      "resize",
      debounce(() => {
        this.browserHeight = window.innerHeight //350s
      }, 350)
    )
  }

  scrollHandler() {
    this.getScrollDirection() // getting the scroll direction:
    // the dark them for the header:
    if (window.scrollY > this.browserHeight) {
      this.siteHeader.classList.add("site-header--dark")
    } else {
      this.siteHeader.classList.remove("site-header--dark")
    }
    // highliting the links:
    this.pageSections.forEach((el) => this.calcSection(el))

    // remove the highlight when we're up.
    if ((window.scrollY / this.browserHeight) * 100 < 20) {
      this.currentLink = document.querySelector(".is-current-link")
      if (this.currentLink) {
        this.currentLink.classList.remove("is-current-link")
      }
    }
  }

  // calculating for the hightlight:
  calcSection(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      // getting the scroll percent:
      let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
      // highliting when we got to the sweet spot:
      if ((scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == "down") || (scrollPercent < 33 && this.scrollDirection == "up")) {
        let matchingLink = el.getAttribute("data-matching-link") // on the html <section data-matching-link="#section-tag">
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
