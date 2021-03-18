import "../styles/style.css"
import "lazysizes"
import MobileNav from "./modules/_MobileNav"
import RevealOnScroll from "./modules/_RevealOnScroll"
import StickyHeader from "./modules/_StickyHeader"
import SecretArea from "./modules/_SecretArea"
// import Modal from "./modules/_Modal"
// new Modal()

if (!document.querySelector(".client-area")) {
  new SecretArea()
}

new MobileNav()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
new StickyHeader()
let modal

// for Code spliting ++toolkit++
document.querySelectorAll(".open-modal").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault()
    if (typeof modal == "undefined") {
      import(/*webpackChunkName: "modal"*/ "./modules/_Modal")
        .then((x) => {
          modal = new x.default()
          setTimeout(() => modal.openClickHandler(), 20)
        })
        .catch(() => console.log("we run into a problem!"))
    } else {
      modal.openClickHandler()
    }
  })
})
// splitting code endshere:

if (module.hot) {
  module.hot.accept()
}
