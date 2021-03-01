import '../styles/style.css'
import MobileNav from './modules/_MobileNav'

let mobileNav = new MobileNav()

if(module.hot){
    module.hot.accept()
}