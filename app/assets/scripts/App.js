import '../styles/style.css'
import MobileNav from './modules/_MobileNav'
import RevealOnScroll from './modules/_RevealOnScroll'
import StickyHeader from './modules/_StickyHeader'

let mobileNav = new MobileNav()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
new StickyHeader()

if(module.hot){
    module.hot.accept()
}