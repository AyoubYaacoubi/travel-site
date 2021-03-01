
class MobileNav{
    constructor(){
        this.menuIcon = document.querySelector('.site-header__menu-icon')
        this.menuCont = document.querySelector('.site-header__menu-cont')

        this.event()
    }

    event(){
        this.menuIcon.addEventListener('click', () => this.toggleMenu())
    }

    toggleMenu(){
        this.menuCont.classList.toggle('site-header__menu-cont--is-visible')
        
    }
}

export default MobileNav