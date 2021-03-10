class MobileNav {
  constructor() {
    this.menuIcon = document.querySelector(".site-header__menu-icon")
    this.menuCont = document.querySelector(".site-header__menu-cont")
    this.siteHeader = document.querySelector(".site-header")

    this.event()
  }

  event() {
    this.menuIcon.addEventListener("click", () => this.toggleMenu())
  }

  toggleMenu() {
    this.menuCont.classList.toggle("site-header__menu-cont--is-visible")
    this.siteHeader.classList.toggle("site-header--is-expanded")
    this.menuIcon.classList.toggle("site-header__menu-icon--close-x")
  }
}

export default MobileNav
