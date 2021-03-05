import throttle from "lodash/throttle"

class StickyHeader{
    constructor(){
        this.siteHeader = document.querySelector('.site-header')

        this.events()
    }
    events(){
        window.addEventListener("scroll", throttle(()=> this.scrollHandler(), 200))
    }

    scrollHandler(){
        if(window.scrollY > window.innerHeight){
            this.siteHeader.classList.add('site-header--dark')
        }else{
            this.siteHeader.classList.remove('site-header--dark')
        }
    }
}

export default StickyHeader