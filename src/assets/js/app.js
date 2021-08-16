//Smooth Scroll
const scroll = new SmoothScroll('.scroll a[href*="#"]', {
	speed: 500
});

const menu = document.querySelector('#mobile-menu');
const mobilelinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar-logo')

// Display the mobile nav
const mobileMenu = () => {
    menu.classList.toggle('is-active');
    mobilelinks.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);

// Hightlighting the Nav link on scroll
const highlightMenu = () => {
    const elem = document.querySelector('.highlight');
    const homeMenu = document.querySelector('#home-page');
    const aboutMenu = document.querySelector('#about-page');
    const serviceMenu = document.querySelector('#service-page');
    const teamMenu = document.querySelector('#team-page');
    const contactMenu = document.querySelector('#contact-page');
    let scrollPos = window.scrollY;


    if(window.innerWidth > 950 && scrollPos < 600) {
        homeMenu.classList.add('highlight')
        aboutMenu.classList.remove('highlight')
        serviceMenu.classList.remove('highlight')
        teamMenu.classList.remove('highlight')
        contactMenu.classList.remove('highlight')
        return
    } else if (window.innerWidth > 950 && scrollPos < 1350) {
        aboutMenu.classList.add('highlight')
        homeMenu.classList.remove('highlight')
        serviceMenu.classList.remove('highlight')
        teamMenu.classList.remove('highlight')
        contactMenu.classList.remove('highlight')
        return
    } else if (window.innerWidth > 950 && scrollPos < 2050) {
        teamMenu.classList.add('highlight')
        serviceMenu.classList.remove('highlight')
        aboutMenu.classList.remove('highlight')
        homeMenu.classList.remove('highlight')
        contactMenu.classList.remove('highlight')
        return
    } else if (window.innerWidth > 950 && scrollPos < 3000) {
        serviceMenu.classList.add('highlight')
        teamMenu.classList.remove('highlight')
        contactMenu.classList.remove('highlight')
        homeMenu.classList.remove('highlight')
        aboutMenu.classList.remove('highlight')
        return
    }else if (window.innerWidth > 950 && scrollPos < 4000) {
        contactMenu.classList.add('highlight')
        teamMenu.classList.remove('highlight')
        homeMenu.classList.remove('highlight')
        aboutMenu.classList.remove('highlight')
        serviceMenu.classList.remove('highlight')
        return
    }

    if (window.innerWidth < 950 && elem) {
        elem.classList.remove('highlight');
    }
}

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

// CLose Mobile Nav when clicking the menu
const hideMObMenu = () => {
    const mobBars = document.querySelector('.is-active');
    if (window.innerWidth < 950 && mobBars) {
        menu.classList.toggle('is-active');
        mobilelinks.classList.remove('active');
    }
}

mobilelinks.addEventListener('click', hideMObMenu);
navLogo.addEventListener('click', hideMObMenu);

