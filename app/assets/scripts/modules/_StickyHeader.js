import throttle from "lodash/throttle"
import debounce from "lodash/debounce"

class StickyHeader{
    constructor(){
        this.siteHeader = document.querySelector('.site-header')
        this.pageSection = document.querySelectorAll('.page-section')
        this.browserHeight = window.innerHeight
        this.previousScrollY = window.scrollY

        this.events()
    }
    events(){
        window.addEventListener("scroll", throttle(()=> this.scrollHandler(), 200))
        window.addEventListener("resize", debounce(()=>{this.browserHeight = window.innerHeight}, 350))
    }

    scrollHandler(){
        this.getScrollDirection()
        if(window.scrollY > window.innerHeight){
            this.siteHeader.classList.add('site-header--dark')
        }else{
            this.siteHeader.classList.remove('site-header--dark')
        }
        this.pageSection.forEach(el=> this.calcSection(el))
    }

    calcSection(el){
        if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight){
            let scrollPercent = el.getBoundingClientRect().y / this.browserHeight * 100
            if(scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == "down" || scrollPercent < 33 && this.scrollDirection == "up"){
                // ===============================
                // =================================
            }
        }
    }

    getScrollDirection(){
        if(window.scrollY > this.previousScrollY){
            this.scrollDirection = "down"
        }else{
            this.scrollDirection = "up"
        }
        this.previousScrollY = window.scrollY
    }
}

export default StickyHeader